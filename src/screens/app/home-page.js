import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {useAuth} from 'AuthContext';
import database from '@react-native-firebase/database';

export default function HomePage() {
  const {logout} = useAuth();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedCity, setSelectedCity] = useState('Bhangel');
  useEffect(() => {
    database()
      .ref(`/states/uttar_pradesh/${selectedCity}/jobOpenings`)
      .on('value', snapshot => {
        console.log('Job openings ', snapshot.val());
        const jobOpenings = snapshot.val();
        setFilteredJobs(prevState => []);
        Object.values(jobOpenings || {}).forEach(jobId => {
          database()
            .ref(`jobOpenings/${jobId}`)
            .once('value', snapshot => {
              const jobData = snapshot.val();
              setFilteredJobs(prevState => [...prevState, jobData]);
            });
        });
      });

    // Stop listening for updates when no longer required
    // return () => database().ref(`/users/${userId}`).off('value', jobOpeningsId);
  }, [selectedCity]);
  //   console.log(filteredJobs);
  return (
    <View>
      <Button mode="outlined" onPress={logout}>
        Logout
      </Button>
      <FlatList
        data={filteredJobs}
        renderItem={({item, index}) => {
          //   console.log('item', item);
          return (
            <Text>
              {item.companyName} - {item.aboutCompany} -
            </Text>
          );
        }}
      />
    </View>
  );
}
