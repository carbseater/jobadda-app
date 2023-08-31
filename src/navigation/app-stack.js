import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {nav} from 'constants/navigation';
import {UserProfileScreen} from 'screens/app/profile-page/user-profile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MyWork} from 'screens/app/my-work/my-work';
import {
  JobListingPage,
  JobListingPageWithPagination,
} from 'screens/app/listing-page/listing-page';
import {IconButton, Text} from 'react-native-paper';
import {useAuth} from 'AuthContext';
import {View} from 'react-native';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export const BottomTabStack = () => {
  const {logout} = useAuth();
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'black',
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}>
      <BottomTab.Screen
        name={nav.JOB_LISTING}
        component={JobListingPage}
        options={{
          tabBarIcon: props => (
            <View style={{alignItems: 'center'}}>
              <Icon
                name="manage-search"
                size={25}
                color={props.focused ? 'white' : 'grey'}
              />
              <Text
                style={{color: props.focused ? 'white' : 'grey', fontSize: 12}}>
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
              <Icon
                name="work"
                size={25}
                color={props.focused ? 'white' : 'grey'}
              />
              <Text style={{color: props.focused ? 'white' : 'grey'}}>
                Work
              </Text>
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
              <Icon
                name="account-circle"
                size={25}
                color={props.focused ? 'white' : 'grey'}
              />
              <Text style={{color: props.focused ? 'white' : 'grey'}}>
                Profile
              </Text>
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
