import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BackButton from "../components/BackButton";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button } from "react-native-paper";
import * as Linking from "expo-linking";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

export default function ReadQRScreen() {
  const [hasPermission, setHasPermission] = useState<boolean>(
    null as unknown as boolean
  );
  const [scanned, setScanned] = useState(false);
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: any) => {
    setScanned(true);
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    const { hostname, path: id, queryParams } = Linking.parse(data);
    try {
      navigation.navigate("Visitor", { id });
    } catch (e) {
      console.warn(e);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ScrollView>
      <BackButton />

      <View style={styles.container}>
        <View style={styles.form}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && (
            <Button onPress={() => setScanned(false)}>Tap to Scan Again</Button>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

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
    height: 500,
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
