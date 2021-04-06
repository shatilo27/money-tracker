import * as React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import Home from '../screens/Home';
import About from '../screens/About';
import Settings from '../screens/Settings';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const BottomTabs = () => {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Settings" component={Settings}/>
      </Tab.Navigator>
  );
};

export default BottomTabs;
