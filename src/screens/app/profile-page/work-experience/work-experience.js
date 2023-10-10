import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {WorkExperienceForm} from './work-experience-form';
import db from '@react-native-firebase/firestore';
import {collection} from 'constants/dbConstants';
import {nearestFiveYear} from 'utils/general-fn';
import {WorkExperienceCard} from './work-experience-card';
import {useAuth} from 'AuthContext';
import {padding} from 'styleConfig/padding';
const WorkExperience = () => {
  const [isLoading, setIsloading] = useState(true);
  const [workExperienceFormVisible, setWorkExperienceFormVisible] =
    useState(false);
  const [workExperience, setWorkExperience] = useState(null);
  const {
    currentUser: {uid},
    logout,
  } = useAuth();
  console.log('UID', uid);
  useEffect(() => {
    const year = nearestFiveYear();
    // console.log(year);
    const fetch = async () => {
      const data = await db()
        .doc(
          `${collection.EMPLOYEE}/${uid}/${collection.WORK_EXPERIENCE}/${year}`,
        )
        .get();
      setWorkExperience(data.data().data);
      // console.log('Data', data.data());
    };
    fetch();

    // return () => unsubscribe();
  }, []);
  return (
    <View>
      <View style={styles.container}>
        <Button
          mode="contained"
          icon="plus"
          compact
          onPress={() => setWorkExperienceFormVisible(true)}
          style={styles.actionButton}>
          Add experience
        </Button>

        <WorkExperienceForm
          visible={workExperienceFormVisible}
          dismiss={() => setWorkExperienceFormVisible(false)}
        />
        <FlatList
          data={workExperience}
          renderItem={({item}) => {
            // console.log(item.companyName);
            return <WorkExperienceCard work={item} />;
          }}
          ListEmptyComponent={
            <View>
              <Text>It looks empty here !</Text>
              <Text>
                Add your work experience to increase your hiring chances
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

export default WorkExperience;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: padding.smallMd,
  },
});
