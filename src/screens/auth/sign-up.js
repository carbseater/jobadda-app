import React, {memo, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';
import {theme} from '../../core/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../../core/utils';
import {nav} from 'constants/navigation';
import {useAuth} from 'AuthContext';
import {Controller, useForm} from 'react-hook-form';
import {HelperText, Menu, TextInput, TouchableRipple} from 'react-native-paper';
import {signUp} from 'firebase-database/write-operations';
import Dropdown from 'components/Dropdown';
import {cityOptions} from 'constants/dropdown-options';

export const SignUpScreen = memo(({navigation}) => {
  const {signUpWithEmailAndPassword} = useAuth();
  const [cityDropdownVisible, setCityDropdownVisible] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm();
  const _onSignUpPressed = async formData => {
    const {confirmPassword, password, email, firstName, lastName, city} =
      formData;
    if (confirmPassword != password) {
      setError('confirmPassword', {message: "Password didn't matched"});
      return;
    }
    try {
      const {user} = await signUpWithEmailAndPassword(email, password);
      await AsyncStorage.setItem(
        '@userProfile',
        JSON.stringify({firstName, lastName, email, city}),
      );
      console.log('User created', user);
      await signUp({userId: user.uid, ...formData});
    } catch (err) {
      console.log(err);
    }
  };

  // console.log('Errors', errors);
  return (
    <Background>
      <BackButton goBack={() => navigation.navigate(nav.LOGIN)} />

      {/* <Logo /> */}

      <Header>Create Account</Header>

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
            disabled={false}
            onChange={onChange}
            value={value}
          />
        )}
        name="city"
      />
      {errors.lastName && (
        <HelperText style={{color: 'red'}}>
          {errors.lastName.message}
        </HelperText>
      )}
      <Controller
        control={control}
        rules={{
          required: 'Email is required',
          // validate: {
          //   customValidation: value => emailValidator(value),
          // },
        }}
        render={({field: {onChange, value}}) => (
          <TextInput
            mode="outlined"
            label="Email"
            returnKeyType="next"
            value={value}
            style={{marginTop: 10}}
            onChangeText={text => onChange(text)}
          />
        )}
        name="email"
      />
      {errors.email && (
        <HelperText style={{color: 'red'}}>{errors.email.message}</HelperText>
      )}

      <Controller
        control={control}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password should contain 8 characters',
          },
        }}
        render={({field: {onChange, value}}) => (
          <TextInput
            mode="outlined"
            label="Password"
            returnKeyType="next"
            value={value}
            style={{marginTop: 10}}
            onChangeText={text => onChange(text)}
            secureTextEntry
          />
        )}
        name="password"
      />
      {errors.password && (
        <HelperText style={{color: 'red'}}>
          {errors.password.message}
        </HelperText>
      )}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}}) => (
          <TextInput
            mode="outlined"
            label="Confirm password"
            returnKeyType="next"
            value={value}
            style={{marginTop: 10}}
            onChangeText={text => onChange(text)}
            secureTextEntry
          />
        )}
        name="confirmPassword"
      />
      {errors.confirmPassword && (
        <HelperText style={{color: 'red'}}>
          {errors.confirmPassword.message}
        </HelperText>
      )}
      <Button
        mode="contained"
        onPress={handleSubmit(_onSignUpPressed)}
        style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate(nav.LOGIN)}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
});

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'center',
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
