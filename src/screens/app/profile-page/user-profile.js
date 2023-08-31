import AsyncStorage from '@react-native-async-storage/async-storage';
import {CircularLoader} from 'components/CircularLoader';
import Datepicker from 'components/Datepicker';
import Dropdown from 'components/Dropdown';
import {
  cityOptions,
  departments,
  genderOptions,
  maritialOptions,
} from 'constants/dropdown-options';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import {
  Text,
  TextInput,
  HelperText,
  SegmentedButtons,
  RadioButton as Radio,
  useTheme,
  Button,
  Card,
  Portal,
} from 'react-native-paper';
import {scale} from 'react-native-size-matters';
import {margin} from 'styleConfig/margin';
import {padding} from 'styleConfig/padding';
import {windowHeight} from 'utils/dimension';
import {extendedFunctions} from 'utils/eval';
import {WorkExperienceForm} from './work-experience';
import database from '@react-native-firebase/database';
import {useAuth} from 'AuthContext';
import {WorkExperienceCard} from './work-experience/work-experience-card';
import RadioButton from 'components/RadioButton';

export const UserProfileScreen = () => {
  const {colors} = useTheme();
  const [isLoading, setIsloading] = useState(true);
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
  } = useForm();

  const [isFormEditable, setIsFormEditable] = useState(false);
  const [workExperienceFormVisible, setWorkExperienceFormVisible] =
    useState(false);
  const currentFormValues = watch();
  console.log(currentFormValues);
  const {gender, marriedStatus} = currentFormValues ?? {};
  const [formKey, setFormKey] = useState('work_experience');
  const [workExperience, setWorkExperience] = useState(null);
  const {
    currentUser: {uid},
  } = useAuth();

  const getUserProfile = async () => {
    try {
      let userData = await AsyncStorage.getItem('@userProfile');
      userData = JSON.parse(userData);
      reset(userData);
      setIsloading(false);
    } catch (err) {
      console.log('Error while fetching user', err);
    }
  };
  useEffect(() => {
    getUserProfile();
    const onValueChange = database()
      .ref(`/workers/${uid}/work_experience/`)
      .on('value', snapshot => {
        const workExperienceList = snapshot.val();
        setWorkExperience(prevState => workExperienceList);
      });

    return () =>
      database()
        .ref(`/workers/${uid}/work_experience/`)
        .off('value', onValueChange);
  }, []);

  const userProfileForms = [
    {
      value: 'basic_details',
      label: 'Profile',
      disabled: formKey != 'basic_details',
      icon: 'account',
    },
    {
      value: 'bank_details',
      label: 'Bank details',
      disabled: formKey != 'bank_details',
      icon: 'bank',
    },
    {
      value: 'work_experience',
      label: 'Work',
      disabled: formKey != 'work_experience',
      icon: 'briefcase',
    },
  ];

  const onAddExperienceButton = () => {
    setWorkExperienceFormVisible(true);
  };
  const onSavingForm = formData => {
    if (formKey === 'basic_details') {
      setFormKey('bank_details');
      console.log('FormData', formData);
    } else if (formKey === 'bank_details') {
      setFormKey('work_experience');
    } else {
      console.log('Saving form', formData);
    }
  };

  const onInvalidForm = error => {
    console.log('Errors', error);
    ToastAndroid.show('Please fill the form correctly', ToastAndroid.SHORT);
  };

  const goBackInForm = () => {
    if (formKey === 'basic_details') setFormKey('basic_details');
    else if (formKey === 'bank_details') {
      setFormKey('basic_details');
    } else {
      setFormKey('bank_details');
    }
  };
  if (isLoading) return <CircularLoader />;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <SegmentedButtons
        value={formKey}
        onValueChange={setFormKey}
        buttons={userProfileForms}
        style={styles.segmentButton}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User forms */}
        <View style={{minHeight: scale(windowHeight * 0.68)}}>
          {!isFormEditable && (
            <Button
              onPress={() => setIsFormEditable(true)}
              compact
              mode="contained"
              icon={'pen'}
              style={{
                marginVertical: margin.smallLg,

                alignSelf: 'flex-end',
                borderRadius: 2,
              }}>
              Edit
            </Button>
          )}

          {/* <View style={styles.imageContainer}>
            <Icon name={formIconName[formKey]} size={100} color="#333" />
          </View> */}
          {/* Basic details form */}
          {formKey === 'basic_details' && (
            <View>
              {/* Top section with icon */}

              <Controller
                control={control}
                rules={{
                  required: 'Email is required',
                }}
                render={({field: {onChange, value}}) => (
                  <TextInput
                    mode="outlined"
                    label="Email"
                    // left={<TextInput.Icon icon="email" />}
                    disabled={true}
                    returnKeyType="next"
                    value={value}
                    style={{marginTop: 10}}
                    onChangeText={text => onChange(text)}
                  />
                )}
                name="email"
              />
              {errors.email && (
                <HelperText style={{color: 'red'}}>
                  {errors.email.message}
                </HelperText>
              )}
              <Controller
                control={control}
                rules={{
                  required: 'First name is required',
                  minLength: {
                    value: 2,
                    message: 'First name should contain at least 2 characters',
                  },
                }}
                render={({field: {onChange, value}}) => (
                  <TextInput
                    mode="outlined"
                    label="First name"
                    // left={<TextInput.Icon icon="account" />}
                    disabled={!isFormEditable}
                    returnKeyType="next"
                    value={value}
                    style={{marginTop: 10}}
                    onChangeText={text => onChange(text)}
                  />
                )}
                name="firstName"
              />
              {errors.firstName && (
                <HelperText style={{color: 'red'}}>
                  {errors.firstName.message}
                </HelperText>
              )}
              <Controller
                control={control}
                rules={{
                  required: 'Last name is required',
                  minLength: {
                    value: 2,
                    message: 'Last name should contain at least 2 characters',
                  },
                }}
                render={({field: {onChange, value}}) => (
                  <TextInput
                    mode="outlined"
                    label="Last name"
                    // left={<TextInput.Icon icon="account" />}
                    disabled={!isFormEditable}
                    returnKeyType="next"
                    value={value}
                    style={{marginTop: 10}}
                    onChangeText={text => onChange(text)}
                  />
                )}
                name="lastName"
              />
              {errors.lastName && (
                <HelperText style={{color: 'red'}}>
                  {errors.lastName.message}
                </HelperText>
              )}
              <Controller
                control={control}
                rules={{
                  required: 'City name is required',
                }}
                render={({field: {onChange, value}}) => (
                  <Dropdown
                    dropdownOptions={cityOptions}
                    label={'City'}
                    disabled={!isFormEditable}
                    onChange={onChange}
                    value={value}
                  />
                )}
                name="city"
              />
              {errors.city && (
                <HelperText style={{color: 'red'}}>
                  {errors.city.message}
                </HelperText>
              )}

              <Controller
                control={control}
                rules={{
                  required: 'Gender is required',
                }}
                render={({field: {onChange, value}}) => (
                  <RadioButton
                    label={'Gender'}
                    radioOptions={genderOptions}
                    disabled={!isFormEditable}
                    onChange={onChange}
                    value={value}
                  />
                )}
                name="gender"
              />
              {errors.gender && (
                <HelperText style={{color: 'red'}}>
                  {errors.gender.message}
                </HelperText>
              )}
              <Controller
                control={control}
                rules={{
                  required: 'Date of birth is required',
                }}
                render={({field: {onChange, value}}) => (
                  <Datepicker
                    label={'Date of birth'}
                    value={value}
                    onChange={onChange}
                    disabled={!isFormEditable}
                    minAge={18}
                  />
                )}
                name="dateOfBirth"
              />
              {errors.dateOfBirth && (
                <HelperText style={{color: 'red'}}>
                  {errors.dateOfBirth.message}
                </HelperText>
              )}
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <TextInput
                    disabled={true}
                    mode="outlined"
                    value={
                      extendedFunctions.getAgeFromDate(
                        currentFormValues?.dateOfBirth,
                      ) || null
                    }
                    label="Age"
                  />
                )}
                name="age"
              />
              <Controller
                control={control}
                rules={{
                  required: 'Married status is required',
                }}
                render={({field: {onChange, value}}) => (
                  <Dropdown
                    dropdownOptions={maritialOptions}
                    value={value}
                    label={'Maritial status'}
                    onChange={onChange}
                    disabled={!isFormEditable}
                  />
                )}
                name="marriedStatus"
              />
              {errors.marriedStatus && (
                <HelperText style={{color: 'red'}}>
                  {errors.marriedStatus.message}
                </HelperText>
              )}
              <Controller
                control={control}
                rules={{
                  required: 'Father name is required',
                  minLength: {
                    value: 2,
                    message: 'Father name should contain at least 2 characters',
                  },
                }}
                render={({field: {onChange, value}}) => (
                  <TextInput
                    mode="outlined"
                    label="Father name"
                    // left={<TextInput.Icon icon="account" />}
                    disabled={!isFormEditable}
                    returnKeyType="next"
                    value={value}
                    style={{marginTop: 10}}
                    onChangeText={text => onChange(text)}
                  />
                )}
                name="fatherName"
              />
              {errors.fatherName && (
                <HelperText style={{color: 'red'}}>
                  {errors.fatherName.message}
                </HelperText>
              )}

              {gender === 'female' && marriedStatus === 'Married' && (
                <Controller
                  control={control}
                  rules={{
                    required: 'Husband name is required',
                    minLength: {
                      value: 2,
                      message:
                        'Husband name should contain at least 2 characters',
                    },
                  }}
                  render={({field: {onChange, value}}) => (
                    <>
                      <TextInput
                        mode="outlined"
                        label="Husband name"
                        // left={<TextInput.Icon icon="account" />}
                        disabled={!isFormEditable}
                        returnKeyType="next"
                        value={value}
                        style={{marginTop: 10}}
                        onChangeText={text => onChange(text)}
                      />
                      {errors.husbandName && (
                        <HelperText style={{color: 'red'}}>
                          {errors.husbandName.message}
                        </HelperText>
                      )}
                    </>
                  )}
                  name="husbandName"
                />
              )}
            </View>
          )}

          {/* Bank details form */}
          {formKey === 'bank_details' && (
            <View>
              <Controller
                control={control}
                rules={{
                  required: 'Bank name is required',
                }}
                render={({field: {onChange, value}}) => (
                  <TextInput
                    mode="outlined"
                    label="Bank name"
                    left={<TextInput.Icon icon="bank" />}
                    disabled={!isFormEditable}
                    returnKeyType="next"
                    value={value}
                    style={{marginTop: 10}}
                    onChangeText={text => onChange(text)}
                  />
                )}
                name="bankName"
              />
              {errors.bankName && (
                <HelperText style={{color: 'red'}}>
                  {errors.bankName.message}
                </HelperText>
              )}
              <Controller
                control={control}
                rules={{
                  required: 'Bank account no is required',
                  minLength: {
                    value: 8,
                    message: 'Account no should contain minimum 8 digits',
                  },
                }}
                render={({field: {onChange, value}}) => (
                  <TextInput
                    mode="outlined"
                    label="Bank account no."
                    left={<TextInput.Icon icon="numeric" />}
                    keyboardType="number-pad"
                    disabled={!isFormEditable}
                    returnKeyType="next"
                    value={value}
                    style={{marginTop: 10}}
                    onChangeText={text => onChange(text)}
                  />
                )}
                name="bankAccountNo"
              />
              {errors.bankAccountNo && (
                <HelperText style={{color: 'red'}}>
                  {errors.bankAccountNo.message}
                </HelperText>
              )}
              <Controller
                control={control}
                rules={{
                  required: 'IFSC code is required',
                  minLength: {
                    value: 5,
                    message: 'IFSC code should contain at least 5 characters',
                  },
                }}
                render={({field: {onChange, value}}) => (
                  <TextInput
                    mode="outlined"
                    label="IFSC code"
                    left={<TextInput.Icon icon="alphabetical-variant" />}
                    disabled={!isFormEditable}
                    returnKeyType="next"
                    value={value}
                    style={{marginTop: 10}}
                    onChangeText={text => onChange(text)}
                  />
                )}
                name="ifscCode"
              />
              {errors.ifscCode && (
                <HelperText style={{color: 'red'}}>
                  {errors.ifscCode.message}
                </HelperText>
              )}
              <Controller
                control={control}
                rules={{
                  required: 'Aadhar no is required',
                  minLength: {
                    value: 12,
                    message: 'Aadhar no should not be less than 12 digits',
                  },
                  maxLength: {
                    value: 12,
                    message: 'Aadhar should not more than 12 digits',
                  },
                }}
                render={({field: {onChange, value}}) => (
                  <TextInput
                    mode="outlined"
                    label="Aadhar no"
                    keyboardType="numeric"
                    left={<TextInput.Icon icon="numeric" />}
                    disabled={!isFormEditable}
                    returnKeyType="next"
                    value={value}
                    style={{marginTop: 10}}
                    onChangeText={text => onChange(text)}
                  />
                )}
                name="aadharNo"
              />
              {errors.aadharNo && (
                <HelperText style={{color: 'red'}}>
                  {errors.aadharNo.message}
                </HelperText>
              )}
              <Controller
                control={control}
                rules={{}}
                render={({field: {onChange, value}}) => (
                  <TextInput
                    mode="outlined"
                    label="UAN no"
                    left={<TextInput.Icon icon="alphabetical-variant" />}
                    disabled={!isFormEditable}
                    returnKeyType="next"
                    value={value}
                    style={{marginTop: 10}}
                    onChangeText={text => onChange(text)}
                  />
                )}
                name="uanNo"
              />
              {errors.uanNo && (
                <HelperText style={{color: 'red'}}>
                  {errors.uanNo.message}
                </HelperText>
              )}
            </View>
          )}

          {/* Work experience */}
          {formKey === 'work_experience' && (
            <View>
              <View>
                <Button
                  mode="contained"
                  icon="plus"
                  compact
                  onPress={onAddExperienceButton}
                  style={styles.actionButton}>
                  Add experience
                </Button>

                <WorkExperienceForm
                  visible={workExperienceFormVisible}
                  dismiss={() => setWorkExperienceFormVisible(false)}
                />
                {workExperience ? (
                  Object.entries(workExperience).map(([key, work]) => {
                    return <WorkExperienceCard work={work} />;
                  })
                ) : (
                  <View>
                    <Text>It looks empty here !</Text>
                    <Text>
                      Add your work experience to increase your hiring chances
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>

        {/* Form navigation buttons */}
        <View style={styles.formNavigationButton}>
          {isFormEditable && formKey !== 'basic_details' && (
            <Button
              mode="contained"
              compact={true}
              icon={'arrow-left'}
              style={styles.actionButton}
              onPress={goBackInForm}>
              Go back
            </Button>
          )}
          {isFormEditable && formKey !== 'work_experience' && (
            <Button
              mode="contained"
              compact={true}
              icon={'arrow-right'}
              style={styles.actionButton}
              onPress={handleSubmit(onSavingForm, onInvalidForm)}>
              Go next
            </Button>
          )}
          {formKey === 'work_experience' && (
            <Button
              mode="contained"
              compact={true}
              icon={'content-save'}
              style={styles.actionButton}
              onPress={handleSubmit(onSavingForm, onInvalidForm)}>
              Save
            </Button>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: padding.smallLg,
  },
  imageContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  segmentButton: {
    marginBottom: margin.large,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  card: {
    margin: 16,
    elevation: 4,
  },

  formNavigationButton: {
    marginTop: margin.mediumLg,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    elevation: 4,
    alignSelf: 'flex-end',
    borderRadius: 4,
  },
});
