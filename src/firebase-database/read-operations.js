import database from '@react-native-firebase/database';
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

export const getUserData = async userId => {
  const snapshot = await database().ref(`workers/${userId}`).once('value');
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null;
  }
};
