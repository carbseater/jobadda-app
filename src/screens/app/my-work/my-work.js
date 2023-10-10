import {View, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {collection} from 'constants/dbConstants';
import {useAuth} from 'AuthContext';
import {getRelativeDate, nearestFiveYear} from 'utils/general-fn';
import {Button, Surface, Text} from 'react-native-paper';
import {padding} from 'styleConfig/padding';
import {margin} from 'styleConfig/margin';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const AppliedJobCard = ({data}) => {
  return (
    <Surface mode="flat" style={styles.body}>
      <View style={styles.row}>
        <View>
          <Text variant="bold">{data.companyName}</Text>
          <Text>{data.jobTitle}</Text>
        </View>

        <Button style={styles.button} mode="contained">
          Call HR
        </Button>
      </View>

      <View style={styles.footer}>
        <Surface mode={'flat'} style={styles.chip}>
          <Text style={{fontSize: 13, color: '#454A64'}}>
            {data.status.toUpperCase()}
          </Text>
        </Surface>
        <Text style={{fontSize: 10}}>{getRelativeDate(data.appliedOn)}</Text>
      </View>
    </Surface>
  );
};
export const AppliedJobList = () => {
  const [jobListData, setJobListData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {
    currentUser: {uid},
  } = useAuth();
  const year = nearestFiveYear();

  const fetchAppliedJobs = async () => {
    setIsLoading(true);
    const response = await firestore()
      .doc(`${collection.EMPLOYEE}/${uid}/${collection.APPLIED_JOBS}/${year}`)
      .get();
    if (response.exists) {
      const list = Object.entries(response.data());
      setJobListData(list);
      console.log(list);
    }

    setIsLoading(false);
  };
  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={jobListData}
        renderItem={({item}) => {
          // console.log(item.companyName);
          return <AppliedJobCard data={item[1]} />;
        }}
        keyExtractor={item => item[0]}
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
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: padding.smallMd,
  },
  body: {
    borderRadius: 3,
    // borderWidth: 0.3,
    padding: padding.small,
    marginTop: margin.large,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    borderRadius: 5,
  },
  status: {
    padding: padding.smallXs,
    // backgroundColor: 'green',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: margin.smallMd,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.small,
    paddingVertical: 2,
    gap: 3,
    justifyContent: 'center',
    backgroundColor: '#e6eaea',
    borderRadius: 5,
  },
});
