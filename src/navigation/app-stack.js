import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {nav} from 'constants/navigation';
import {UserProfileScreen} from 'screens/app/profile-page/user-profile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MyWork} from 'screens/app/my-work/my-work';
import {JobListingPage} from 'screens/app/listing-page/listing-page';
import {IconButton, Text, TouchableRipple} from 'react-native-paper';
import {useAuth} from 'AuthContext';
import {View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {JobDetail} from 'screens/app/job-details/job-detail';
import {scale} from 'react-native-size-matters';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export const JobStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={nav.JOB_LISTING}
        component={JobListingPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={nav.JOB_DETAILS}
        component={JobDetail}
        options={{
          headerRight: () => null,
          headerShown: false,
          title: '',
          headerStyle: {
            backgroundColor: 'white', // Set your desired background color here
          },
        }}
      />
    </Stack.Navigator>
  );
};
export const BottomTabStack = () => {
  const {logout} = useAuth();
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: {
          minHeight: scale(50),
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}>
      <BottomTab.Screen
        name={'jobStack'}
        component={JobStack}
        options={{
          tabBarIcon: props => (
            <View style={{alignItems: 'center'}}>
              <Icon name="manage-search" size={25} color={props.color} />
              <Text style={{color: props.color, fontSize: 12}}>
                Job listing
              </Text>
            </View>
          ),
          headerRight: () => <IconButton icon={'logout'} onPress={logout} />,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="My work"
        component={MyWork}
        options={{
          tabBarIcon: props => (
            <View style={{alignItems: 'center'}}>
              <Icon name={'work-outline'} size={25} color={props.color} />
              <Text style={{color: props.color}}>Work</Text>
            </View>
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: props => (
            <View style={{alignItems: 'center'}}>
              <Icon name="account-circle" size={25} color={props.color} />
              <Text style={{color: props.color}}>Profile</Text>
            </View>
          ),
          unmountOnBlur: true,
        }}
        name="Profile"
        component={UserProfileScreen}
      />
    </BottomTab.Navigator>
  );
};
export const AppStack = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        options={{headerShown: false}}
        name={nav.BOTTOM_TAB}
        component={BottomTabStack}
      />
    </Drawer.Navigator>
  );
};
