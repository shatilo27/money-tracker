import React from 'react';
import {SafeAreaView, StatusBar, View, StyleSheet} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';

const About = ({navigation}) => (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar barStyle="light-content"/>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()}/>
        <Appbar.Content title="О приложении" subtitle="monotrack"/>
      </Appbar.Header>
      <SafeAreaView style={{flex: 1}}>
        <Background>
          <View style={{flex: 1, alignItems: 'center', padding: 30}}>
            <Header>monotrack</Header>
            <Text style={styles.text}>monotrack - приложение для тех, кто хочет держать свои финансы
              под контролем. С его помощью можно следить за тратами, формировать
              бюджет и всегда быть в курсе того, сколько у вас имеется
              сбережений.</Text>
          </View>
        </Background>
      </SafeAreaView>
    </View>
);

const styles = StyleSheet.create({
  subtitle: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20
  }
});

export default About;
