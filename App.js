import React from 'react';
import Provider from './src/navigation/provider';
import Config from 'react-native-config';
import {LogBox} from 'react-native';

const App = () => {
  console.log(Config.REACT_APP_FIREBASE_API_KEY);
  LogBox.ignoreAllLogs();
  return <Provider />;
};

export default App;
