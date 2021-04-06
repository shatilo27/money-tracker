import React, {Component} from 'react';
import {SafeAreaView, StatusBar, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';
import {connect} from 'react-redux';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';

class Start extends Component {
  constructor(props) {
    super(props);
    this.handleStart = this.handleStart.bind(this);
  }

  render() {
    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <StatusBar barStyle="dark-content"/>
          <SafeAreaView style={{flex: 1}}>
            <Background>
              <Header>monotrack</Header>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <MaterialCommunityIcons name="piggy-bank" color="#000" size={140}/>
              </View>
              <View
                  style={{flex: 1, justifyContent: 'flex-end', width: '100%', padding: 30}}>
                <Button mode="contained" uppercase={true} style={styles.button}
                        labelStyle={styles.buttonText} onPress={this.handleStart}>
                  Начать работу
                </Button>
                <Button mode="outlined" uppercase={true}
                        style={styles.buttonBottom}
                        labelStyle={styles.buttonText}
                        onPress={() => this.props.navigation.navigate('About')}>
                  О приложении
                </Button>
              </View>
            </Background>
          </SafeAreaView>
        </View>
    );
  }

  handleStart() {
    this.props.userLogin(true);
    this.props.navigation.navigate('Home');
  }
}

const styles = StyleSheet.create({
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

const mapDispatchToProps = dispatch => ({
  userLogin: status => dispatch({type: 'USER_LOGIN', status}),
});

export default connect(null, mapDispatchToProps)(Start);
