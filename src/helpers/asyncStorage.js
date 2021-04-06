import AsyncStorage from '@react-native-async-storage/async-storage';

const asyncStorage = {
  get: async (key) => {
    const result = await AsyncStorage.getItem(key);

    return JSON.parse(result);
  },
  set: async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  delete: async (key) => {
    await AsyncStorage.removeItem(key);
  },
  addWallet: async (options) => {
    try {
      asyncStorage.get('wallets').then((wallets) => {
        let newWallet = {
          id: wallets ? wallets.length + 1 : 1,
          options: options,
          income: {},
          expenses: {},
          balance: 0,
        };
        let newWallets = [];

        if (wallets) {
          newWallets = newWallets.concat(wallets, [newWallet]);
        } else {
          newWallets = [newWallet];
        }

        asyncStorage.set('wallets', newWallets);
      });
    } catch (e) {
      alert(e.message);
    }
  },
  deleteWallet: async (id) => {
    asyncStorage.get('wallets').then((wallets) => {
      let newWallets = wallets.filter(function(wallet) {
        return wallet.id !== id;
      });
      asyncStorage.set('wallets', newWallets);
    });
  },
  updateWallet: async (id, options) => {
    asyncStorage.get('wallets').then((wallets) => {
      let newWallets = [];
      wallets.forEach((wallet) => {
        if (wallet.id === id) {
          wallet.options = options;
        }

        newWallets.push(wallet);
      });
      asyncStorage.set('wallets', newWallets);
    });
  },
  addIncome: async (walletId, num, category) => {
    asyncStorage.get('wallets').then((wallets) => {
      if (wallets) {
        let newWallets = [];
        wallets.forEach((wallet) => {
          if (wallet.id === walletId) {
            if (wallet.income.hasOwnProperty(category)) {
              wallet.income[category].push({
                num: num,
                date: Date.now(),
              });
            } else {
              wallet.income[category] = [{
                num: num,
                date: Date.now(),
              }];
            }

            wallet.balance += num;
          }

          newWallets.push(wallet);
        });
        asyncStorage.set('wallets', newWallets);
      }
    });
  },
};

export default asyncStorage;
