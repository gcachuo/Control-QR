import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import { createQRToken } from "../utils/qrUtils";
import { useAuth } from "../hooks/useAuth";

const CreateQRScreen = () => {
  const { user } = useAuth();
  const [guestName, setGuestName] = useState("");
  const [qrValue, setQRValue] = useState("");

  const handleGenerateQR = () => {
    const qrData = {
      guestName: guestName,
      creatorUid: user?.uid,
      createdTime: new Date().getTime(),
      type: "unique",
      token: createQRToken,
    };
    setQRValue(JSON.stringify(qrData));
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          label="Nombre del visitante"
          value={guestName}
          onChangeText={setGuestName}
          style={styles.input}
        />
        <Button mode="contained" onPress={handleGenerateQR}>
          Generar QR
        </Button>
        {qrValue ? (
          <View style={styles.qrContainer}>
            <QRCode value={qrValue} size={250} />
            <Text style={styles.qrValue}>{qrValue}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 4,
  },
  input: {
    marginBottom: 20,
  },
  qrContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  qrValue: {
    marginTop: 10,
    fontFamily: "monospace",
    fontSize: 12,
  },
});

export default CreateQRScreen;
