import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {nav} from 'constants/navigation';
import HomePage from 'screens/app/home-page';
import {SignUpScreen} from 'screens/auth/sign-up';
import {UserProfileScreen} from 'screens/app/profile-page/user-profile';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export const BottomTabStack = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name={nav.JOB_LISTING} component={HomePage} />
      <BottomTab.Screen name="My work" component={SignUpScreen} />
      <BottomTab.Screen
        options={{headerShown: false}}
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
