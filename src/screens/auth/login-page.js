import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginSVG from 'assets/login2.svg';
// import GoogleSVG from '../assets/images/misc/google.svg';
// import FacebookSVG from '../assets/images/misc/facebook.svg';
// import TwitterSVG from '../assets/images/misc/twitter.svg';

import CustomButton from 'components/CustomButton';
import InputField, {FormInput} from 'components/InputField';
import {Button, Divider, HelperText, Text, useTheme} from 'react-native-paper';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {nav} from 'constants/navigation';
import {emailValidator, passwordValidator} from 'core/utils';
import {useAuth} from 'AuthContext';
import {useForm} from 'react-hook-form';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {margin} from 'styleConfig/margin';
import {updateFcmToken} from 'firebase-database/write-operations';

export const LoginScreen = ({navigation}) => {
  const {colors} = useTheme();
  const navigator = useNavigation();
  const {signInWithEmailAndPassword, googleSignIn} = useAuth();
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    formState: {errors},
    control,
  } = useForm();

  const handleLogin = async formData => {
    setLoading(() => true);
    setLoginError(() => '');
    const {email, password} = formData;

    try {
      const {user} = await signInWithEmailAndPassword(email.trim(), password);
      await updateFcmToken(user.uid);
      console.log('Login user', user);
    } catch (err) {
      const message = err.message;
      console.log('errr', err.message);
      setLoginError(() => message);
    }
    setLoading(() => false);
  };
  // console.log(loginData);
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={'dark-content'}
      />
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <LoginSVG
            height={scale(230)}
            width={scale(230)}
            style={{transform: [{rotate: '-5deg'}]}}
          />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>

        {loginError && <HelperText type="error">{loginError}</HelperText>}
        <FormInput
          control={control}
          label={'Email ID'}
          onChangeText={newText => setLoginData({...loginData, email: newText})}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          id="email"
          keyboardType="email-address"
        />

        {errors['email']?.message && (
          <HelperText type="error">{errors['email'].message}</HelperText>
        )}

        <FormInput
          control={control}
          id="password"
          label={'Password'}
          onChangeText={newText =>
            setLoginData({...loginData, password: newText})
          }
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          fieldButtonLabel={'Forgot?'}
          fieldButtonFunction={() => navigator.navigate(nav.RECOVER_PASSWORD)}
        />

        {errors['password']?.message && (
          <HelperText type="error">{errors['password'].message}</HelperText>
        )}
        {/* <CustomButton label={'Login'} onPress={() => {}} /> */}
        <Button
          loading={loading}
          disabled={loading}
          mode="contained"
          style={{marginVertical: margin.smallMd}}
          onPress={handleSubmit(handleLogin)}>
          Login
        </Button>

        {/* <Divider bold style={{marginTop: 15}} /> */}
        <HelperText style={{textAlign: 'center'}}>Or</HelperText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <Button
            disabled={loading}
            onPress={googleSignIn}
            mode="outlined"
            rippleColor={'rgba(255, 0, 0, 0.1)'}
            labelStyle={{color: '#bd0808'}}
            icon={'google'}
            style={{width: '100%', borderColor: '#bd0808'}}
            contentStyle={{color: 'red'}}>
            Login with google
          </Button>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: margin.small,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigator.navigate(nav.SIGN_UP)}>
            <Text style={{color: colors.primary, fontWeight: '700'}}>
              {' '}
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
