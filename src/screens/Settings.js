import React, {Component} from 'react';
import {SafeAreaView, StatusBar, View, StyleSheet} from 'react-native';
import {
  Appbar,
  Button,
  Dialog, Paragraph, Portal,
  Snackbar,
  Text,
  TextInput,
} from 'react-native-paper';
import Background from '../components/Background';
import {connect} from 'react-redux';
import {StackActions} from '@react-navigation/routers';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: this.props.user.data.firstname,
      lastname: this.props.user.data.lastname,
      about: this.props.user.data.about,
      showMessage: false,
      logoutModal: false,
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  render() {
    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <StatusBar barStyle="light-content"/>
          <Appbar.Header>
            <Appbar.Content title="Настройки" subtitle="monotrack"
                            titleStyle={styles.appbarTitle}/>
          </Appbar.Header>
          <SafeAreaView style={{flex: 1}}>
            <Background>
              <View style={{flex: 1, width: '100%'}}>
                <View style={{padding: 30, flex: 1}}>
                  <TextInput
                      label="Ваше имя"
                      mode="outlined"
                      value={this.state.firstname}
                      style={styles.input}
                      onChangeText={text => this.setState({firstname: text})}
                  />
                  <TextInput
                      label="Ваша фамилия"
                      mode="outlined"
                      value={this.state.lastname}
                      style={styles.input}
                      onChangeText={text => this.setState({lastname: text})}
                  />
                  <TextInput
                      label="О себе"
                      mode="outlined"
                      multiline={true}
                      value={this.state.about}
                      style={styles.textarea}
                      onChangeText={text => this.setState({about: text})}
                  />
                  <Button mode="contained" onPress={this.handleSave}
                          style={styles.saveButton}
                          labelStyle={styles.buttonText}
                          contentStyle={styles.buttonContent}>
                    Сохранить
                  </Button>
                </View>
                <View style={{paddingHorizontal: 30, paddingBottom: 30}}>
                  <Button mode="outlined"
                          onPress={() => this.setState({logoutModal: true})}
                          style={styles.saveButton}
                          labelStyle={styles.buttonText}
                          contentStyle={styles.buttonContent}>
                    Удалить данные
                  </Button>
                </View>
                <Snackbar visible={this.state.showMessage}
                          onDismiss={() => this.setState({showMessage: false})}
                          action={{
                            label: 'ОК',
                            onPress: () => {
                              this.setState({showMessage: false});
                            },
                          }}>
                  Настройки были успешно сохранены
                </Snackbar>
                <Portal>
                  <Dialog visible={this.state.logoutModal}
                          onDismiss={() => this.setState({logoutModal: false})}>
                    <Dialog.Title>Удаление данных</Dialog.Title>
                    <Dialog.Content>
                      <Paragraph>Вы действительно хотите удалить все данные?
                        После этого их невозможно будет
                        восстановить.</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                      <Button onPress={this.handleLogout}>Да</Button>
                      <Button onPress={() => this.setState(
                          {logoutModal: false})}>Нет</Button>
                    </Dialog.Actions>
                  </Dialog>
                </Portal>
              </View>
            </Background>
          </SafeAreaView>
        </View>
    );
  }

  handleSave() {
    let userData = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      about: this.state.about,
    };

    this.props.saveUserData(userData);
    this.setState({showMessage: true});
  }

  handleLogout() {
    this.setState({
      logoutModal: false,
    });
    this.props.userLogout();
    this.props.navigation.dispatch(StackActions.pop(1));
    this.props.navigation.navigate('Start');
  }
}

const styles = StyleSheet.create({
  appbarTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
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
  textarea: {
    marginBottom: 15,
    maxHeight: 200,
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  saveUserData: data => dispatch({type: 'USER_DATA', data}),
  userLogout: () => dispatch({type: 'USER_LOGOUT'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
