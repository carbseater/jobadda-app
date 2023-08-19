import {View, Text} from 'react-native';
import React from 'react';
import {NativeBaseProvider} from 'native-base';
import Routes from './routes';
import {lightTheme} from 'config/theme';
import {AuthProvider} from 'AuthContext';
import {PaperProvider} from 'react-native-paper';
import {theme} from 'core/theme';

const Provider = () => {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <Routes />
      </PaperProvider>
    </AuthProvider>
  );
};

export default Provider;
