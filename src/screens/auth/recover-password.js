import React, {memo, useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import {emailValidator} from '../../core/utils';
import Background from '../../components/Background';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import {theme} from '../../core/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Navigation} from '../types';
import {nav} from 'constants/navigation';
import {useAuth} from 'AuthContext';
import {Button, HelperText} from 'react-native-paper';
import InputField from 'components/InputField';

export const ForgotPasswordScreen = memo(({navigation}) => {
  const [email, setEmail] = useState({value: '', error: '', loading: false});
  const {recoverPassword} = useAuth();
  const _onSendPressed = async () => {
    setEmail({...email, loading: true});
    const emailError = emailValidator(email.value.trim());

    if (emailError) {
      setEmail({...email, error: emailError});
      return;
    }
    try {
      await recoverPassword(email.value.trim());
      ToastAndroid.show('Reset link sent successfully', ToastAndroid.SHORT);
      navigation.goBack();
    } catch (err) {
      setEmail({...email, error: 'Something went wrong'});
    }
    setEmail({...email, loading: false});
  };

  return (
    <View style={styles.container}>
      <BackButton goBack={() => navigation.navigate('LoginScreen')} />

      {/* <Logo /> */}

      <Header>Restore Password</Header>

      <InputField
        label={'Email address'}
        onChangeText={text => setEmail({value: text, error: ''})}
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
      {email.error && (
        <HelperText style={{textAlign: 'left'}} type="error">
          {email.error}
        </HelperText>
      )}

      <Button
        disabled={email.loading}
        loading={email.loading}
        mode="contained"
        onPress={_onSendPressed}
        style={styles.button}>
        Send Reset link
      </Button>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',

    flex: 1,
    paddingHorizontal: 25,
  },
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
});
