import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignInForm} from '../screens/auth/sign-in';
import SignUpForm from '../screens/auth/sign-up';
const Stack = createNativeStackNavigator();
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen
          name="Signin"
          component={SignInForm}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={SignUpForm}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
