
import 'react-native-gesture-handler';
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../Home';
import PhoneOtp from '../PhoneOtp';
import GoogleLogin from '../GoogleLogin';


const Stack = createStackNavigator();

const AppStack = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator initialRouteName="PhoneOtp">

      <Stack.Screen
        name="PhoneOtp"
        component={PhoneOtp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GoogleLogin"
        component={GoogleLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default AppStack;
