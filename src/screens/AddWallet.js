import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Appbar, Button, Snackbar, TextInput} from 'react-native-paper';
import Background from '../components/Background';
import {connect} from 'react-redux';
import DropDown from 'react-native-paper-dropdown';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorPalette from '../components/ColorPalette';

class AddWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      color: '#ffbe0b',
      currency: 'UAH',
      showDropDown: false,
      error: false,
    };
    this.handleSave = this.handleSave.bind(this);
  }

  render() {
    const currencies = [
      {label: 'Гривна', value: 'UAH'},
      {label: 'Доллар', value: 'USD'},
      {label: 'Евро', value: 'EUR'},
    ];

    const colors = [
      '#ffbe0b',
      '#fb5607',
      '#ff006e',
      '#8338ec',
      '#3a86ff',
    ];

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <StatusBar barStyle="light-content"/>
          <Appbar.Header>
            <Appbar.BackAction onPress={() => this.props.navigation.goBack()}/>
            <Appbar.Content title="Добавить кошелёк"
                            titleStyle={styles.appbarTitle}/>
          </Appbar.Header>
          <SafeAreaView style={{flex: 1}}>
            <Background>
              <View style={{flex: 1, width: '100%', padding: 30}}>
                <TextInput
                    label="Название"
                    mode="outlined"
                    value={this.state.title}
                    style={styles.input}
                    onChangeText={text => this.setState({title: text})}
                />
                <DropDown
                    label="Валюта"
                    mode="outlined"
                    list={currencies}
                    value={this.state.currency}
                    setValue={(value) => this.setState({currency: value})}
                    visible={this.state.showDropDown}
                    showDropDown={() => this.setState({showDropDown: true})}
                    onDismiss={() => this.setState({showDropDown: false})}
                    inputProps={{
                      right: <TextInput.Icon name={'menu-down'}/>,
                    }}
                    style={styles.input}
                />
                <ColorPalette
                    onChange={color => this.setState({color: color})}
                    value={this.state.color}
                    colors={colors}
                    icon={
                      <MaterialCommunityIcons name={'check'} size={25}
                                              color="#fff"/>
                    }
                    paletteStyles={{
                      marginVertical: 20,
                    }}
                />
                <Button mode="contained" onPress={this.handleSave}
                        icon="wallet-plus"
                        style={styles.saveButton}
                        labelStyle={styles.buttonText}
                        contentStyle={styles.buttonContent}>
                  Добавить
                </Button>
                <Snackbar visible={this.state.error}
                          style={{marginLeft: 30, width: '100%'}}
                          onDismiss={() => this.setState({error: false})}
                          action={{
                            label: 'ОК',
                            onPress: () => {
                              this.setState({error: false});
                            },
                          }}>
                  Проверьте введённые данные
                </Snackbar>
              </View>
            </Background>
          </SafeAreaView>
        </View>
    );
  }

  handleSave() {
    if (this.state.title.trim().length > 0) {
      const allWallets = this.props.user.wallets;
      const walletId = allWallets.length === 0
          ? 1
          : allWallets[allWallets.length - 1].id + 1;
      const wallet = {
        id: walletId,
        options: {
          title: this.state.title,
          color: this.state.color,
          currency: this.state.currency,
        },
        balance: 0,
        data: {
          income: [],
          expenses: [],
        },
      };

      this.props.addWallet(wallet);
      this.props.navigation.navigate('Home');
    } else {
      this.setState({error: true});
    }
  }
}

const styles = StyleSheet.create({
  appbarTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
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
  addWallet: data => dispatch({type: 'ADD_WALLET', data: data}),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddWallet);
