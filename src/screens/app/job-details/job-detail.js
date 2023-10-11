import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  ToastAndroid,
  Platform,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  Divider,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import {useEffect} from 'react';
import {padding} from 'styleConfig/padding';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatIndianCurrency, truncateString} from 'utils/general-fn';
import firestore from '@react-native-firebase/firestore';
import {image} from 'constants/image';
import {scale} from 'react-native-size-matters';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {applyForJob} from 'firebase-database/write-operations';
import {useAuth} from 'AuthContext';
import {useUserData} from 'UserContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {collection} from 'constants/dbConstants';
import {useNavigation} from '@react-navigation/native';
import {CircularLoader} from 'components/CircularLoader';

export const JobDetail = ({navigation, route}) => {
  const {userData} = useUserData();
  const {colors} = useTheme();
  const [jobDetail, setJobDetail] = useState();
  const [jobDescrptionVisible, setJobDescrptionVisible] = useState(false);
  const navigate = useNavigation();
  const [isLoading, setIsloading] = useState(true);
  const {id, callFromDb = false} = route.params;
  // console.log('JOBDIIIID', id);
  const {
    aboutCompany,
    companyAddress,
    companyCity,
    companyName,
    jobDepartment,
    jobLastDate,
    jobTitle,
    jobType,
    noOfjobOpenings,
    employerMobileNo,
    incentiveAmount,
    maximumSalary,
    minimumSalary,
    overtimeAmount,
    workBenefits,
  } = jobDetail ?? {};
  const totalEarning =
    parseInt(maximumSalary || 0, 10) + parseInt(overtimeAmount || 0, 10);
  const {
    currentUser: {uid},
  } = useAuth();
  const {appliedJobs} = useUserData();
  const isAppliedAlready = appliedJobs.includes(id);
  console.log(appliedJobs);
  const handlePhoneCall = () => {
    if (!employerMobileNo) {
      ToastAndroid.show('No contact found', ToastAndroid.SHORT);
      return;
    }
    let phoneNumber = employerMobileNo;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${employerMobileNo}`;
    } else {
      phoneNumber = `tel:${employerMobileNo}`;
    }
    Linking.openURL(phoneNumber)
      .then(res => {
        console.log('Opened the phone');
      })
      .catch(err => {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      });
  };

  const fetchJobDetail = async jobId => {
    const response = await firestore()
      .doc(`${collection.JOB_OPENING}/${jobId}`)
      .get();
    if (response.exists) {
      setJobDetail(response.data());
    }
    setIsloading(false);
  };
  useEffect(() => {
    navigation.getParent().setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });

    if (callFromDb) fetchJobDetail(id);
    else {
      setJobDetail(route.params);
      setIsloading(false);
    }

    return () => {
      navigation.getParent().setOptions({
        tabBarStyle: {
          backgroundColor: 'white',
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      });
    };
  }, []);
  const jobDescription = `Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;
  const handleApplyJob = async () => {
    const payload = {
      status: 'In review',
      companyName,
      jobTitle,
      appliedOn: firestore.FieldValue.serverTimestamp(),
      message: 'Your application is under review',
      contactNo: employerMobileNo,
    };
    console.log('payload', payload, uid, id);
    try {
      await applyForJob(payload, uid, id, userData);
    } catch (e) {
      console.log('Error while applying', e);
    }
  };
  if (isLoading) return <CircularLoader />;
  return (
    <View style={styles.container}>
      <View style={{padding: 8}}>
        <TouchableRipple
          onPress={() => navigate.goBack()}
          style={{
            padding: 5,
            borderRadius: 50,
            alignSelf: 'flex-start',
            backgroundColor: colors.primaryContainer,
          }}>
          <MaterialCommunityIcons name={'arrow-left'} size={25} />
        </TouchableRipple>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.body}>
        <View style={styles.aboutCompany}>
          <MaterialCommunityIcons
            color="black"
            size={60}
            name={'office-building'}
          />
          <View style={{paddingRight: 10}}>
            <Text variant="bold" style={{fontSize: 18}}>
              {companyName}
            </Text>
            <Text>{jobTitle}</Text>
            <Surface
              mode={'flat'}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: padding.small,
                paddingVertical: 2,
                gap: 3,
                alignSelf: 'flex-start',
                justifyContent: 'center',
                // backgroundColor: '#e6eaea',
                borderRadius: 5,
                marginTop: 5,
              }}>
              <MaterialIcon color="#454A64" name="location-pin" />
              <Text style={{fontSize: 13, color: '#454A64'}}>
                {companyCity}
              </Text>
            </Surface>
          </View>
        </View>

        <Surface style={styles.salarySection} mode={'flat'}>
          <Text variant={'bold'} style={{color: 'black'}}>
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
            <Text variant={'bold'}>₹ {formatIndianCurrency(totalEarning)}</Text>
          </View>
        </Surface>
        {/*Benefits*/}
        {workBenefits && (
          <View>
            <Text variant="bold" style={{color: 'black'}}>
              Benefits
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.benefitSection}>
              {Object.entries(workBenefits).map(([key, benefit]) => {
                return (
                  benefit.available && (
                    <View style={styles.jobBenefits} key={benefit.id}>
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
        )}

        {/*Job description*/}
        <View>
          <Text variant="bold" style={{color: 'black'}}>
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
        <Surface mode={'flat'} style={styles.jobRequirementSection}>
          <View style={styles.jobRequirement}>
            <View>
              <Text style={{fontSize: 12}}>Job openings/vacancy</Text>
              <Text variant="bold">{noOfjobOpenings}</Text>
            </View>
          </View>
          <Divider />
          <View style={styles.jobRequirement}>
            <View>
              <Text style={{fontSize: 12}}>Job department</Text>
              <Text variant="bold">{jobDepartment}</Text>
            </View>
          </View>
          <Divider />
          <View style={styles.jobRequirement}>
            <View>
              <Text style={{fontSize: 12}}>Minimum experience</Text>
              <Text variant="bold">1-2 yrs</Text>
            </View>
          </View>
          <Divider />
          <View style={styles.jobRequirement}>
            <View>
              <Text style={{fontSize: 12}}>Minimum education</Text>
              <Text variant="bold">10th or above</Text>
            </View>
          </View>
          <Divider />
          <View style={styles.jobRequirement}>
            <View>
              <Text style={{fontSize: 12}}>Job type</Text>
              <Text variant="bold">{jobType}</Text>
            </View>
          </View>
          <Divider />
          <View style={styles.jobRequirement}>
            <View>
              <Text style={{fontSize: 12}}>Company address</Text>
              <Text variant="bold">{companyAddress}</Text>
            </View>
          </View>
        </Surface>
      </ScrollView>
      {isAppliedAlready && (
        <Surface
          style={{
            backgroundColor: '#fbe385',
            padding: padding.small,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,

            borderRadius: 5,
          }}>
          <AntDesign name={'infocirlceo'} color={'black'} />
          <Text style={{fontSize: 15}}>
            {'You have succesfully applied for this job'}
          </Text>
        </Surface>
      )}
      <Surface style={[styles.actionButton]}>
        <Button onPress={handlePhoneCall} style={{flex: 0.5}} icon={'phone'}>
          Call
        </Button>
        {!isAppliedAlready && (
          <Button
            onPress={handleApplyJob}
            style={{flex: 0.5, borderRadius: 5}}
            mode={'contained'}>
            Apply now
          </Button>
        )}
      </Surface>
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
    minHeight: 100,
    minWidth: 100,
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
    padding: padding.small,
    borderRadius: 5,
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
    padding: padding.small,
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'row',
    borderWidth: 1,
    minHeight: scale(60),
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: scale(50),
    paddingHorizontal: padding.small,
  },
});
