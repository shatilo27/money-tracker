import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_DATA,
  USER_INIT_DATA,
  ADD_WALLET,
  REMOVE_WALLET,
  EDIT_WALLET,
  ADD_INCOME,
  ADD_EXPENSES,
} from '../actions/user';

const initialState = {
  isLoggedIn: false,
  data: {
    firstname: '',
    lastname: '',
    about: '',
  },
  wallets: [],
};

export function user(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return Object.assign({}, state, action.data, {
        isLoggedIn: true,
      });

    case USER_DATA:
      return Object.assign({}, state, {
        data: action.data,
      });

    case USER_LOGOUT:
      return initialState;

    case USER_INIT_DATA:
      return action.initialState ? action.initialState : initialState;

    case ADD_WALLET:
      state.wallets.push(action.data);
      return Object.assign({}, state, {
        wallets: state.wallets,
      });

    case EDIT_WALLET:
      let walletIndex = state.wallets.findIndex(
          wallet => wallet.id === action.id);
      state.wallets[walletIndex].options = action.data;
      return Object.assign({}, state);

    case REMOVE_WALLET:
      const wallets = state.wallets.filter(wallet => wallet.id !== action.id);
      return Object.assign({}, state, {
        wallets: wallets,
      });

    case ADD_INCOME:
      let walletIncomeIndex = state.wallets.findIndex(
          wallet => wallet.id === action.walletId);
      state.wallets[walletIncomeIndex].balance = parseInt(state.wallets[walletIncomeIndex].balance) + parseInt(action.number);
      state.wallets[walletIncomeIndex].data.income.push({
        number: action.number,
        type: action.incomeType,
        created_at: Date.now(),
      });
      return Object.assign({}, state);

    case ADD_EXPENSES:
      let walletExpensesIndex = state.wallets.findIndex(
          wallet => wallet.id === action.walletId);
      state.wallets[walletExpensesIndex].balance = parseInt(state.wallets[walletExpensesIndex].balance) - parseInt(action.number);
      state.wallets[walletExpensesIndex].data.expenses.push({
        number: action.number,
        type: action.expensesType,
        created_at: Date.now(),
      });
      return Object.assign({}, state);

    default:
      return state;
  }
}
