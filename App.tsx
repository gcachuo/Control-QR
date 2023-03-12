import "react-native-gesture-handler";
import React, { useEffect } from "react";
import * as Updates from "expo-updates";
import firebase from "firebase/compat";
import { firebaseConfig } from "./firebaseConfig";
import { SafeAreaView } from "react-native";
import DrawerNavigator from "./navigation/DrawerNavigator";
import { NavigationContainer } from "@react-navigation/native";

firebase.initializeApp(firebaseConfig);
firebase.auth().languageCode = "es";

export default function App() {
  useEffect(() => {
    async function checkForUpdate() {
      try {
        const { isAvailable } = await Updates.checkForUpdateAsync();
        if (isAvailable) {
          await Updates.fetchUpdateAsync();
          // Recarga la aplicación para cargar la actualización
          await Updates.reloadAsync();
        }
      } catch (e) {
        console.log(e);
      }
    }

    checkForUpdate();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}
