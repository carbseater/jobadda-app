import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {collection} from 'constants/dbConstants';
import {useAuth} from 'AuthContext';
import {
  formatIndianCurrency,
  getRelativeDate,
  nearestFiveYear,
} from 'utils/general-fn';
import {
  ActivityIndicator,
  Button,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import {padding} from 'styleConfig/padding';
import {margin} from 'styleConfig/margin';
import {useNavigation} from '@react-navigation/native';
import {nav} from 'constants/navigation';
import {CircularLoader} from 'components/CircularLoader';
import {lightColors} from 'core/theme';
import EmptyBox from 'components/EmptyBox';

const AppliedJobCard = ({data, jobId}) => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  return (
    <Surface mode="flat" style={styles.body}>
      <View style={styles.row}>
        <View>
          <Text variant="bold">{data.companyName}</Text>
          <Text>{data.jobTitle}</Text>
        </View>

        <TouchableRipple
          borderless={true}
          onPress={() =>
            navigation.navigate(nav.JOB_DETAILS, {callFromDb: true, id: jobId})
          }>
          <MaterialIcon
            name={'arrow-forward-ios'}
            size={15}
            color={colors.primary}
            style={{padding: padding.small}}
          />
        </TouchableRipple>
      </View>
      <Text style={{color: colors.primary, fontSize: 18}}>
        ₹{formatIndianCurrency(20000)} - ₹{formatIndianCurrency(50000)}
      </Text>
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

  if (isLoading) return <CircularLoader />;
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={jobListData}
        renderItem={({item}) => {
          return <AppliedJobCard data={item[1]} jobId={item[0]} />;
        }}
        keyExtractor={item => item[0]}
        ListEmptyComponent={<EmptyBox message={'Apply for jobs'} />}
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
    gap: 3,
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
    backgroundColor: lightColors.elevation.level4,
    borderRadius: 5,
  },
});
