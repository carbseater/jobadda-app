import {StyleSheet, View, Text} from 'react-native';
import {IconButton, Paragraph} from 'react-native-paper';
import {scale} from 'react-native-size-matters';
import {padding} from 'styleConfig/padding';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {formatIndianCurrency, formatNumberWithCommas} from 'utils/general-fn';
export const JobCard = ({jobData}) => {
  const {
    companyName,
    aboutCompany,
    jobTitle,
    companyCity,
    maximumSalary,
    minimumSalary,
    noOfjobOpenings,
  } = jobData;
  //   console.log(minimumSalary, maximumSalary);
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <MaterialCommunityIcons
          color="grey"
          size={40}
          name={'office-building'}
        />
        <View style={{flex: 1}}>
          <Text
            style={{fontWeight: 'bold', color: 'black', fontSize: scale(15)}}>
            {companyName}
          </Text>
          <Text style={{fontWeight: '300', color: 'black'}}>
            {aboutCompany}
          </Text>
        </View>
        <IconButton
          color="grey"
          style={{alignSelf: 'flex-end'}}
          icon={'chevron-right'}
        />
      </View>

      <View style={{paddingHorizontal: scale(5)}}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <MaterialIcon color="grey" name="location-pin" />
          <Paragraph>{companyCity}</Paragraph>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          {/* <Icon name="mo" /> */}
          <MaterialCommunityIcons color="grey" name="cash-100" />
          <Paragraph style={{color: 'grey'}}>
            ₹{formatIndianCurrency(minimumSalary)} - ₹
            {formatIndianCurrency(maximumSalary)}
          </Paragraph>
        </View>
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: scale(80),
    borderWidth: 0.5,
    borderRadius: scale(4),
    borderColor: 'grey',
    marginVertical: scale(10),
    padding: padding.small,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});
