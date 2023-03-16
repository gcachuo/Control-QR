import "react-native-gesture-handler";
import "@react-native-async-storage/async-storage";
import "./firebaseConfig";
import "moment/locale/es";

import React from "react";
import { SafeAreaView } from "react-native";
import DrawerNavigator from "./navigation/DrawerNavigator";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./hooks/useAuth";
import { useAppUpdate } from "./hooks/useAppUpdate";
import moment from "moment";
import * as Linking from "expo-linking";

moment().locale("es");
const prefix = Linking.createURL("/");

export default function App() {
  useAppUpdate();

  const linking: LinkingOptions<{
    Home: undefined;
    MyAccount: undefined;
    Visitor: { id: string };
  }> = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: {
          screens: {
            Visitor: {
              path: "visitor/:id",
              parse: {
                id: (id: string) => `${id}`,
              },
            },
          },
        },
        MyAccount: {
          screens: {
            Main: "myaccount",
          },
        },
      },
    },
  };

  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer linking={linking}>
          <DrawerNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </AuthProvider>
  );
}
