import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import Background from '../../components/Background';
import {Title} from 'react-native-paper';
import {LineChart} from 'react-native-chart-kit';
import {connect} from 'react-redux';

class Month extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthTitle: this.getCurrentMonth(),
      incomes: this.getIncomes(),
      expenses: this.getExpenses(),
    };
  }

  render() {
    return (
        <Background style={{flex: 1}}>
          <ScrollView style={styles.view}>
            <Title style={styles.title}>Доходы
              за {this.state.monthTitle}</Title>
            <LineChart
                data={{
                  labels: Object.keys(this.state.incomes),
                  datasets: [
                    {
                      data: Object.values(this.state.incomes),
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 40} // from react-native
                height={220}
                verticalLabelRotation={-90}
                chartConfig={{
                  backgroundColor: '#F4D03F',
                  backgroundGradientFrom: '#F4D03F',
                  backgroundGradientTo: '#16A085',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '4',
                    strokeWidth: 0,
                  },
                  propsForVerticalLabels: {
                    fontSize: 10,
                    textAnchor: 'middle',
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
            />
            <Title style={styles.title}>Расходы
              за {this.state.monthTitle}</Title>
            <LineChart
                data={{
                  labels: Object.keys(this.state.expenses),
                  datasets: [
                    {
                      data: Object.values(this.state.expenses),
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 40} // from react-native
                height={220}
                verticalLabelRotation={-90}
                chartConfig={{
                  backgroundColor: '#FFE53B',
                  backgroundGradientFrom: '#FFE53B',
                  backgroundGradientTo: '#FF2525',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '4',
                    strokeWidth: 0,
                  },
                  propsForVerticalLabels: {
                    fontSize: 10,
                    textAnchor: 'middle',
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
            />
          </ScrollView>
        </Background>
    );
  }

  getCurrentMonth() {
    const previousMonth = this.props.route.params.previousMonth;
    const months = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Окрябрь',
      'Ноябрь',
      'Декабрь',
    ];
    let date = new Date();
    let month = 0;
    let year = date.getFullYear();

    if (!previousMonth) {
      return months[date.getMonth()] + ' ' + year;
    } else {
      if (date.getMonth() - 1 >= 0) {
        month = date.getMonth() - 1;
      } else {
        year -= 1;
      }

      return months[month] + ' ' + year;
    }
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  getIncomes() {
    const previousMonth = this.props.route.params.previousMonth;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1 - (previousMonth ? 1 : 0);
    const wallets = this.props.user.wallets;
    const daysInMonth = this.daysInMonth(
        currentMonth,
        currentDate.getFullYear(),
    );
    let result = {};

    for (let i = 1; i <= daysInMonth; i++) {
      result[(i < 10 ? '0' + i : i) + '.' + currentMonth] = 0;
    }

    wallets.forEach(wallet => {
      if (wallet.data.income) {
        wallet.data.income.forEach(income => {
          let date = new Date(income.created_at);

          if (date.getFullYear() === currentDate.getFullYear() &&
              date.getMonth() === currentMonth - 1) {
            result[(date.getDate() < 10
                ? '0' + date.getDate()
                : date.getDate()) + '.' + currentMonth] += parseInt(
                income.number);
          }
        });
      }
    });

    return result;
  }

  getExpenses() {
    const previousMonth = this.props.route.params.previousMonth;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1 - (previousMonth ? 1 : 0);
    const wallets = this.props.user.wallets;
    const daysInMonth = this.daysInMonth(
        currentMonth,
        currentDate.getFullYear(),
    );
    let result = {};

    for (let i = 1; i <= daysInMonth; i++) {
      result[(i < 10 ? '0' + i : i) + '.' + currentMonth] = 0;
    }

    wallets.forEach(wallet => {
      if (wallet.data.expenses) {
        wallet.data.expenses.forEach(expenses => {
          let date = new Date(expenses.created_at);

          if (date.getFullYear() === currentDate.getFullYear() &&
              date.getMonth() === currentMonth - 1) {
            result[(date.getDate() < 10
                ? '0' + date.getDate()
                : date.getDate()) + '.' + currentMonth] += parseInt(
                expenses.number);
          }
        });
      }
    });

    return result;
  }
}

const styles = {
  view: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginVertical: 10,
  },
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Month);
