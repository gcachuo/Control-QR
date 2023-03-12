import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import {
  Avatar,
  Button,
  Caption,
  IconButton,
  Modal,
  TextInput,
  Title,
} from "react-native-paper";
import BackButton from "../components/BackButton";
import { useAuth } from "../hooks/useAuth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

export default function MyAccountScreen() {
  const { user } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedData, setEditedData] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
  });

  const handleSave = async () => {
    try {
      if (user) {
        console.log("Start saving user");

        await setDoc(doc(getFirestore(), "users", user.uid), editedData);

        console.log("Finish save");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <View>
      <BackButton />
      <View style={styles.container}>
        <Avatar.Image
          source={{
            uri: user?.photoURL || "https://picsum.photos/id/1005/200/200",
          }}
          size={100}
          style={styles.avatar}
        />
        <Title style={styles.title}>
          {user?.displayName || "<Sin Nombre>"}
        </Title>
        <Caption style={styles.caption}>{user?.email || ""}</Caption>

        <TouchableWithoutFeedback
          onPress={() => {
            setEditedData({
              displayName: user?.displayName || "",
              email: user?.email || "",
              phoneNumber: "",
            });
            setIsModalVisible(true);
          }}
        >
          <View>
            <IconButton icon="pencil" size={24} />
          </View>
        </TouchableWithoutFeedback>
        <Modal
          visible={isModalVisible}
          onDismiss={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <TextInput
              label="Nombre Completo"
              value={editedData.displayName}
              onChangeText={(text) =>
                setEditedData({ ...editedData, displayName: text })
              }
            />
            <TextInput
              label="Email"
              value={editedData.email}
              onChangeText={(text) =>
                setEditedData({ ...editedData, email: text })
              }
            />
            <TextInput
              label="Teléfono"
              value={editedData.phoneNumber}
              onChangeText={(text) =>
                setEditedData({ ...editedData, phoneNumber: text })
              }
            />
            <Button
              onPress={async () => {
                // Lógica para guardar los datos editados
                await handleSave();
                setIsModalVisible(false);
              }}
            >
              Guardar
            </Button>
            <Button onPress={() => setIsModalVisible(false)}>Cancelar</Button>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 16,
    lineHeight: 16,
    marginBottom: 10,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
  },
  textInput: {
    marginVertical: 8,
  },
});