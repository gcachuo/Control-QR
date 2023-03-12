import { createStackNavigator } from "@react-navigation/stack";
import MyAccountScreen from "../screens/MyAccountScreen";

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Main"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Main" component={MyAccountScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
