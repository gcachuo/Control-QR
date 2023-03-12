import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useAuth } from "../hooks/useAuth";

export default function HomeScreen() {
  const { logout } = useAuth();

  return (
    <View>
      <Button onPress={logout}>Cerrar sesión</Button>
      <Text>Home</Text>
    </View>
  );
}
