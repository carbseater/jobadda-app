import database from '@react-native-firebase/database';

export const signUp = async ({
  firstName,
  lastName,
  city,
  email,
  state = 'uttar_pradesh',
  userId,
}) => {
  database()
    .ref('workers/' + userId)
    .set({
      firstName,
      lastName,
      city,
      email,
      state,
    })
    .then(() => console.log('Data set.'));

  database()
    .ref('states/' + state + '/' + city + '/workers')
    .push(userId)
    .then(() => console.log('City set'));
};
