import { createStackNavigator } from "@react-navigation/stack";
import CreateTempVisitorQRScreen from "../screens/CreateTempVisitorQRScreen";

const Stack = createStackNavigator();

const CreateTempVisitorQRStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={"Main"}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Main" component={CreateTempVisitorQRScreen} />
        </Stack.Navigator>
    );
};

export default CreateTempVisitorQRStackNavigator;
