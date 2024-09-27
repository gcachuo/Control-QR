import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "../screens/LoginScreen";
import HomeStackNavigator from "./HomeStackNavigator";
import { useEffect, useState } from "react";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import MyAccountStackNavigator from "./MyAccountStackNavigator";
import CreateQRBottomTabNavigator from "./CreateQRBottomTabsNavigator";
import ReadQRStackNavigator from "./ReadQRStackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setIsLoggedIn(true);
        navigation.navigate("Home");
      } else {
        setIsLoggedIn(false);
        navigation.navigate("Login");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName={"Login"}
      screenOptions={{ headerTitle: "Control QR" }}
    >
      {!isLoggedIn && (
        <Drawer.Screen
          name="Login"
          component={LoginScreen}
          initialParams={{ isLoggedIn }}
        />
      )}
      {isLoggedIn && (
        <Drawer.Group>
          <Drawer.Screen
            name="Home"
            component={HomeStackNavigator}
            options={{ title: "Inicio" }}
          />
          <Drawer.Screen
            name="CreateQR"
            component={CreateQRBottomTabNavigator}
            options={{ title: "Permitir acceso" }}
          />
          <Drawer.Screen
            name="ReadQR"
            component={ReadQRStackNavigator}
            options={{ title: "Leer acceso" }}
          />
          <Drawer.Screen
            name="MyAccount"
            component={MyAccountStackNavigator}
            options={{ title: "Mi Cuenta" }}
          />
        </Drawer.Group>
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
