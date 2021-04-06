import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Appbar, Title, Card, Paragraph, Text, Button} from 'react-native-paper';
import Background from '../components/Background';
import Carousel from 'react-native-snap-carousel';
import {connect} from 'react-redux';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';

const windowWidth = Dimensions.get('window').width;

class Wallets extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const fullname = this.props.user.data.firstname + ' ' +
        this.props.user.data.lastname;

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <StatusBar barStyle="light-content"/>
          <Appbar.Header>
            <Appbar.Content title="Мои кошельки"
                            titleStyle={styles.appbarTitle}/>
          </Appbar.Header>
          <SafeAreaView style={{flex: 1}}>
            <Background>
              <ScrollView style={{flex: 1, width: '100%'}}>
                <View style={{padding: 30}}>
                  <Title style={styles.welcomeTitle}>Добро пожаловать</Title>
                  {fullname.trim().length ? (
                      <Title
                          style={styles.welcomeSubTitle}>{fullname}</Title>
                  ) : null}
                  <Button mode="contained" icon="wallet-plus"
                          style={styles.button}
                          labelStyle={styles.buttonText}
                          contentStyle={styles.buttonContent}
                          onPress={() => this.props.navigation.navigate('AddWallet')}
                  >
                    Добавить кошелек
                  </Button>
                </View>
                {this.props.user.wallets.length ? (
                    <Carousel
                        data={this.props.user.wallets}
                        renderItem={({item, index}) => (
                            <Card style={{
                              backgroundColor: item.options.color || '#f5f5f5',
                              marginBottom: 20,
                              height: 180,
                            }}
                                  onPress={()=> this.props.navigation.navigate('Wallet', {id: item.id})}
                                  key={index}>
                              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Card.Content>
                                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <Title style={styles.cardTitle}>{item.options.title}</Title>
                                    <Text style={styles.cardBalance}>{item.balance} {item.options.currency}</Text>
                                    <Text style={styles.cardSubtitle}>Баланс</Text>
                                  </View>
                                </Card.Content>
                              </View>
                            </Card>
                        )}
                        sliderWidth={windowWidth}
                        itemWidth={300}
                    />
                ) : (
                    <View style={styles.notFoundWrapper}>
                      <MaterialCommunityIcons name="wallet" color="#777" size={70}/>
                      <Text style={styles.notFoundText}>На данный момент у вас нет кошельков</Text>
                    </View>
                )}
              </ScrollView>
            </Background>
          </SafeAreaView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  appbarTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  welcomeTitle: {
    fontWeight: '800',
    fontSize: 32,
    lineHeight: 32,
    textAlign: 'center',
    marginBottom: 20,
  },
  welcomeSubTitle: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 36,
    textAlign: 'center',
    marginTop: -20,
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 3
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    position: 'absolute',
    height: '60%',
    bottom: -30,
    left: 0,
    right: 0,
  },
  modalLine: {
    width: 100,
    height: 4,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#000',
    alignSelf: 'center',
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    marginBottom: 15,
  },
  buttonText: {
    fontWeight: '800',
  },
  buttonContent: {
    marginTop: 7,
  },
  notFoundWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  notFoundText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '700',
    color: '#777',
    maxWidth: 210,
    textTransform: 'uppercase',
    letterSpacing: 2
  },
  cardTitle: {
    color: '#fff',
  },
  cardBalance: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 32,
    marginBottom: 5
  },
  cardSubtitle: {
    color: '#fff',
    textTransform: 'uppercase'
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  saveUserData: data => dispatch({type: 'USER_DATA', data}),
  userLogout: () => dispatch({type: 'USER_LOGOUT'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallets);
