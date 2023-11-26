import React from 'react';
import Provider from './src/navigation/provider';

import {LogBox} from 'react-native';
import {getFcmToken} from 'firebase-database/firebase-messaging';

const App = () => {
  getFcmToken();
  LogBox.ignoreAllLogs();
  return <Provider />;
};

export default App;
