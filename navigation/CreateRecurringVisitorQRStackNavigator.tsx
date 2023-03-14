import { createStackNavigator } from "@react-navigation/stack";
import CreateRecurringQRScreen from "../screens/CreateRecurringQRScreen";

const Stack = createStackNavigator();

const CreateRecurringVisitorQRStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={"Main"}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Main" component={CreateRecurringQRScreen} />
        </Stack.Navigator>
    );
};

export default CreateRecurringVisitorQRStackNavigator;
