import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useAuth} from 'AuthContext';

import {AuthStack} from './auth-stack';
import {AppStack} from './app-stack';
import {theme} from '../core/theme';
import {UserProvider} from '../UserContext';

const Stack = createNativeStackNavigator();
const Routes = () => {
  const {currentUser} = useAuth();
  return (
    <NavigationContainer theme={theme}>
      {currentUser ? (
        <UserProvider>
          <AppStack />
        </UserProvider>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default Routes;
