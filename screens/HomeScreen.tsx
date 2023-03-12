import React from "react";
import { StyleSheet, View } from "react-native";
import { useAuth } from "../hooks/useAuth";
import Tile from "../components/Tile";

export default function HomeScreen() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Tile title="Logout" icon="logout" onPress={logout} />
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
