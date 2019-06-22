import React from 'react';
import { shallow } from 'enzyme';
import {AddExpensePage} from '../../components/AddExpensePage';
import LoadingPage from '../../components/LoadingPage';
import expenses from '../fixtures/expenses';

let startAddExpense, history, wrapper;
beforeEach(() => {
  startAddExpense = jest.fn().mockImplementation(() => Promise.resolve('Added!'));
  history = { push: jest.fn() };
  wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
});

test('Should render AddExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should handle onSubmit', (done) => {
  expect(wrapper.find(LoadingPage)).toHaveLength(0);
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
  expect(wrapper.find(LoadingPage)).toHaveLength(1);
  startAddExpense().then(() => {
    expect(history.push).toHaveBeenLastCalledWith('/');
    done();
  })
});