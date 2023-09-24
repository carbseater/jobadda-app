import database from '@react-native-firebase/database';
import db from '@react-native-firebase/firestore';
import {collection} from 'constants/dbConstants';
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
  const user = await db().collection(collection.EMPLOYEE).doc(userId).get();
  // const snapshot = await database().ref(`workers/${userId}`).once('value');
  if (user.exists) {
    console.log(user.data());
    return user.data();
  } else {
    return null;
  }
};

export const getAppliedJobs = async userId => {
  const snapshot = await db()
    .collection(collection.EMPLOYEE)
    .doc(userId)
    .collection(collection.APPLIED_JOBS)
    .get();
  // const appliedJobs = snapshot.docs.forEach(jobDocument => )

  // console.log('Applied jobs', appliedJobs);
  // return appliedJobs;
};

export const findStatusOfJobApplication = async (userId, jobId) => {
  await db()
    .collection(collection.EMPLOYEE)
    .doc(userId)
    .collection(collection.APPLIED_JOBS);
};
