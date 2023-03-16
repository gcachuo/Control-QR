import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import BackButton from "../components/BackButton";

interface VisitorInfoProps {
  name: string;
  address: string;
  date: string;
}

const VisitorInfoScreen = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hostName, setHostName] = useState("");
  const route = useRoute<RouteProp<Record<string, { id?: string }>, string>>();
  const { id } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    id && getVisitorById(id);
  }, [id]);

  const getVisitorById = async (id: string) => {
    const docRef = doc(getFirestore(), "visits", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // el documento existe
      const data = docSnap.data(); // devuelve los datos del documento

      if (data) {
        const name = data.guestName;
        const date = data.createdTime;
        let type = data.type;

        switch (data.type) {
          case "unique":
            type = "Un solo uso";
            break;
        }

        setName(name);
        setType(type);
        setDate(moment(date).format("DD [de] MMMM"));

        const userData = await getDoc(
          doc(getFirestore(), "users", data.creatorUid)
        );
        const user = userData.data()!;
        setHostName(user.name);
        setPhoneNumber(user.phoneNumber);
        setAddress(user.address);
      }
    } else {
      // el documento no existe
      console.log("No existe la visita con el ID:", id);
      Alert.alert("El QR no es válido.");
      navigation.goBack();
    }
  };

  const handleAuthorize = () => {
    // Aquí se realizaría la lógica para verificar si el visitante tiene autorización para ingresar
    setIsAuthorized(true);
  };

  return (
    <View>
      <BackButton />
      <View style={styles.container}>
        <Text style={styles.title}>Información de visita</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.text}>{date}</Text>
          <Text style={styles.label}>Tipo de acceso:</Text>
          <Text style={styles.text}>{type}</Text>
        </View>
        <Text style={styles.title}>Información del colono</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.text}>{hostName}</Text>
          <Text style={styles.label}>Dirección:</Text>
          <Text style={styles.text}>{address}</Text>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.text}>{phoneNumber}</Text>
        </View>
        {isAuthorized && (
          <Text style={styles.authorizedText}>Ingreso autorizado</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 50,
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    marginBottom: 10,
  },
  button: {
    marginVertical: 10,
  },
  authorizedText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default VisitorInfoScreen;
