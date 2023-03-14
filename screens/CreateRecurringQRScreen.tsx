import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ViewShot from "react-native-view-shot";
import QRCode from "react-native-qrcode-svg";
import moment from "moment/moment";
import * as Sharing from "expo-sharing";
import { createQRToken } from "../utils/qrUtils";
import { useAuth } from "../hooks/useAuth";

const CreateRecurringQRScreen = () => {
  const captureQR = useRef<ViewShot>(null);
  const navigation = useNavigation();

  const { user } = useAuth();
  const [visitorName, setVisitorName] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [qrValue, setQRValue] = useState<{
    visitorName?: string;
    visitorPhone?: string;
    validUntil?: number;
  }>({});

  const isShown = qrValue.visitorName && qrValue.visitorPhone;

  const createRecurringVisitorQR = async () => {
    // Código para generar el QR
    setQRValue({});

    if (!visitorName || !visitorPhone) {
      return;
    }

    const dateNum = moment(validUntil, "DD/MM/YYYY").valueOf();
    const qrData = {
      visitorName,
      visitorPhone,
      validUntil: isNaN(dateNum) ? undefined : dateNum,
      creatorUid: user?.uid,
      createdTime: new Date().getTime(),
      type: "recurring",
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
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            label="Nombre del visitante"
            value={visitorName}
            onChangeText={(text) => setVisitorName(text)}
            style={styles.input}
          />
          <TextInput
            label="Teléfono del visitante"
            value={visitorPhone}
            onChangeText={(text) => setVisitorPhone(text)}
            style={styles.input}
          />
          <TextInput
            label="Fecha de vencimiento (DD/MM/YYYY)"
            value={validUntil}
            onChangeText={(text) => setValidUntil(text)}
            style={styles.input}
          />
          <Button mode="contained" onPress={createRecurringVisitorQR}>
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
                    <Text style={styles.qrData}>{visitorName}</Text>
                    <Text style={styles.qrData}>Visitante Recurrente</Text>
                    {qrValue.validUntil && (
                      <Text style={styles.qrData}>
                        Valido hasta:{" "}
                        {moment(qrValue.validUntil).format("DD/MMMM/YYYY")}
                      </Text>
                    )}
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
    flex: 1,
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
    marginBottom: 10,
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

export default CreateRecurringQRScreen;
