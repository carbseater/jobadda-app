import React, {useEffect, useRef, useState} from 'react';
import {ToastAndroid} from 'react-native';

import db from '@react-native-firebase/firestore';
import {ListingPagePresenter} from 'screens/app/listing-page/listing-page-presenter';
import {jobFilters} from 'screens/app/listing-page/filters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUserData} from '../../../UserContext';

export const JobListingPage = ({navigation}) => {
  // const filterOptions = {...jobFilters};
  const [refreshing, setRefreshing] = useState(false);
  const {userData} = useUserData();
  const [filters, setFilters] = useState({...jobFilters});
  const [listOfJobs, setListOfJobs] = useState([]);
  const [lastJobDocument, setLastJobDocument] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const flatListRef = useRef(null);
  const offsetRef = useRef(0);
  const limit = 10;
  const jobOpenings = db().collection('jobOpenings');
  const handleScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const dif = currentOffset - (offsetRef.current || 0);
    if (Math.abs(dif) < 3) {
      return;
    } else if (dif < 0) {
      navigation.setOptions({
        tabBarStyle: {
          backgroundColor: 'black',
        },
        tabBarShowLabel: false,
      });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
    }

    offsetRef.current = currentOffset;
  };

  async function LoadData() {
    console.log('Last job', lastJobDocument);
    setIsLoading(true);
    try {
      let query = jobOpenings
        // .where('salaryStructure.minimumSalary', '==', '80000')
        .orderBy('timestamp', 'desc');

      // sort the data
      if (lastJobDocument !== undefined) {
        query = query.startAfter(lastJobDocument); // fetch data following the last document accessed
      }
      query
        .limit(limit) // limit to your page size, 3 is just an example
        .get()
        .then(querySnapshot => {
          const size = querySnapshot.size;
          if (size === 0) {
            ToastAndroid.show('No more jobs founded', ToastAndroid.SHORT);
            return;
          }
          setLastJobDocument(
            () => querySnapshot.docs[querySnapshot.docs.length - 1],
          );
          const jobs = querySnapshot.docs.map(job => ({
            ...job.data(),
            id: job.id,
          }));
          setListOfJobs([...listOfJobs, ...jobs]);
        });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  function searchByFilter() {}
  // const loadMoreJobs = () => {};
  useEffect(() => {
    LoadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    const lastDocument = lastJobDocument;
    const tempListOfJobs = listOfJobs;
    setLastJobDocument(() => null);
    setListOfJobs(() => null);
    try {
      await LoadData();
    } catch (e) {
      setListOfJobs(tempListOfJobs);
      setLastJobDocument(lastDocument);
    }
    setRefreshing(false);
  };
  return (
    <ListingPagePresenter
      filters={filters}
      setFilters={setFilters}
      isLoading={isLoading}
      flatListRef={flatListRef}
      handleScroll={handleScroll}
      loadData={LoadData}
      listOfJobs={listOfJobs}
      userData={userData}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};
