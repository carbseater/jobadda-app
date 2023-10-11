import database from '@react-native-firebase/database';
import db from '@react-native-firebase/firestore';
import {collection} from 'constants/dbConstants';
import {nearestFiveYear} from 'utils/general-fn';
export const signUp = async ({
  firstName,
  lastName,
  city,
  email,
  state = 'uttar_pradesh',
  userId,
}) => {
  await db().collection(collection.EMPLOYEE).doc(userId).set({
    firstName,
    lastName,
    city,
    email,
    state,
  });
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

export const applyForJob = async (data, userId, jobId, userProfileData) => {
  const batch = db().batch();
  const year = nearestFiveYear();
  // console.log(year, userId);
  const jobApplicationRef = db()
    .collection(collection.JOB_OPENING)
    .doc(jobId)
    .collection(collection.JOB_APPLICATIONS)
    .doc(userId);
  console.log('hi');
  const userAppliedJobsRef = db()
    .collection(collection.EMPLOYEE)
    .doc(userId)
    .collection(collection.APPLIED_JOBS)
    .doc(year);
  console.log('hi1');
  const appliedJobsArray = db()
    .collection(collection.EMPLOYEE)
    .doc(userId)
    .collection(collection.APPLIED_JOBS)
    .doc('appliedJobsArray');
  console.log('hello', typeof jobId, data);
  batch.set(jobApplicationRef, {...userProfileData, status: 'pending'});
  console.log('hello1');
  batch.set(userAppliedJobsRef, {[jobId]: data}, {merge: true});
  console.log('hello2');
  batch.set(
    appliedJobsArray,
    {jobIdArray: db.FieldValue.arrayUnion(jobId)},
    {merge: true},
  );
  console.log('hello3');
  batch
    .commit()
    .then(() => {
      console.log('Document added to the collection using a batch.');
    })
    .catch(error => {
      console.error('Error adding document using a batch:', error);
    });
};
