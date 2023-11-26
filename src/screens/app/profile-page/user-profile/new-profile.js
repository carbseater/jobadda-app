import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {
  Avatar,
  Text,
  Surface,
  Divider,
  useTheme,
  Button,
} from 'react-native-paper';
import {useUserData} from 'UserContext';
import {padding} from 'styleConfig/padding';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {margin} from 'styleConfig/margin';
import {useAuth} from 'AuthContext';
import {useNavigation} from '@react-navigation/native';
import {nav} from 'constants/navigation';
import {
  accountType as accountTypeOptions,
  genderOptions,
  maritialOptions,
  stateOptions,
} from 'constants/dropdown-options';

export function ProfileData() {
  const {
    userData: {
      firstName,
      lastName,
      email,
      gender,
      state,
      district,
      maritialStatus,
      dateOfBirth,
      contactNo,
      address,
      insuranceNo,
      fatherName,
      bankName,
      accountNumber,
      ifscCode,
      accountType,
      aadharNo,
      uanNO,
      pfNo,
    },
  } = useUserData();
  const {logout} = useAuth();
  const avatarLabel = (firstName[0] || '') + (lastName[0] || '');

  const basicDetail = [
    {
      label: 'First Name',
      value: firstName,
      id: 'firstName',
      type: 'text',
      minLength: 3,
      maxLength: 50,
    },
    {
      label: 'Last Name',
      value: lastName,
      id: 'lastName',
      type: 'text',
      minLength: 3,
      maxLength: 50,
    },
    {
      label: 'Gender',
      value: gender,
      id: 'gender',
      type: 'radio',
      options: genderOptions,
    },
    {
      label: 'Maritial status',
      value: maritialStatus,
      id: 'maritialStatus',
      type: 'dropdown',
      options: maritialOptions,
    },
    {
      label: 'Date of birth',
      value: dateOfBirth,
      id: 'dateOfBirth',
      type: 'datePicker',
    },
    {
      label: 'Email',
      value: email,
      id: 'email',
      type: 'text',
      disabled: true,
    },
    {
      label: 'Mobile no',
      value: contactNo,
      id: 'contactNo',
      type: 'text',
      keyboardType: 'numeric',
      minLength: 10,
      maxLength: 10,
      regex: /^\d{10}$/,
    },
    // {
    //   label: 'State',
    //   value: state,
    //   id: 'state',
    //   type: 'dropdown',
    //   options: stateOptions,
    // },
    // {
    //   label: 'District',
    //   value: district,
    //   id: 'district',
    //   type: 'dropdown',
    //   options: districtOptions,
    // },
    {
      label: 'Address',
      value: address,
      id: 'address',
      type: 'text',
      minLength: 5,
      maxLength: 150,
    },
  ];
  const insuranceDetail = [
    {
      label: 'Insurance No',
      value: insuranceNo,
      type: 'text',
      keyboardType: 'numeric',
      minLength: 10,
      maxLength: 10,
      id: 'insuranceNo',
      regex: /^\d{10}$/,
    },
    {
      label: 'Father name',
      value: fatherName,
      type: 'text',
      id: 'fatherName',
      minLength: 3,
      maxLength: 50,
    },
    {
      label: 'Bank name',
      value: bankName,
      type: 'text',
      id: 'bankName',
      minLength: 5,
      maxLength: 50,
    },
    {
      label: 'Account no',
      value: accountNumber,
      type: 'text',
      keyboardType: 'numeric',
      minLength: 9,
      maxLength: 18,
      id: 'accountNumber',
      regex: /^[0-9]+$/,
    },
    {
      label: 'IFSC code',
      value: ifscCode,
      type: 'text',
      id: 'ifscCode',
      minLength: 11,
      maxLength: 11,
      regex: /^[A-Z]{4}0[A-Z0-9]{6}$/,
    },
    {
      label: 'Account type',
      value: accountType,
      type: 'dropdown',
      options: accountTypeOptions,
      id: 'accountType',
    },
    {
      label: 'Aadhar no',
      value: aadharNo,
      type: 'text',
      keyboardType: 'numeric',
      minLength: 12,
      maxLength: 12,
      id: 'aadharNo',
      regex: /^\d{12}$/,
    },
  ];

  const providentDetail = [
    {
      label: 'UAN no',
      value: uanNO,
      id: 'uanNO',
      type: 'text',
      keyboardType: 'numeric',
      minLength: 12,
      maxLength: 12,
      regex: /^\d{12}$/,
    },
    {
      label: 'PF no',
      value: pfNo,
      id: 'pfNo',
      type: 'text',
      keyboardType: 'numeric',
      minLength: 10,
      maxLength: 10,
      regex: /^\d{10}$/,
    },
  ];
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        style={styles.logout}
        onPress={logout}
        mode="contained-tonal"
        icon={'logout'}>
        Logout
      </Button>

      <View style={styles.avatar}>
        <Avatar.Text size={70} label={avatarLabel.toUpperCase()} />
        <Text style={styles.fullName}>{firstName + ' ' + lastName}</Text>
        <Text>{email}</Text>
      </View>
      <ProfileCard
        cardName={'Basic detail'}
        fields={basicDetail}
        pageName={'Basic details'}
      />
      <ProfileCard
        cardName="Insurance detail"
        fields={insuranceDetail}
        pageName="Insurance detail"
      />
      <ProfileCard
        cardName="PF detail"
        fields={providentDetail}
        pageName="PF detail"
      />
    </ScrollView>
  );
}

export const ProfileCard = ({cardName, fields, pageName}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  return (
    <Surface mode="flat" style={styles.cardBody}>
      <View style={styles.row}>
        <Text variant={'bold'} style={{color: 'black', marginBottom: 5}}>
          {cardName}
        </Text>
        <MaterialIcon
          onPress={() =>
            navigation.navigate(nav.EDIT_PROFILE, {fields, pageName})
          }
          size={20}
          color={colors.primary}
          name="edit"
        />
      </View>

      {fields.map(({label, value}, index) => (
        <>
          {index != 0 && <Divider />}
          <View style={styles.row}>
            <Text>{label}</Text>
            <Text>{value}</Text>
          </View>
        </>
      ))}
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: padding.smallMd,
  },
  avatar: {
    minHeight: 50,
    alignItems: 'center',
    padding: padding.large,
  },
  cardBody: {
    gap: 5,
    padding: padding.small,
    borderRadius: 5,
    marginTop: margin.large,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logout: {alignSelf: 'flex-end', borderRadius: 5},
  fullName: {fontSize: 25, fontWeight: 'bold'},
});
