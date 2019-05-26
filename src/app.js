import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import './styles/styles.scss';
import 'normalize.css/normalize.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import AppRouter from './routers/AppRouter';

const store = configureStore();

store.dispatch(addExpense({ description: 'Water Bill', amount: 80000, createdAt: 1000 }));

store.dispatch(addExpense({ description: 'Gas Bill', amount: 45000, createdAt: 500 }));

store.dispatch(addExpense({ description: 'Rent', amount: 1000000}));

const jsx = (
  <Provider store={store}>
    <AppRouter/>
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));