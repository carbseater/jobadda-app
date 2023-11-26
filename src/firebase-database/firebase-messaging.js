import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

export const getFcmToken = async () => {
  //   await messaging().deleteToken();
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  console.log(token);
  return token;
};

export const notificationRequest = async () => {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
};
