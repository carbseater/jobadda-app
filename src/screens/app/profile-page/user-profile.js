import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View, StyleSheet, Image, ScrollView, StatusBar} from 'react-native';
import {
  Text,
  TextInput,
  HelperText,
  Menu,
  TouchableRipple,
  SegmentedButtons,
  RadioButton as Radio,
  useTheme,
  Button,
} from 'react-native-paper';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import your preferred icon library
import {margin} from 'styleConfig/margin';
import {padding} from 'styleConfig/padding';

export const UserProfileScreen = () => {
  const {colors} = useTheme();
  const [isLoading, setIsloading] = useState(true);
  const [userProfile, setUserProfile] = useState({});
  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
    watch,
    reset,
  } = useForm();
  const [cityDropdownVisible, setCityDropdownVisible] = useState(false);
  const [marriedDropdownVisible, setMarriedDropdownVisible] = useState(false);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const currentFormValues = watch();
  const {gender, marriedStatus} = currentFormValues ?? {};
  console.log('CCCC', currentFormValues);
  const getUserProfile = async () => {
    try {
      let userData = await AsyncStorage.getItem('@userProfile');
      userData = JSON.parse(userData);
      reset(userData);
    } catch (err) {
      console.log('Error while fetching user', err);
    }

    setIsloading(false);
  };
  useEffect(() => {
    getUserProfile();
  }, []);
  const cityOptions = {
    noida: 'Noida',
    greater_noida: 'Greater noida',
    bhangel: 'Bhangel',
    ghaziabad: 'Ghaziabad',
  };

  const userProfileForms = [
    {
      value: 'basic_details',
      label: 'Profile',
    },
    {
      value: 'bank_details',
      label: 'Bank details',
    },
    {
      value: 'work_experience',
      label: 'Work',
    },
  ];

  const formELementsMapping = {
    basic_details: [
      'firstName',
      'lastName',
      'city',
      'email',
      'gender',
      'marriedStatus',
      'fatherName',
      'husbandName',
    ],
    bank_details: [
      'bankName',
      'bankAccountNo',
      'ifscCode',
      'aadharNo',
      'uanNo',
    ],
  };

  const [formKey, setFormKey] = useState('basic_details');

  const onSavingForm = formData => {
    if (formKey === 'basic_details') setFormKey('bank_details');
    else if (formKey === 'bank_details') {
      setFormKey('work_experience');
    } else {
      console.log('Saving form', formData);
    }
  };

  const onInvalidForm = error => {
    console.log('Errors', error);
    const firstErrorElement = Object.keys(error)[0];
    Object.entries(formELementsMapping).forEach(([key, value]) => {
      if (value.includes(firstErrorElement)) {
        setFormKey(key);
        return;
      }
    });
  };
  if (isLoading)
    return (
      <View>
        <Text>...Loading</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <SegmentedButtons
        value={formKey}
        onValueChange={setFormKey}
        buttons={userProfileForms}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
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

        {/* Basic details form */}
        {formKey === 'basic_details' && (
          <View>
            {/* Top section with icon */}
            <View style={styles.imageContainer}>
              <Icon name="user-circle" size={100} color="#333" />
            </View>
            <Controller
              control={control}
              rules={{
                required: 'Email is required',
              }}
              render={({field: {onChange, value}}) => (
                <TextInput
                  mode="outlined"
                  label="Email"
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
                <Menu
                  visible={cityDropdownVisible}
                  onDismiss={() => setCityDropdownVisible(false)}
                  contentStyle={
                    {
                      // backgroundColor: colors.primaryContainer,
                    }
                  }
                  anchor={
                    <TouchableRipple
                      disabled={!isFormEditable}
                      onPress={() => setCityDropdownVisible(true)}>
                      <View pointerEvents={'none'}>
                        <TextInput
                          value={cityOptions[value]}
                          mode={'outlined'}
                          label={'City'}
                          disabled={!isFormEditable}
                          pointerEvents={'none'}
                          style={{marginTop: 10}}
                          right={
                            <TextInput.Icon
                              icon={
                                cityDropdownVisible ? 'menu-up' : 'menu-down'
                              }
                            />
                          }
                        />
                      </View>
                    </TouchableRipple>
                  }>
                  {Object.entries(cityOptions)?.map(([key, value]) => {
                    // console.log(key, value);
                    return (
                      <Menu.Item
                        key={key}
                        title={value}
                        onPress={() => {
                          onChange(key);
                          setCityDropdownVisible(false);
                        }}
                      />
                    );
                  })}
                </Menu>
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
                <>
                  <View
                    style={[
                      styles.radioButton,
                      {
                        backgroundColor: !isFormEditable
                          ? colors.background
                          : 'white',
                        borderColor:
                          !isFormEditable && colors.onSurfaceDisabled,
                      },
                    ]}>
                    <Text
                      style={{
                        marginBottom: scale(5),
                        paddingLeft: scale(8),
                        color: !isFormEditable && colors.onSurfaceDisabled,
                      }}>
                      Gender
                    </Text>
                    <Radio.Group
                      onValueChange={newValue => {
                        onChange(newValue);
                      }}
                      value={value}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        {Object.entries({
                          male: 'Male',
                          female: 'Female',
                          others: 'Others',
                        }).map(([key, val]) => {
                          return (
                            <View
                              key={key}
                              style={{
                                flexDirection: 'row',
                                marginHorizontal: scale(5),
                                alignItems: 'center',
                              }}>
                              <Radio
                                value={key}
                                // color={colors.primary}
                                disabled={!isFormEditable}
                              />
                              <Text
                                style={{
                                  textAlign: 'center',
                                  color:
                                    !isFormEditable && colors.onSurfaceDisabled,
                                }}>
                                {val}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    </Radio.Group>
                  </View>
                </>
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
                required: 'Married status is required',
              }}
              render={({field: {onChange, value}}) => (
                <Menu
                  visible={marriedDropdownVisible}
                  onDismiss={() => setMarriedDropdownVisible(false)}
                  contentStyle={
                    {
                      // backgroundColor: colors.primaryContainer,
                    }
                  }
                  anchor={
                    <TouchableRipple
                      disabled={!isFormEditable}
                      onPress={() => setMarriedDropdownVisible(true)}>
                      <View pointerEvents={'none'}>
                        <TextInput
                          value={value}
                          mode={'outlined'}
                          label={'Married status'}
                          disabled={!isFormEditable}
                          pointerEvents={'none'}
                          style={{marginTop: 10}}
                          right={
                            <TextInput.Icon
                              icon={
                                marriedDropdownVisible ? 'menu-up' : 'menu-down'
                              }
                            />
                          }
                        />
                      </View>
                    </TouchableRipple>
                  }>
                  {Object.entries({
                    unmarried: 'Unmarried',
                    married: 'Married',
                  })?.map(([key, value]) => {
                    // console.log(key, value);
                    return (
                      <Menu.Item
                        key={key}
                        title={value}
                        onPress={() => {
                          console.log('Value', value);
                          onChange(value);
                          setMarriedDropdownVisible(false);
                        }}
                      />
                    );
                  })}
                </Menu>
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

        {isFormEditable && (
          <Button
            mode="contained"
            compact={true}
            icon={'content-save'}
            style={{
              marginVertical: margin.smallLg,
              elevation: 4,
              alignSelf: 'flex-end',
              borderRadius: 2,
            }}
            onPress={handleSubmit(onSavingForm, onInvalidForm)}>
            Go next
          </Button>
        )}
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  radioButton: {
    marginTop: margin.mediumXs,
    borderWidth: 0.5,
    padding: padding.small,
    borderRadius: 3,
  },
});
