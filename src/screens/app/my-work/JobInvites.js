import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {collection} from 'constants/dbConstants';
import {useAuth} from 'AuthContext';
import {
  formatIndianCurrency,
  getRelativeDate,
  nearestFiveYear,
} from 'utils/general-fn';
import {CircularLoader} from 'components/CircularLoader';
import {useNavigation} from '@react-navigation/native';
import {
  Surface,
  useTheme,
  Text,
  TouchableRipple,
  Paragraph,
} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {padding} from 'styleConfig/padding';
import {nav} from 'constants/navigation';
import {margin} from 'styleConfig/margin';
import {lightColors} from 'core/theme';
import EmptyBox from 'components/EmptyBox';

export function JobInvites() {
  const [jobInvites, setJobInvites] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const {
    currentUser: {uid},
  } = useAuth();
  const {colors} = useTheme();

  const fetchJobInvites = async () => {
    const year = nearestFiveYear();
    const response = await firestore()
      .doc(`${collection.EMPLOYEE}/${uid}/${collection.JOB_INVITES}/${year}`)
      .get();
    if (response.exists) {
      const data = Object.entries(response.data());
      setJobInvites(data);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchJobInvites();
  }, []);
  if (isLoading) return <CircularLoader />;
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={jobInvites}
        renderItem={({item}) => {
          return <JobInviteCard data={item[1]} jobId={item[0]} />;
        }}
        keyExtractor={item => item[0]}
        ItemSeparatorComponent={() => <View style={{height: 20}} />}
        ListHeaderComponent={<View style={{height: 20}} />}
        ListEmptyComponent={
          <EmptyBox message={'You have no job invites yet.'} />
        }
      />
    </View>
  );
}

const JobInviteCard = ({data, jobId}) => {
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
        ₹{formatIndianCurrency(data.minimumSalary)} - ₹
        {formatIndianCurrency(data.maximumSalary)}
      </Text>
      <Text style={{fontSize: 12}}>{data.message}</Text>
      <View style={styles.footer}>
        <Surface mode={'flat'} style={styles.chip}>
          <MaterialIcon color="#454A64" name="location-pin" />
          <Text style={{fontSize: 13, color: '#454A64'}}>
            {data.companyCity.toUpperCase()}
          </Text>
        </Surface>
        <Text style={{fontSize: 10}}>{getRelativeDate(data.invitedOn)}</Text>
      </View>
    </Surface>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: padding.smallMd,
  },
  body: {
    gap: 5,
    borderRadius: 3,
    padding: padding.small,
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
