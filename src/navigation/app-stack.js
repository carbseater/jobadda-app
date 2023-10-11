import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {nav} from 'constants/navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AppliedJobList} from 'screens/app/my-work/AppliedList';
import {JobListingPage} from 'screens/app/listing-page/listing-page';
import {IconButton, Text, useTheme} from 'react-native-paper';
import {useAuth} from 'AuthContext';
import {View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {JobDetail} from 'screens/app/job-details/job-detail';
import {scale} from 'react-native-size-matters';
import {ProfileData} from 'screens/app/profile-page/user-profile/new-profile';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import WorkExperience from 'screens/app/profile-page/work-experience/work-experience';
import {JobInvites} from 'screens/app/my-work/JobInvites';
import {EditProfile} from 'screens/app/profile-page/user-profile/edit-profile';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();

const TopTabStack = () => {
  const {colors} = useTheme();
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'grey',
      }}>
      <TopTab.Screen name={nav.PROFILE} component={ProfileData} />
      <TopTab.Screen name={nav.WORK_EXP} component={WorkExperience} />
    </TopTab.Navigator>
  );
};
export const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={TopTabStack} name={'sskd'} />
      <Stack.Screen component={EditProfile} name={nav.EDIT_PROFILE} />
    </Stack.Navigator>
  );
};

export const WorkStack = () => {
  const {colors} = useTheme();
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'grey',
      }}>
      <TopTab.Screen name={nav.APPLIED_JOB} component={AppliedJobList} />
      <TopTab.Screen name={nav.JOB_INVITE} component={JobInvites} />
    </TopTab.Navigator>
  );
};
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
            backgroundColor: 'white',
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
        component={WorkStack}
        options={{
          tabBarIcon: props => (
            <View style={{alignItems: 'center'}}>
              <Icon name={'work-outline'} size={25} color={props.color} />
              <Text style={{color: props.color}}>Work</Text>
            </View>
          ),
          headerShown: false,
          unmountOnBlur: true,
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
        component={ProfileStack}
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
