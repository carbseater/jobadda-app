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
  const [isFilterEdited,setIsFilterEdited] = useState(false);
  const {userData} = useUserData();
  const [filters, setFilters] = useState(jobFilters);
  const [listOfJobs, setListOfJobs] = useState([]);
  const [lastJobDocument, setLastJobDocument] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const flatListRef = useRef(null);
  const offsetRef = useRef(0);
  const limit = 10;
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

  const getFilterQuery = ()=>{
    let jobOpenings = db().collection('jobOpenings');

    let query = jobOpenings ;
      Object.entries(filters).map(([key,val])=>{
        const {dbPath,value, operator,selected}  = val;
        // console.log("hii",dbPath,operator,value,selected, typeof value,key);

        if(selected &&  key!='sortBy' && value) {
          if( (typeof value === 'object' && value.length==0)){
            return
          }
          query = query.where(dbPath, operator, value);
          if(dbPath === 'minimumSalary'){
            query = query.orderBy('minimumSalary','asc')
          }
        }
        else if(key==='sortBy' && selected ){
          const sort = value === 'highToLow' ? 'desc':'asc';
          console.log(sort);
          query = query.orderBy('minimumSalary',sort);
        }

        // console.log("hii",dbPath,operator,value,selected, typeof value);

      })

    return query;
  }
  async function LoadData(applyFilter=false) { // using apply filter to avoid suing last document
    // console.log('Last job',filters);
    setIsLoading(true);
    try {

      let query = getFilterQuery()

       // .where('jobDepartment', "==", 'engineering')
      // sort the data
      // console.log('I am lastJobDoc',lastJobDocument)
      if (!applyFilter && lastJobDocument !== undefined) {
        query = query.startAfter(lastJobDocument); // fetch data following the last document accessed
      }

      // console.log("I am query",query.&& (typeof value === Object && value.length))
      query
        .limit(limit) // limit to your page size, 3 is just an example
        .get()
        .then(querySnapshot => {
          const size = querySnapshot.size;
          console.log("jobsss size ",querySnapshot.size)
          if (size === 0) {
            ToastAndroid.show('No more jobs founded', ToastAndroid.SHORT);
            if(applyFilter){
              setListOfJobs([])
            }
            return;
          }
          setLastJobDocument(
            () => querySnapshot.docs[querySnapshot.docs.length - 1],
          );
          const jobs = querySnapshot.docs.map(job => ({
            ...job.data(),
            id: job.id,
          }));
          console.log("Hee",applyFilter);

          if(!applyFilter) {
            setListOfJobs([...listOfJobs, ...jobs]);
          }
          else
            setListOfJobs([...jobs])
          // console.log("jobsss",jobs)

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

  useEffect(() => {
    if(isFilterEdited){
      setIsFilterEdited(false);
      console.log("hii isFiltered")
      LoadData(true);
    }
  }, [isFilterEdited]);

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
      setLastJobDocument={setLastJobDocument}
      setIsFilterEdited={setIsFilterEdited}
    />
  );
};
