import "react-native-gesture-handler";
import "@react-native-async-storage/async-storage";
import "./firebaseConfig";

import React from "react";
import { SafeAreaView } from "react-native";
import DrawerNavigator from "./navigation/DrawerNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./hooks/useAuth";
import { useAppUpdate } from "./hooks/useAppUpdate";

export default function App() {
  useAppUpdate();

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
