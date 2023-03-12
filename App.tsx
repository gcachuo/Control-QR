import "react-native-gesture-handler";
import React, { useEffect } from "react";
import * as Updates from "expo-updates";
import { SafeAreaView } from "react-native";
import DrawerNavigator from "./navigation/DrawerNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./hooks/useAuth";
import { appAuth } from "./firebaseConfig";

console.log(appAuth);

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

    checkForUpdate().then();
  }, []);

  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </AuthProvider>
  );
}
