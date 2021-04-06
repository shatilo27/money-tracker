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

class EditWallet extends Component {
  constructor(props) {
    super(props);
    const walletId = this.props.route.params.id;
    const wallet = this.getWallet(walletId);
    this.state = {
      wallet: wallet,
      title: wallet.options.title,
      color: wallet.options.color,
      currency: wallet.options.currency,
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
          <Appbar.Header
              style={{backgroundColor: this.state.color}}>
            <Appbar.BackAction
                onPress={() => this.props.navigation.goBack()}
                color="#fff"
            />
            <Appbar.Content
                title="Редактировать кошелёк"
                titleStyle={styles.appbarTitle}
                color="#fff"
            />
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
                  Сохранить
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

  getWallet(id) {
    const wallets = this.props.user.wallets;
    return wallets.find(wallet => wallet.id === id);
  }

  handleSave() {
    if (this.state.title.trim().length > 0) {
      const walletId = this.state.wallet.id;
      const options = {
        title: this.state.title,
        color: this.state.color,
        currency: this.state.currency,
      };

      this.props.saveWallet(walletId, options);
      this.props.navigation.navigate('Wallet', {id: walletId});
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
  saveWallet: (id, data) => dispatch({type: 'EDIT_WALLET', id: id, data: data}),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditWallet);
