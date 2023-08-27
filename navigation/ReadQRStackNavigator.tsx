import { createStackNavigator } from "@react-navigation/stack";
import ReadQRScreen from "../screens/ReadQRScreen";

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Main"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Main" component={ReadQRScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
