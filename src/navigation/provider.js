import {View, Text} from 'react-native';
import React from 'react';
import {NativeBaseProvider} from 'native-base';
import Routes from './routes';

const Provider = () => {
  return (
    <NativeBaseProvider>
      <Routes />
    </NativeBaseProvider>
  );
};

export default Provider;
