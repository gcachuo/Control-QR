import { createStackNavigator } from "@react-navigation/stack";
import MyAccountScreen from "../screens/MyAccountScreen";
import MyVisitsScreen from "../screens/MyVisitsScreen";

const Stack = createStackNavigator();

const MyVisitsStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Main"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Main" component={MyVisitsScreen} />
    </Stack.Navigator>
  );
};

export default MyVisitsStackNavigator;
