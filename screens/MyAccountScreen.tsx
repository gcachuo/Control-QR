import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Caption, Title } from "react-native-paper";
import BackButton from "../components/BackButton";

export default function MyAccountScreen() {
  return (
    <View>
      <BackButton />
      <View style={styles.container}>
        <Avatar.Image
          source={{ uri: "https://picsum.photos/id/1005/200/200" }}
          size={100}
          style={styles.avatar}
        />
        <Title style={styles.title}>John Doe</Title>
        <Caption style={styles.caption}>johndoe@example.com</Caption>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 16,
    lineHeight: 16,
    marginBottom: 10,
  },
});
