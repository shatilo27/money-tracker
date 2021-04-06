import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Background from '../../components/Background';
import {
  Button,
  Dialog,
  FAB,
  Portal, Subheading,
  TextInput,
  RadioButton,
  List, Text,
} from 'react-native-paper';
import {connect} from 'react-redux';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';

class Expenses extends Component {
  constructor(props) {
    super(props);
    const walletId = this.props.route.params.walletId;
    this.state = {
      wallet: this.getWallet(walletId),
      openModal: false,
      number: '',
      type: 1,
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.onNumberChange = this.onNumberChange.bind(this);
  }

  render() {
    const types = [
      {label: 'Продукты', value: 1},
      {label: 'Первая необходимость', value: 2},
      {label: 'Красота и здоровье', value: 3},
      {label: 'Семья и дети', value: 4},
      {label: 'Бытовая химия', value: 5},
      {label: 'Выплата кредита/долга', value: 6},
      {label: 'Развлечения и подарки', value: 7},
    ];

    return (
        <View style={styles.view}>
          <Background style={{flex: 1}}>
            <ScrollView style={{
              flex: 1,
              width: '100%',
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
              {this.state.wallet.data.expenses.length
                  ? this.state.wallet.data.expenses.map((item, key) => (
                      <List.Item
                          title={'- ' + item.number + ' ' +
                          this.state.wallet.options.currency}
                          description={types.find(
                              type => type.value === item.type).label}
                          left={props => <List.Icon {...props} icon="cash"/>}
                          key={key}
                      />
                  ))
                  : (
                      <View style={styles.notFoundWrapper}>
                        <MaterialCommunityIcons name="cash-multiple"
                                                color="#777" size={70}/>
                        <Text style={styles.notFoundText}>На данный момент у вас
                          нет расходов в данном кошельке</Text>
                      </View>
                  )}
            </ScrollView>
          </Background>
          <FAB
              style={styles.fab}
              large={true}
              icon="plus"
              onPress={() => this.setState({openModal: true})}
              label="Расходы"
          />
          <Portal>
            <Dialog visible={this.state.openModal}
                    onDismiss={() => this.setState({openModal: false})}>
              <Dialog.Title>Добавление расходов</Dialog.Title>
              <Dialog.Content>
                <TextInput
                    label="Сумма"
                    mode="outlined"
                    keyboardType="numeric"
                    value={this.state.number}
                    style={styles.input}
                    onChangeText={this.onNumberChange}
                />
                <Subheading style={styles.subheading}>Выберите тип</Subheading>
                <RadioButton.Group
                    onValueChange={value => this.setState({type: value})}
                    value={this.state.type}>
                  {types.map((type, key) => (
                      <RadioButton.Item
                          label={type.label}
                          value={type.value}
                          key={key}
                          uncheckedColor="#fff"
                          color="#000"
                      />
                  ))}
                </RadioButton.Group>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={this.handleAdd}>Добавить</Button>
                <Button onPress={() => this.setState(
                    {openModal: false})}>Отмена</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
    );
  }

  getWallet(id) {
    const wallets = this.props.user.wallets;
    return wallets.find(wallet => wallet.id === id);
  }

  handleAdd() {
    this.props.addExpenses(
        this.state.wallet.id,
        this.state.number,
        this.state.type,
    );
    this.setState({
      openModal: false,
      number: '',
      type: 1
    });
  }

  onNumberChange(number) {
    let newText = '';
    let numbers = '0123456789';

    for (let i = 0; i < number.length; i++) {
      if (numbers.indexOf(number[i]) > -1) {
        newText = newText + number[i];
      } else {
        alert('Введите корректное число');
      }
    }

    this.setState({number: newText});
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    color: '#fff',
  },
  subheading: {
    marginVertical: 10,
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: '700',
  },
  radioButton: {
    flexDirection: 'row',
  },
  notFoundWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  notFoundText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '700',
    color: '#777',
    maxWidth: 210,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  addExpenses: (walletId, number, expensesType) => dispatch({
    type: 'ADD_EXPENSES',
    walletId: walletId,
    number: number,
    expensesType: expensesType,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
