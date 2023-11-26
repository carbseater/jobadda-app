import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useAuth} from 'AuthContext';

import {AuthStack} from './auth-stack';
import {AppStack} from './app-stack';
import {theme} from '../core/theme';
import {UserProvider} from '../UserContext';
import VerifyEmail from 'screens/auth/verify-email';

const Stack = createNativeStackNavigator();
const Routes = () => {
  const {currentUser} = useAuth();
  let emailVerified;
  if (currentUser) {
    emailVerified = currentUser.emailVerified;
  }

  return (
    <NavigationContainer theme={theme}>
      {currentUser ? (
        emailVerified ? (
          <UserProvider>
            <AppStack />
          </UserProvider>
        ) : (
          <VerifyEmail />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default Routes;
