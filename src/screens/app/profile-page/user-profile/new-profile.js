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

export function ProfileData() {
  const {
    userData: {firstName, lastName, email},
  } = useUserData();
  const {logout} = useAuth();
  const avatarLabel = (firstName[0] || '') + (lastName[0] || '');
  const basicDetail = [
    {
      label: 'First Name',
      value: 'Abhinav',
      id: 'firstName',
      type: 'text',
    },
    {
      label: 'Last Name',
      value: 'Sahai',
      id: 'lastName',
      type: 'text',
    },
    {
      label: 'Gender',
      value: 'Male',
      id: 'gender',
      type: 'radio',
    },
    {
      label: 'Date of birth',
      value: '27 Oct 2001',
      id: 'dateOfBirth',
      type: 'date',
    },
    {
      label: 'Email',
      value: 'abhi@gmail.com',
      id: 'email',
      type: 'text',
    },
    {
      label: 'Mobile no',
      value: '+918448774634',
      id: 'contactNo',
      type: 'text',
    },
    {
      label: 'Address',
      value: 'Noida, Uttar pradesh',
      id: 'address',
      type: 'text',
    },
  ];
  const insuranceDetail = [
    {label: 'Insurance No', value: '6545676789'},
    {label: 'Father name', value: 'Dilip kumar singh'},
    {label: 'Account no', value: '3923423043'},
    {label: 'IFSC code', value: 'SBIN00520'},
    {label: 'Account type', value: 'Savings'},
    {label: 'Account no', value: '3923423043'},
    {label: 'Aadhar no', value: '254537941481'},
  ];

  const providentDetail = [
    {
      label: 'UAN no',
      value: '3425324234234234',
    },
    {
      label: 'PF no',
      value: '432234234',
    },
  ];
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        style={{alignSelf: 'flex-end', borderRadius: 5}}
        onPress={logout}
        mode="contained-tonal"
        icon={'logout'}>
        Logout
      </Button>

      <View style={styles.avatar}>
        <Avatar.Text size={70} label={avatarLabel.toUpperCase()} />
        <Text style={{fontSize: 25, fontWeight: 'bold'}}>
          {firstName + ' ' + lastName}
        </Text>
        <Text>{email}</Text>
      </View>
      <ProfileCard cardName={'Basic detail'} fields={basicDetail} />
      <ProfileCard cardName="Insurance detail" fields={insuranceDetail} />
      <ProfileCard cardName="PF detail" fields={providentDetail} />
    </ScrollView>
  );
}

export const ProfileCard = ({cardName, fields}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  return (
    <Surface mode="flat" style={styles.cardBody}>
      <View style={styles.row}>
        <Text variant={'bold'} style={{color: 'black', marginBottom: 5}}>
          {cardName}
        </Text>
        <MaterialIcon
          onPress={() => navigation.navigate(nav.EDIT_PROFILE, {fields})}
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
    // borderWidth: 1,
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
    // borderWidth: 1,
  },
});
