import {ScrollView, StyleSheet, View, Image} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  Divider,
  IconButton,
  Paragraph,
  Surface,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import {useEffect} from 'react';
import {padding} from '../../../styleConfig/padding';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatIndianCurrency, truncateString} from 'utils/general-fn';

import {image} from 'constants/image';
import {scale} from 'react-native-size-matters';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
export const JobDetail = ({navigation, route}) => {
  console.log(route.params);
  const [jobDescrptionVisible, setJobDescrptionVisible] = useState(false);
  const {
    aboutJob: {
      aboutCompany,
      companyAddress,
      companyCity,
      companyName,
      jobDepartment,
      jobLastDate,
      jobTitle,
      jobType,
      noOfOpenings,
    },
    metaData: {},
    salaryStructure: {
      incentiveAmount,
      maximumSalary,
      minimumSalary,
      overtimeAmount,
    },
    workBenefits,
  } = route.params;
  const totalEarning =
    parseInt(maximumSalary || 0, 10) + parseInt(overtimeAmount || 0, 10);
  console.log(totalEarning);
  useEffect(() => {
    navigation.getParent().setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });

    return () => {
      navigation.getParent().setOptions({
        tabBarStyle: {
          backgroundColor: 'black',
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      });
    };
  }, []);
  const jobDescription = `Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;
  return (
    <View style={styles.container}>
      <TouchableRipple
        onPress={() => navigation.pop()}
        style={{padding: 10, alignSelf: 'flex-start'}}>
        <MaterialCommunityIcons name={'arrow-left'} size={30} color={'black'} />
      </TouchableRipple>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.body}>
        <View style={styles.aboutCompany}>
          <MaterialCommunityIcons
            color="grey"
            size={55}
            name={'office-building'}
          />
          <View style={{paddingRight: 10}}>
            <Text variant={'headlineSmall'} style={{fontWeight: 'bold'}}>
              {companyName}
            </Text>
            <Text>{jobTitle}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: padding.small,
                paddingVertical: 2,
                gap: 3,
                alignSelf: 'flex-start',
                justifyContent: 'center',
                backgroundColor: '#e6eaea',
                borderRadius: 5,
                marginTop: 5,
              }}>
              <MaterialIcon color="#454A64" name="location-pin" />
              <Text style={{fontSize: 13, color: '#454A64'}}>
                {companyCity}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.salarySection}>
          <Text
            variant={'bodyLarge'}
            style={{color: 'black', fontWeight: 'bold'}}>
            Salary
          </Text>
          <View style={styles.salary}>
            <Text>Minimum salary</Text>
            <Text>₹ {formatIndianCurrency(minimumSalary)}</Text>
          </View>
          <Divider />
          <View style={styles.salary}>
            <Text>Maximum salary</Text>
            <Text>₹ {formatIndianCurrency(maximumSalary)}</Text>
          </View>
          <Divider />
          <View style={styles.salary}>
            <Text>Overtime</Text>
            <Text>₹ {formatIndianCurrency(overtimeAmount) || '_'}</Text>
          </View>
          <Divider />
          <View style={styles.salary}>
            <Text>Total earnings</Text>
            <Text style={{fontWeight: 'bold'}}>
              ₹ {formatIndianCurrency(totalEarning)}
            </Text>
          </View>
        </View>
        {/*Benefits*/}
        <View>
          <Text
            variant={'bodyLarge'}
            style={{color: 'black', fontWeight: 'bold'}}>
            Benefits
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.benefitSection}>
            {Object.entries(workBenefits).map(([key, benefit]) => {
              return (
                benefit.available && (
                  <View style={styles.jobBenefits}>
                    <Image
                      source={image[benefit.id]}
                      style={{resizeMode: 'cover', height: 40, width: 40}}
                    />
                    <Text style={{fontSize: 14}}>{benefit.label}</Text>
                  </View>
                )
              );
            })}
          </ScrollView>
        </View>

        {/*Job description*/}
        <View>
          <Text
            variant={'bodyLarge'}
            style={{color: 'black', fontWeight: 'bold'}}>
            Job description
          </Text>
          <View>
            <Text>
              {jobDescrptionVisible
                ? jobDescription
                : truncateString(jobDescription, 200)}
            </Text>
            {jobDescription.length > 200 && (
              <Button
                labelStyle={{fontSize: 12}}
                style={{alignSelf: 'flex-end'}}
                onPress={() => setJobDescrptionVisible(!jobDescrptionVisible)}>
                {jobDescrptionVisible ? 'Show less' : 'Show more'}
              </Button>
            )}
          </View>
        </View>
        <View style={styles.jobRequirementSection}>
          <View style={styles.jobRequirement}>
            <View>
              <Text style={{fontSize: 12}}>Job department</Text>
              <Text style={{fontWeight: 'bold'}}>{jobDepartment}</Text>
            </View>
          </View>
          <Divider />
          <View style={styles.jobRequirement}>
            <View>
              <Text style={{fontSize: 12}}>Minimum experience</Text>
              <Text style={{fontWeight: 'bold'}}>1-2 yrs</Text>
            </View>
          </View>
          <Divider />
          <View style={styles.jobRequirement}>
            <View>
              <Text style={{fontSize: 12}}>Minimum education</Text>
              <Text style={{fontWeight: 'bold'}}>10th or above</Text>
            </View>
          </View>
          <Divider />
          <View style={styles.jobRequirement}>
            <View>
              <Text style={{fontSize: 12}}>Job type</Text>
              <Text style={{fontWeight: 'bold'}}>{jobType}</Text>
            </View>
          </View>
          <Divider />
          <View style={styles.jobRequirement}>
            <View>
              <Text style={{fontSize: 12}}>Company address</Text>
              <Text style={{fontWeight: 'bold'}}>{companyAddress}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button mode={'contained'} style={styles.actionButton}>
          Apply now
        </Button>
        <Button mode={'contained'} style={styles.actionButton} icon={'phone'}>
          Call
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  aboutCompany: {
    flexDirection: 'row',
    gap: 8,

    alignItems: 'flex-start',
  },
  divider: {
    height: 12,
    backgroundColor: '#e3e1e1',
  },
  body: {
    gap: 25,
    padding: padding.smallMd,
  },
  salary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  jobBenefits: {
    minHeight: 80,
    minWidth: 80,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 0.2,
    justifyContent: 'center',

    alignItems: 'center',
    padding: padding.mediumLg,
    gap: 7,
  },
  jobRequirement: {
    flexDirection: 'row',
    gap: 8,
  },
  jobRequirementSection: {
    gap: 5,
  },
  benefitSection: {
    gap: 15,

    flexDirection: 'row',
    minHeight: 100,
    marginTop: 5,
    paddingVertical: padding.small,
  },
  salarySection: {
    gap: 5,
  },
  footer: {
    flexDirection: 'row',
    borderWidth: 1,
    minHeight: scale(60),
    backgroundColor: 'black',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  actionButton: {
    // height: scale(40),
  },
});
