/**
 * @format
 */
import 'react-native-gesture-handler';
import database from '@react-native-firebase/database';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// database().setPersistenceEnabled(true);
AppRegistry.registerComponent(appName, () => App);
