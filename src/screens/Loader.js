import React, {Component} from 'react';
import {SafeAreaView, StatusBar, View, StyleSheet} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';
import {connect} from 'react-redux';

class Loader extends Component {
  constructor(props) {
    super(props);
    setTimeout(() => {
      if (this.props.user.isLoggedIn) {
        this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('Start');
      }
    }, 300);
  }

  render() {
    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <StatusBar barStyle="dark-content"/>
          <SafeAreaView style={{flex: 1}}>
            <Background>
              <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Header>monotrack</Header>
                <ActivityIndicator
                    animating={true}
                    color="#000"
                    size="large"
                    style={{marginTop: 20}}
                />
              </View>
            </Background>
          </SafeAreaView>
        </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Loader);
