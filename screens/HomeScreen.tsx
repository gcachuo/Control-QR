import React from "react";
import { StyleSheet, View } from "react-native";
import { useAuth } from "../hooks/useAuth";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { Grid } from "../components/Grid";

export default function HomeScreen() {
  const { logout } = useAuth();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <View style={styles.container}>
      <Grid
        tiles={[
          {
            title: "Mi Cuenta",
            icon: "account",
            onPress: () => navigation.navigate("MyAccount"),
          },
          {
            title: "Salir",
            icon: "logout",
            onPress: logout,
          },
        ]}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});
