import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import * as Sharing from "expo-sharing";
import QRCode from "react-native-qrcode-svg";
import { createQRToken } from "../utils/qrUtils";
import { useAuth } from "../hooks/useAuth";
import moment from "moment";
import ViewShot from "react-native-view-shot";

const CreateQRScreen = () => {
  const captureQR = useRef<ViewShot>(null);
  const { user } = useAuth();
  const [guestName, setGuestName] = useState("");
  const [qrValue, setQRValue] = useState<{
    guestName?: string;
    createdTime?: number;
  }>({});

  const isShown = qrValue.guestName;

  const handleGenerateQR = () => {
    setQRValue({});

    if (!guestName) {
      return;
    }

    const qrData = {
      guestName: guestName,
      creatorUid: user?.uid,
      createdTime: new Date().getTime(),
      type: "unique",
      token: createQRToken(),
    };
    setQRValue(qrData);

    console.log(qrValue);
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
                  <QRCode value={JSON.stringify(qrValue)} size={250} />
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
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: "white",
  },
  qrData: {
    marginVertical: 10,
    fontFamily: "monospace",
    fontSize: 13,
  },
});

export default CreateQRScreen;
