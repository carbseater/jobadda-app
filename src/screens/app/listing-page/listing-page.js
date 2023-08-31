import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import database from '@react-native-firebase/database';
import {CircularLoader} from 'components/CircularLoader';
import {Chip, Searchbar, Surface, useTheme} from 'react-native-paper';
import {JobCard} from './job-card';
import {padding} from 'styleConfig/padding';
import {scale} from 'react-native-size-matters';
import ChipDropdown from 'components/ChipDropdown';
import {cityOptions, departments} from 'constants/dropdown-options';
import CheckBox from 'components/CheckBox';

export const JobListingPage = ({navigation}) => {
  const [lastKey, setLastKey] = useState(null);
  const [userData, setUserData] = useState([]);
  const [jobKeys, setJobKeys] = useState(new Map());
  const [department, setDepartment] = useState(null);
  const [city, setCity] = useState(null);
  const [nightJob, setNightJob] = useState(false);
  const {colors} = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const flatListRef = useRef(null);
  const offsetRef = useRef(0);
  const limit = 14;

  const handleScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const dif = currentOffset - (offsetRef.current || 0);
    // console.log('diff', dif);
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
  const fetchJobs = async () => {
    setIsLoading(true);
    console.log('triggered');
    // setTimeout(() => {
    //   console.log('triggered1');
    // }, 5000);

    const userReference = database().ref('jobOpenings/').orderByKey();
    let query = userReference;
    if (lastKey !== null) {
      if (lastKey.key === 'end' && lastKey.name === 'end') {
        setIsLoading(false);
        return;
      }
      query = query.startAt(lastKey.key).limitToFirst(limit + 1);
    } else {
      query = query.limitToFirst(limit + 1);
    }

    query.once('value', snapshot => {
      const fetchedData = snapshot.val();
      if (fetchedData) {
        const fetchedArray = Object.entries(fetchedData);
        if (fetchedArray.length > 0) {
          const lastItem = fetchedArray[0];
          if (fetchedArray.length < limit) {
            setLastKey(() => {
              return {key: 'end', name: 'end'};
            });
            setUserData(prevData => [...prevData, ...fetchedArray]);
          } else {
            setLastKey(() => {
              return {key: lastItem[0], name: lastItem[1].companyName};
            });
            setUserData(prevData => [...prevData, ...fetchedArray.slice(1)]);
          }

          setIsLoading(() => false);
        }
      }
    });
  };

  useEffect(() => {
    fetchJobs();
    return () => database().ref('jobOpenings/').off();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Searchbar placeholder="Search" style={styles.searchBar} />
      <View style={styles.filterBar}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.filterBody}>
          <ChipDropdown
            label={'Department'}
            chipOptions={departments}
            disabled={false}
            onChange={setDepartment}
            value={department}
            iconName={'menu-down'}
          />
          <ChipDropdown
            label={'City'}
            chipOptions={cityOptions}
            disabled={false}
            onChange={setCity}
            value={city}
            iconName={'menu-down'}
          />

          {/* <CheckBox
            label={'Night shift'}
            onChange={setNightJob}
            value={nightJob}
          /> */}
          <Chip selected closeIcon={null}>
            Night shift
          </Chip>
        </ScrollView>
        {/* <ScrollView
          horizontal
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}>
          <ChipDropdown
            label={'Department'}
            chipOptions={departments}
            disabled={false}
            onChange={setDepartment}
            value={department}
            iconName={'menu-down'}
          />
          <ChipDropdown
            label={'City'}
            chipOptions={cityOptions}
            disabled={false}
            onChange={setCity}
            value={city}
            iconName={'menu-down'}
          />
          <ChipDropdown
            label={'City'}
            chipOptions={cityOptions}
            disabled={false}
            onChange={setCity}
            value={city}
            iconName={'menu-down'}
          />
          <ChipDropdown
            label={'City'}
            chipOptions={cityOptions}
            disabled={false}
            onChange={setCity}
            value={city}
            iconName={'menu-down'}
          />
        </ScrollView> */}
      </View>
      {userData && userData.length > 0 && (
        <View style={{paddingHorizontal: padding.smallLg, flex: 1}}>
          <FlatList
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            data={userData}
            renderItem={({item}) => <JobCard key={item[0]} jobData={item[1]} />}
            onScroll={handleScroll}
            onEndReached={async () => {
              await fetchJobs();
              console.log('Scrolled');
            }}
          />
          {isLoading && (
            <ActivityIndicator color={colors.primary} size={'large'} />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 0,
  },
  filterBar: {
    height: scale(40),
  },
  filterBody: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.small,
  },
});
