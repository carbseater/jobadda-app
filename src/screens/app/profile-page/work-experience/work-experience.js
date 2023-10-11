import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Divider, Text} from 'react-native-paper';
import {WorkExperienceForm} from './work-experience-form';
import db from '@react-native-firebase/firestore';
import {collection} from 'constants/dbConstants';
import {nearestFiveYear} from 'utils/general-fn';
import {WorkExperienceCard} from './work-experience-card';
import {useAuth} from 'AuthContext';
import {padding} from 'styleConfig/padding';
import {CircularLoader} from 'components/CircularLoader';
import EmptyBox from 'components/EmptyBox';
const WorkExperience = () => {
  const [isLoading, setIsloading] = useState(true);
  const [workExperienceFormVisible, setWorkExperienceFormVisible] =
    useState(false);
  const [workExperience, setWorkExperience] = useState(null);
  const {
    currentUser: {uid},
  } = useAuth();
  useEffect(() => {
    const year = nearestFiveYear();
    const fetch = async () => {
      const data = await db()
        .doc(
          `${collection.EMPLOYEE}/${uid}/${collection.WORK_EXPERIENCE}/${year}`,
        )
        .get();
      setWorkExperience(data.data().data);
      setIsloading(false);
    };
    fetch();
  }, []);
  if (isLoading) return <CircularLoader />;
  return (
    <View>
      <View style={styles.container}>
        <Button
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
          showsVerticalScrollIndicator={false}
          data={workExperience}
          renderItem={({item}) => {
            return <WorkExperienceCard work={item} />;
          }}
          ItemSeparatorComponent={
            <View
              style={{
                height: 30,
                borderLeftWidth: 2,
                borderStyle: 'dashed',
                marginLeft: 15,
              }}
            />
          }
          ListEmptyComponent={<EmptyBox />}
        />
      </View>
    </View>
  );
};

export default WorkExperience;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: padding.smallMd,
    borderRadius: 3,
  },
  actionButton: {
    alignSelf: 'flex-end',
  },
});
