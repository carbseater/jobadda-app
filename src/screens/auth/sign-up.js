// import React, {memo, useState} from 'react';
// import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import Background from '../../components/Background';
// import Logo from '../../components/Logo';
// import Header from '../../components/Header';
// import Button from '../../components/Button';
// import BackButton from '../../components/BackButton';
// import {theme} from '../../core/theme';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   emailValidator,
//   passwordValidator,
//   nameValidator,
// } from '../../core/utils';
// import {nav} from 'constants/navigation';
// import {useAuth} from 'AuthContext';
// import {Controller, useForm} from 'react-hook-form';
// import {HelperText, Menu, TextInput, TouchableRipple} from 'react-native-paper';
// import {signUp} from 'firebase-database/write-operations';
// import Dropdown from 'components/Dropdown';
// import {cityOptions} from 'constants/dropdown-options';

// export const SignUpScreen = memo(({navigation}) => {
//   const {signUpWithEmailAndPassword} = useAuth();
//   const [cityDropdownVisible, setCityDropdownVisible] = useState(false);
//   const {
//     control,
//     handleSubmit,
//     formState: {errors},
//     setError,
//   } = useForm();

//   // console.log('Errors', errors);
//   return (
//     <Background>
//       <BackButton goBack={() => navigation.navigate(nav.LOGIN)} />

//       {/* <Logo /> */}

//       <Header>Create Account</Header>

//       <Controller
//         control={control}
//         rules={{
//           required: 'First name is required',
//           minLength: {
//             value: 2,
//             message: 'First name should contain at least 2 characters',
//           },
//         }}
//         render={({field: {onChange, value}}) => (
//           <TextInput
//             mode="outlined"
//             label="First name"
//             returnKeyType="next"
//             value={value}
//             style={{marginTop: 10}}
//             onChangeText={text => onChange(text)}
//           />
//         )}
//         name="firstName"
//       />
//       {errors.firstName && (
//         <HelperText style={{color: 'red'}}>
//           {errors.firstName.message}
//         </HelperText>
//       )}
//       <Controller
//         control={control}
//         rules={{
//           required: 'Last name is required',
//           minLength: {
//             value: 2,
//             message: 'Last name should contain at least 2 characters',
//           },
//         }}
//         render={({field: {onChange, value}}) => (
//           <TextInput
//             mode="outlined"
//             label="Last name"
//             returnKeyType="next"
//             value={value}
//             style={{marginTop: 10}}
//             onChangeText={text => onChange(text)}
//           />
//         )}
//         name="lastName"
//       />
//       {errors.lastName && (
//         <HelperText style={{color: 'red'}}>
//           {errors.lastName.message}
//         </HelperText>
//       )}
//       <Controller
//         control={control}
//         rules={{
//           required: 'City name is required',
//         }}
//         render={({field: {onChange, value}}) => (
//           <Dropdown
//             dropdownOptions={cityOptions}
//             label={'City'}
//             disabled={false}
//             onChange={onChange}
//             value={value}
//           />
//         )}
//         name="city"
//       />
//       {errors.lastName && (
//         <HelperText style={{color: 'red'}}>
//           {errors.lastName.message}
//         </HelperText>
//       )}
//       <Controller
//         control={control}
//         rules={{
//           required: 'Email is required',
//           // validate: {
//           //   customValidation: value => emailValidator(value),
//           // },
//         }}
//         render={({field: {onChange, value}}) => (
//           <TextInput
//             mode="outlined"
//             label="Email"
//             returnKeyType="next"
//             value={value}
//             style={{marginTop: 10}}
//             onChangeText={text => onChange(text)}
//           />
//         )}
//         name="email"
//       />
//       {errors.email && (
//         <HelperText style={{color: 'red'}}>{errors.email.message}</HelperText>
//       )}

//       <Controller
//         control={control}
//         rules={{
//           required: 'Password is required',
//           minLength: {
//             value: 8,
//             message: 'Password should contain 8 characters',
//           },
//         }}
//         render={({field: {onChange, value}}) => (
//           <TextInput
//             mode="outlined"
//             label="Password"
//             returnKeyType="next"
//             value={value}
//             style={{marginTop: 10}}
//             onChangeText={text => onChange(text)}
//             secureTextEntry
//           />
//         )}
//         name="password"
//       />
//       {errors.password && (
//         <HelperText style={{color: 'red'}}>
//           {errors.password.message}
//         </HelperText>
//       )}
//       <Controller
//         control={control}
//         rules={{
//           required: true,
//         }}
//         render={({field: {onChange, value}}) => (
//           <TextInput
//             mode="outlined"
//             label="Confirm password"
//             returnKeyType="next"
//             value={value}
//             style={{marginTop: 10}}
//             onChangeText={text => onChange(text)}
//             secureTextEntry
//           />
//         )}
//         name="confirmPassword"
//       />
//       {errors.confirmPassword && (
//         <HelperText style={{color: 'red'}}>
//           {errors.confirmPassword.message}
//         </HelperText>
//       )}
//       <Button
//         mode="contained"
//         onPress={handleSubmit(_onSignUpPressed)}
//         style={styles.button}>
//         Sign Up
//       </Button>

//       <View style={styles.row}>
//         <Text style={styles.label}>Already have an account? </Text>
//         <TouchableOpacity onPress={() => navigation.navigate(nav.LOGIN)}>
//           <Text style={styles.link}>Login</Text>
//         </TouchableOpacity>
//       </View>
//     </Background>
//   );
// });

// const styles = StyleSheet.create({
//   label: {
//     color: theme.colors.secondary,
//   },
//   button: {
//     marginTop: 24,
//   },
//   row: {
//     flexDirection: 'row',
//     marginTop: 5,
//     justifyContent: 'center',
//   },
//   link: {
//     fontWeight: 'bold',
//     color: theme.colors.primary,
//   },
// });

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import DatePicker from 'react-native-date-picker';

import InputField, {FormInput} from 'components/InputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RegistrationSVG from 'assets/logo3.svg';
// import GoogleSVG from '../assets/images/misc/google.svg';
// import FacebookSVG from '../assets/images/misc/facebook.svg';
// import TwitterSVG from '../assets/images/misc/twitter.svg';
import CustomButton from 'components/CustomButton';
import {scale} from 'react-native-size-matters';
import {Button, HelperText, Text, useTheme} from 'react-native-paper';
import {lightColors} from 'core/theme';
import {useNavigation} from '@react-navigation/native';
import {nav} from 'constants/navigation';
import {useAuth} from 'AuthContext';
import {useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {windowHeight} from 'utils/dimension';
import {emailValidator} from 'core/utils';
import {margin} from 'styleConfig/margin';
import BackButton from 'components/BackButton';
import {validateMobileNo} from 'utils/general-fn';
import {signUp} from 'firebase-database/write-operations';

export const SignUpScreen = ({navigation}) => {
  const {colors} = useTheme();
  const navigator = useNavigation();
  const {signUpWithEmailAndPassword, googleSignIn} = useAuth();
  const [signupError, setSignupError] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    formState: {errors},
    control,
    setError,
  } = useForm();

  const onRegister = async formData => {
    setLoading(true);
    setSignupError('');
    const {confirmPassword, password, email, fullname, contactNo} = formData;
    if (emailValidator(email)) {
      setError('email', {message: emailValidator(email)});
      setLoading(false);
      return;
    }
    if (validateMobileNo(contactNo) === false) {
      setError('contactNo', {message: 'Mobile no is not valid'});
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('password', {
        message: 'Minimum password length should be 6 character',
      });
      setLoading(false);
      return;
    }
    if (confirmPassword != password) {
      setError('confirmPassword', {message: "Password didn't match"});
      setLoading(false);
      return;
    }
    try {
      const user = await signUpWithEmailAndPassword(email, password);
      console.log('User', user);
      await signUp({userId: user.uid, ...formData});
    } catch (err) {
      const message = err?.message || 'Something went wrong';
      setSignupError(message);
    }
    setLoading(false);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <BackButton onPress={() => navigation.goBack()} />
      <StatusBar
        backgroundColor={colors.background}
        barStyle={'dark-content'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
        <View style={{minHeight: windowHeight}}>
          <View style={{alignItems: 'center'}}>
            <RegistrationSVG
              height={scale(200)}
              width={scale(200)}
              style={{transform: [{rotate: '-5deg'}]}}
            />
          </View>

          <Text
            style={{
              fontSize: 28,
              fontWeight: '500',
              color: '#333',
              marginBottom: 10,
            }}>
            Register
          </Text>
          <Text
            style={{
              padding: 0,
              fontSize: 10,
              color: 'grey',
              marginVertical: margin.small,
            }}>
            *Please provide correct details, as this will be used to generate
            your ESIC card
          </Text>
          {signupError && <HelperText type="error">{signupError}</HelperText>}
          <RegistrationForm control={control} errors={errors} />

          <Button
            mode="contained"
            loading={loading}
            disabled={loading}
            onPress={handleSubmit(onRegister)}
            style={{marginVertical: margin.smallMd}}>
            Register
          </Button>
          <HelperText style={{textAlign: 'center'}}>Or</HelperText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Button
              onPress={googleSignIn}
              disabled={loading}
              mode="outlined"
              rippleColor={'rgba(255, 0, 0, 0.1)'}
              labelStyle={{color: '#bd0808'}}
              icon={'google'}
              style={{width: '100%', borderColor: '#bd0808'}}
              contentStyle={{color: 'red'}}>
              Register with google
            </Button>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: margin.small,
            }}>
            <Text>Already registered?</Text>
            <TouchableOpacity onPress={() => navigator.navigate(nav.LOGIN)}>
              <Text style={{color: lightColors.primary, fontWeight: '700'}}>
                {' '}
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const RegistrationForm = ({control, errors}) => {
  return (
    <>
      <FormInput
        id="fullName"
        label={'Full Name'}
        icon={
          <Ionicons
            name="person-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
        }
        control={control}
      />
      {errors['fullName']?.message && (
        <HelperText type="error">{errors['fullName']?.message}</HelperText>
      )}

      <FormInput
        id="email"
        label={'Email ID'}
        icon={
          <MaterialIcons
            name="alternate-email"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
        }
        keyboardType="email-address"
        control={control}
      />
      {errors['email']?.message && (
        <HelperText type="error">{errors['email']?.message}</HelperText>
      )}

      <FormInput
        id="contactNo"
        label={'Mobile No'}
        icon={
          <Ionicons
            name="call-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
        }
        control={control}
      />
      {errors['contactNo']?.message && (
        <HelperText type="error">{errors['contactNo']?.message}</HelperText>
      )}

      <FormInput
        id="password"
        label={'Password'}
        icon={
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
        }
        inputType="password"
        control={control}
      />
      {errors['password']?.message && (
        <HelperText type="error">{errors['password']?.message}</HelperText>
      )}

      <FormInput
        id="confirmPassword"
        label={'Confirm password'}
        icon={
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
        }
        inputType="password"
        control={control}
      />
      {errors['confirmPassword']?.message && (
        <HelperText type="error">
          {errors['confirmPassword']?.message}
        </HelperText>
      )}
    </>
  );
};
