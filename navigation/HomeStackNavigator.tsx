import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import VisitorInfoScreen from "../screens/VisitorInfoScreen";

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Main"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Main" component={HomeScreen} />
      <Stack.Screen name="Visitor" component={VisitorInfoScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
