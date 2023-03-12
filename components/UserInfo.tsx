import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";

interface Props {
  name: string;
  email: string;
  photoURL?: string | null;
}

const UserInfo: React.FC<Props> = ({ name, email, photoURL }) => {
  return (
    <View style={styles.container}>
      <Avatar.Image size={80} source={{ uri: photoURL || "https://picsum.photos/id/1005/200/200" }} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  info: {
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
  },
});

export default UserInfo;
