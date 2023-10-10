import {createContext, useContext, useEffect, useState} from 'react';
import React from 'react';
import {getAppliedJobs} from './firebase-database/read-operations';
import {useAuth} from './AuthContext';
import db from '@react-native-firebase/firestore';
import {collection} from 'constants/dbConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const UserContext = createContext();

export const useUserData = () => useContext(UserContext);
export const UserProvider = ({children}) => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [userData, setUserData] = useState();
  const {currentUser: {uid} = {}} = useAuth();

  const getUserProfile = async () => {
    let data = await AsyncStorage.getItem('@userProfile');
    data = JSON.parse(data);
    setUserData(data);
  };

  useEffect(() => {
    console.log('User id', uid);
    // getAppliedJobs(currentUser.uid).then(jobData => setAppliedJobs(jobData));

    const unsubscribe = db()
      .collection(collection.EMPLOYEE)
      .doc(uid)
      .collection(collection.APPLIED_JOBS)
      .doc('appliedJobsArray')
      .onSnapshot(docSnapshot => {
        console.log('Snapshot', docSnapshot.data().jobIdArray);
        const data = docSnapshot.data().jobIdArray;
        setAppliedJobs(data);
      });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    getUserProfile();
  }, [uid]);

  // const addNewJobToState = jobData => {
  //   setAppliedJobs(prevState => [...prevState, {...jobData}]);
  // };
  // console.log('Applied jobs', appliedJobs);
  const value = {
    appliedJobs,
    userData,
    // addNewJobToState,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
