import {StyleSheet, View} from 'react-native';
import React from 'react';
import {
  IconButton,
  Paragraph,
  useTheme,
  Avatar,
  Text,
  TouchableRipple,
  Surface,
} from 'react-native-paper';
import {scale} from 'react-native-size-matters';
import {padding} from 'styleConfig/padding';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  formatIndianCurrency,
  formatNumberWithCommas,
  getRelativeDate,
} from 'utils/general-fn';
import {useNavigation} from '@react-navigation/native';
import {nav} from 'constants/navigation';
export const JobCard = ({jobData}) => {
  const {
    companyCity,
    companyName,
    jobTitle,
    jobType,
    timestamp,
    maximumSalary,
    minimumSalary,
    jobDepartment,
    workBenefits: {
      nightShiftAvailable,
      providentFundAvailable,
      travelAllowanceAvailable,
      lunchMealAvailable,
      employeeInsurance,
      overtime,
    } = {},
  } = jobData ?? {};
  //   console.log(minimumSalary, maximumSalary);
  const {colors} = useTheme();
  const navigation = useNavigation();
  return (
    <Surface style={styles.container}>
      <View style={{flexDirection: 'row', gap: 5}}>
        <MaterialCommunityIcons
          color={colors.onPrimaryContainer}
          size={40}
          name={'office-building'}
          style={{flex: 0.1}}
        />
        <View style={{flex: 0.9, gap: 8}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: scale(15),
                  fontWeight: '800',
                }}>
                {companyName}
              </Text>
              <Text
                style={{
                  fontWeight: '300',
                  color: 'black',
                }}>{`${jobTitle} • ${jobDepartment}`}</Text>
            </View>

            <TouchableRipple
              borderless={true}
              onPress={() =>
                navigation.navigate(nav.JOB_DETAILS, {...jobData})
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
            ₹{formatIndianCurrency(minimumSalary)} - ₹
            {formatIndianCurrency(maximumSalary)}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <Surface
              mode={'flat'}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: padding.small,
                paddingVertical: 2,
                gap: 3,
                justifyContent: 'center',
                // backgroundColor: '#e6eaea',
                borderRadius: 5,
              }}>
              <MaterialIcon color="#454A64" name="location-pin" />
              <Text style={{fontSize: 13, color: '#454A64'}}>
                {companyCity}
              </Text>
            </Surface>
            <Text style={{fontSize: 10}}>{getRelativeDate(timestamp)}</Text>
          </View>
        </View>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: scale(80),
    borderWidth: 0.3,
    borderRadius: scale(5),
    borderColor: 'grey',
    marginVertical: scale(10),
    padding: padding.smallLg,
    elevation: 8,
    shadowColor: '#b2aeae',
    backgroundColor: 'white',
  },
  head: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});
