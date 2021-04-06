import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';
import Start from './src/screens/Start';
import {theme} from './src/core/theme';
import Home from './src/screens/Home';
import About from './src/screens/About';
import asyncStorage from './src/helpers/asyncStorage';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {reducers} from './src/store/reducers';
import Loader from './src/screens/Loader';
import thunk from 'redux-thunk';
import AddWallet from './src/screens/AddWallet';
import Wallet from './src/screens/Wallet';
import EditWallet from './src/screens/EditWallet';

const Stack = createStackNavigator();

const store = createStore(reducers, applyMiddleware(thunk));

store.subscribe(() => {
  asyncStorage.set('state', store.getState());
  //asyncStorage.set('state', {});
});

asyncStorage.get('state').then((state) => {
  if (state !== null && typeof state !== 'undefined') {
    store.dispatch(dispatch => dispatch({
      type: 'USER_INIT_DATA',
      initialState: state.user || false,
    }));
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideWelcome: false,
    };
  }

  render() {
    return (
        <Provider store={store}>
          <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
              <Stack.Navigator initialRouteName="Loader">
                <Stack.Screen
                    name="Loader"
                    component={Loader}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Start"
                    component={Start}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="About"
                    component={About}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{headerShown: false, gestureEnabled: false}}
                />
                <Stack.Screen
                    name="AddWallet"
                    component={AddWallet}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Wallet"
                    component={Wallet}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="EditWallet"
                    component={EditWallet}
                    options={{headerShown: false}}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </Provider>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    notifyActions: bindActionCreators(notifyActions, dispatch),
  };
}

export default App;
