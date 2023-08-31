import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SignUpScreen} from '../screens/auth/sign-up';
import {LoginScreen} from 'screens/auth/login-page';
import {ForgotPasswordScreen} from 'screens/auth/recover-password';
import {nav} from 'constants/navigation';
import {useAuth} from 'AuthContext';
import HomePage from 'screens/app/home-page';
import {AuthStack} from './auth-stack';
import {AppStack} from './app-stack';
import {theme} from 'core/theme';
const Stack = createNativeStackNavigator();
const Routes = () => {
  const {currentUser} = useAuth();
  return (
    <NavigationContainer theme={theme}>
      {currentUser ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
