import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Appbar,
  Button, Dialog,
  Menu, Paragraph, Portal, Text, Title,
} from 'react-native-paper';
import Background from '../../components/Background';
import {connect} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Income from './Income';
import Expenses from './Expenses';

const Tab = createMaterialTopTabNavigator();

class Wallet extends Component {
  constructor(props) {
    super(props);
    const walletId = this.props.route.params.id;
    this.state = {
      wallet: this.getWallet(walletId),
      openMenu: false,
      deleteModal: false,
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  render() {
    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <StatusBar barStyle="light-content"/>
          <Appbar.Header
              style={{backgroundColor: this.state.wallet.options.color}}>
            <Appbar.BackAction
                onPress={() => this.props.navigation.goBack()}
                color="#fff"
            />
            <Appbar.Content
                title={this.state.wallet.options.title}
                titleStyle={styles.appbarTitle}
                color="#fff"
            />
            <Menu
                visible={this.state.openMenu}
                onDismiss={() => this.setState({openMenu: false})}
                anchor={<Appbar.Action
                    icon="dots-horizontal"
                    color="white"
                    onPress={() => this.setState({openMenu: true})}
                />}>
              <Menu.Item
                  title="Редактировать"
                  icon="pencil"
                  onPress={() => {
                    this.setState({openMenu: false});
                    this.props.navigation.navigate('EditWallet',
                        {id: this.state.wallet.id});
                  }}
              />
              <Menu.Item
                  title="Удалить"
                  icon="delete"
                  onPress={() => this.setState(
                      {deleteModal: true, openMenu: false})}
              />
            </Menu>
          </Appbar.Header>
          <SafeAreaView style={{flex: 1}}>
            <Background>
              <View style={{flex: 1, width: '100%'}}>
                <View style={Object.assign({}, styles.balanceWrapper, {
                  backgroundColor: this.state.wallet.options.color,
                })}>
                  <Title style={styles.balanceTitle}>{this.state.wallet.balance} {this.state.wallet.options.currency}</Title>
                  <Text style={styles.balanceSubtitle}>Баланс</Text>
                </View>
                <Tab.Navigator shifting={true} tabBarOptions={{
                  style: {
                    backgroundColor: this.state.wallet.options.color,
                  },
                  labelStyle: {
                    color: '#fff',
                  },
                  indicatorStyle: {
                    backgroundColor: '#fff',
                  },
                }}>
                  <Tab.Screen name="Доходы" component={Income}
                              initialParams={{walletId: this.state.wallet.id}}/>
                  <Tab.Screen name="Расходы" component={Expenses}
                              initialParams={{walletId: this.state.wallet.id}}/>
                </Tab.Navigator>
                <Portal>
                  <Dialog visible={this.state.deleteModal}
                          onDismiss={() => this.setState({deleteModal: false})}>
                    <Dialog.Title>Удаление кошелька</Dialog.Title>
                    <Dialog.Content>
                      <Paragraph>Вы действительно хотите удалить данный
                        кошелёк?</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                      <Button onPress={this.handleDelete}>Да</Button>
                      <Button onPress={() => this.setState(
                          {deleteModal: false})}>Нет</Button>
                    </Dialog.Actions>
                  </Dialog>
                </Portal>
              </View>
            </Background>
          </SafeAreaView>
        </View>
    );
  }

  getWallet(id) {
    const wallets = this.props.user.wallets;
    return wallets.find(wallet => wallet.id === id);
  }

  handleDelete() {
    const walletId = this.props.route.params.id;
    this.props.removeWallet(walletId);
    this.setState({
      deleteModal: false,
    });
    this.props.navigation.navigate('Home');
  }
}

const styles = StyleSheet.create({
  appbarTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  balanceWrapper: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900'
  },
  balanceSubtitle: {
    color: '#fff',
  },
  saveButton: {
    width: '100%',
    height: 50,
  },
  buttonText: {
    fontWeight: '800',
  },
  buttonContent: {
    marginTop: 7,
  },
  input: {
    marginBottom: 15,
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  removeWallet: id => dispatch({type: 'REMOVE_WALLET', id: id}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
