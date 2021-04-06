import React from 'react';
import Settings from './Settings';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Statistic from './Statistic';
import Wallets from './Wallets';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

const Home = (props) => {
  return (
      <Tab.Navigator shifting={true} initialRouteName="Wallets">
        <Tab.Screen
            name="Wallets"
            component={Wallets}
            options={{
              tabBarLabel: 'Кошельки',
              tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons name="wallet" color={color}
                                          size={26}/>
              ),
              tabBarColor: '#7178f2',
            }}
        />
        <Tab.Screen
            name="Statistic"
            component={Statistic}
            options={{
              tabBarLabel: 'Статистика',
              tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons name="chart-timeline-variant"
                                          color={color} size={26}/>
              ),
              tabBarColor: '#fa5255',
            }}
        />
        <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarLabel: 'Настройки',
              tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons name="account" color={color}
                                          size={26}/>
              ),
              tabBarColor: '#31c672',
            }}
        />
      </Tab.Navigator>
  );
};

export default Home;
