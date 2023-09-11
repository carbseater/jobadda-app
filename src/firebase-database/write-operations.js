import database from '@react-native-firebase/database';

export const signUp = async ({
  firstName,
  lastName,
  city,
  email,
  state = 'uttar_pradesh',
  userId,
}) => {
  await database()
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

export const addWorkExperience = async (data, userId) => {
  const {departmentName, jobTitle} = data;
  database()
    .ref(`workers/${userId}/work_experience`)
    .push({...data, verifiedByJobAdda: false})
    .then(() => console.log('Experience added'))
    .catch(err => console.log(err));
  database()
    .ref(`departments/${departmentName.id}/${jobTitle.id}/${userId}`)
    .set(userId);
};

export const applyForJob = async (data, userId) => {};
