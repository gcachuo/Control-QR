import React from "react";
import { StyleSheet } from "react-native";
import { Card, Title, TouchableRipple } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Icon = "logout";

type Props = {
  title: string;
  icon: Icon;
  onPress: () => void;
};

const Tile: React.FC<Props> = ({ title, icon, onPress }) => {
  return (
    <TouchableRipple onPress={onPress}>
      <Card style={styles.card}>
        <MaterialCommunityIcons name={icon} size={48} color="#6200ee" />
        <Title style={styles.title}>{title}</Title>
      </Card>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
  },
  title: {
    marginLeft: 16,
    fontSize: 18,
  },
});

export default Tile;
