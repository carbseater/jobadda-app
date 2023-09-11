import React, {useEffect, useRef, useState} from 'react';
import {ToastAndroid} from 'react-native';

import db from '@react-native-firebase/firestore';
import {ListingPagePresenter} from 'screens/app/listing-page/listing-page-presenter';
import {jobFilters} from 'screens/app/listing-page/filters';

export const JobListingPage = ({navigation}) => {
  const [filters, setFilters] = useState(jobFilters);
  const [listOfJobs, setListOfJobs] = useState([]);
  const [lastJobDocument, setLastJobDocument] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const flatListRef = useRef(null);
  const offsetRef = useRef(0);
  const limit = 2;
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

  function LoadData() {
    setIsLoading(true);
    try {
      let query = jobOpenings
        .where('salaryStructure.minimumSalary', '==', '80000')
        .where('aboutCompany.companyCity', '==', 'Noida')
        .orderBy('metaData.timestamp', 'desc');
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
          const jobs = querySnapshot.docs.map(job => job.data());
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

  return (
    <ListingPagePresenter
      filters={filters}
      setFilters={setFilters}
      isLoading={isLoading}
      flatListRef={flatListRef}
      handleScroll={handleScroll}
      loadData={LoadData}
      listOfJobs={listOfJobs}
    />
  );
};
