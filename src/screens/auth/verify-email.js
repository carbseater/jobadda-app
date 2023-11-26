import {
  Linking,
  NativeModules,
  Pressable,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Button, HelperText, Text, useTheme} from 'react-native-paper';
import EmailSvg from 'assets/email.svg';
import {useAuth} from 'AuthContext';
import BackButton from 'components/BackButton';
import {lightColors} from 'core/theme';
import {padding} from 'styleConfig/padding';
import {margin} from 'styleConfig/margin';
export const VerifyEmail = () => {
  const {colors} = useTheme();
  const {currentUser, logout, sendEmailVerification} = useAuth();
  const handleResend = async () => {
    try {
      await sendEmailVerification();
      await logout();
      ToastAndroid.show(
        'Verification link sent succesfully, please verify it',
        ToastAndroid.SHORT,
      );
    } catch (err) {
      ToastAndroid.show(
        'Failed to send verification link, try again later',
        ToastAndroid.SHORT,
      );
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

      <BackButton onPress={logout} />
      <EmailSvg height={200} width={200} />
      <Text style={styles.message} variant="bodyLarge">
        An email link has been sent to {currentUser.email}, please verify it.
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: margin.small,
        }}>
        <Text>Didn't receive link? </Text>
        <TouchableOpacity onPress={handleResend}>
          <Text style={{color: lightColors.primary, fontWeight: '700'}}>
            {' '}
            Resend
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: padding.smallLg,
  },
  message: {
    marginVertical: 20,
    textAlign: 'center',
  },
  resend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
