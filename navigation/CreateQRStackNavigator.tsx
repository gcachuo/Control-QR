import { createStackNavigator } from "@react-navigation/stack";
import CreateQRScreen from "../screens/CreateQRScreen";

const Stack = createStackNavigator();

const CreateQRStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={"Main"}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Main" component={CreateQRScreen} />
        </Stack.Navigator>
    );
};

export default CreateQRStackNavigator;
