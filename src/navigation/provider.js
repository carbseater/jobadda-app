import React from 'react';

import Routes from './routes';
import {lightTheme} from 'config/theme';
import {AuthProvider} from 'AuthContext';
import {Provider as PaperProvider} from 'react-native-paper';
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
