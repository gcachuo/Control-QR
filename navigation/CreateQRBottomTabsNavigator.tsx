import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateTempVisitorQRStackNavigator from "./CreateTempVisitorQRStackNavigator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import CreateRecurringVisitorQRStackNavigator from "./CreateRecurringVisitorQRStackNavigator";

const BottomTab = createBottomTabNavigator();

const CreateQRBottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName={"Temp"}
      screenOptions={{ headerShown: false }}
    >
      <BottomTab.Screen
        name="TempVisitor"
        component={CreateTempVisitorQRStackNavigator}
        options={{
          title: "Visitante Único",
          tabBarActiveTintColor: "#6200ee",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name={"account"}
              size={48}
              color="#6200ee"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="RecurringVisitor"
        component={CreateRecurringVisitorQRStackNavigator}
        options={{
          title: "Visitante Recurrente",
          tabBarActiveTintColor: "#6200ee",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name={"account"}
              size={48}
              color="#6200ee"
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default CreateQRBottomTabNavigator;
