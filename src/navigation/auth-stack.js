import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {nav} from 'constants/navigation';
import {LoginScreen} from 'screens/auth/login-page';
import {SignUpScreen} from 'screens/auth/sign-up';
import {ForgotPasswordScreen} from 'screens/auth/recover-password';
import {SkillsPage} from 'screens/app/skills-page/skills-page';
const Stack = createNativeStackNavigator();
export const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={nav.LOGIN}>
      <Stack.Screen
        name={nav.SKILLS_PAGE}
        component={SkillsPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={nav.LOGIN}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={nav.SIGN_UP}
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={nav.RECOVER_PASSWORD}
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
