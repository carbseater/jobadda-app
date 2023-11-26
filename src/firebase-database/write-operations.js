import database from '@react-native-firebase/database';
import db from '@react-native-firebase/firestore';
import {collection} from 'constants/dbConstants';
import {getDeviceToken, nearestFiveYear} from 'utils/general-fn';
import {getUserData} from './read-operations';
export const signUp = async ({fullName, contactNo, email, userId}) => {
  console.log('triggered');
  try {
    await db().collection(collection.EMPLOYEE).doc(userId).set(
      {
        fullName,
        contactNo,
        email,
        mobileNoVerified: false,
        basicDetailCompleted: false,
        insuranceDetailCompleted: false,
        pfDetailCompleted: false,
      },
      {merge: true},
    );
  } catch (err) {
    console.log(err);
  }
  console.log('Saved registration data to db');
};

export const updateOnGoogleSignIn = async googleSignInData => {
  const uid = googleSignInData.uid;
  const {
    email = null,
    fullName = null,
    photoUrl = null,
    basicDetailCompleted = null,
    insuranceDetailCompleted = null,
    pfDetailCompleted = null,
  } = (await getUserData(uid)) ?? {};
  const payload = {};
  if (email == null) payload['email'] = googleSignInData.email;
  if (fullName == null) payload['fullName'] = googleSignInData.displayName;
  if (photoUrl == null) payload['photoUrl'] = googleSignInData.photoURL;
  if (basicDetailCompleted == null) payload['basicDetailCompleted'] = false;
  if (insuranceDetailCompleted == null)
    payload['insuranceDetailCompleted'] = false;
  if (pfDetailCompleted == null) payload['pfDetailCompleted'] = false;
  payload['fcmToken'] = await getDeviceToken();
  try {
    await db()
      .collection(collection.EMPLOYEE)
      .doc(uid)
      .set(payload, {merge: true});
  } catch (err) {
    console.log(err);
  }
};

export const updateFcmToken = async userId => {
  try {
    const fcmToken = await getDeviceToken();
    await db().collection(collection.EMPLOYEE).doc(userId).set(
      {
        fcmToken,
      },
      {merge: true},
    );
    console.log('FCM token added');
  } catch (err) {
    throw err;
  }
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
