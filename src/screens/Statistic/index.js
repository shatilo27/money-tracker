import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
} from 'react-native';
import {Appbar, Divider, Menu, Title} from 'react-native-paper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Month from './Month';

const Tab = createMaterialTopTabNavigator();

const Statistic = ({navigation}) => {
  return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar barStyle="light-content"/>
        <Appbar.Header>
          <Appbar.Content title="Статистика" titleStyle={styles.appbarTitle}/>
        </Appbar.Header>
        <SafeAreaView style={{flex: 1}}>
          <Tab.Navigator shifting={true} tabBarOptions={{
            style: {
              backgroundColor: '#000',
            },
            labelStyle: {
              color: '#fff',
            },
            indicatorStyle: {
              backgroundColor: '#fff',
            },
          }}>
            <Tab.Screen name="Текущий месяц" component={Month} initialParams={{previousMonth: false}}/>
            <Tab.Screen name="Предыдущий месяц" component={Month} initialParams={{previousMonth: true}}/>
          </Tab.Navigator>
        </SafeAreaView>
      </View>
  );
};

const styles = StyleSheet.create({
  appbarTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  button: {
    width: '100%',
    marginBottom: 15,
    height: 50,
  },
  buttonBottom: {
    width: '100%',
    height: 50,
  },
  buttonText: {
    fontWeight: '800',
    marginTop: 15,
  },
});

export default Statistic;
