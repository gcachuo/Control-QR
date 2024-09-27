import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as Sharing from "expo-sharing";
import QRCode from "react-native-qrcode-svg";
import { createQRToken } from "../utils/qrUtils";
import { useAuth } from "../hooks/useAuth";
import moment from 'moment-timezone';
import ViewShot from "react-native-view-shot";
import BackButton from "../components/BackButton";
import Constants from "expo-constants";
import { useLinkTo } from "@react-navigation/native";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const CreateTempVisitorQRScreen = () => {
  moment.tz.setDefault("America/Mexico_City");
  const captureQR = useRef<ViewShot>(null);
  const { user } = useAuth();
  const [guestName, setGuestName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [qrValue, setQRValue] = useState<{
    guestName?: string;
    createdTime?: number;
    token?: string;
  }>({});
  const linkTo = useLinkTo();

  console.log(qrValue);
  const isShown = qrValue.guestName;

  const handleGenerateQR = async () => {
    setQRValue({});

    if (!guestName) {
      return;
    }

    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/; // Expresión regular para solo permitir letras y espacios
    if (!regex.test(guestName)) {
      setGuestName("");
      alert("El nombre solo debe contener letras y espacios");
      return;
    }

    const qrData = {
      guestName: guestName,
      creatorUid: user?.uid,
      createdTime: new Date().getTime(),
      type: "unique",
      token: createQRToken(),
    };

    try {
      setIsLoading(true);
      console.log(qrData);
      await setDoc(doc(getFirestore(), "visits", qrData.token), qrData);
      console.log("La visita ha sido registrada en Firestore.");
      setQRValue(qrData);
      console.log(qrValue);
      // const url = linkTo("/visitor/" + qrData.token);
      // console.log(url);
    } catch (e) {
      console.error("Error al registrar la visita:", e);
    }finally {
      setIsLoading(false);
    }
  };

  const onCapture = async () => {
    if (captureQR.current !== null && captureQR.current !== undefined) {
      // @ts-ignore
      const uri = await captureQR.current.capture();
      if (uri) {
        await Sharing.shareAsync(uri, {
          mimeType: "image/png",
          dialogTitle: "Compartir QR",
        });
      }
    }
  };

  return (
    <ScrollView>
      <BackButton />
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            label="Nombre del visitante"
            value={guestName}
            onChangeText={setGuestName}
            style={styles.input}
          />
          <Button mode="contained" onPress={handleGenerateQR} disabled={isLoading}>
            Generar QR
          </Button>
          {isShown ? (
            <>
              <View
                style={{
                  borderColor: "black",
                  borderStyle: "solid",
                  borderWidth: 1,
                  marginTop: 20,
                }}
              >
                <ViewShot ref={captureQR}>
                  <View style={styles.qrContainer}>
                    <Text style={styles.qrData}>Mayorazgo Santa Cecilia</Text>
                    <QRCode
                      value={
                        `${Constants.expoConfig?.scheme}://visitor/` +
                        qrValue.token
                      }
                      size={250}
                    />
                    <Text style={styles.qrData}>{qrValue.guestName}</Text>
                    <Text style={styles.qrData}>
                      {moment(qrValue.createdTime).format("DD/MMMM/YYYY")}
                    </Text>
                    <Text style={styles.qrData}>Un solo uso</Text>
                  </View>
                </ViewShot>
              </View>
              <Button onPress={onCapture}>Compartir QR</Button>
            </>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 4,
  },
  input: {
    marginBottom: 20,
  },
  qrContainer: {
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: "white",
  },
  qrData: {
    marginVertical: 10,
    fontSize: 13,
  },
});

export default CreateTempVisitorQRScreen;
