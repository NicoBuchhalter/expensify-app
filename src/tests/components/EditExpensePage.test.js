import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let startEditExpense, startRemoveExpense, history, wrapper;
beforeEach(() => {
  startEditExpense = jest.fn().mockImplementation(() => Promise.resolve('Edited!'));
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      expense={expenses[1]} 
      startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense} 
      history={history} 
    />
  );
});

test('Should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should handle onSubmit', (done) => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(startEditExpense).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
  startEditExpense().then(() => {
    expect(history.push).toHaveBeenLastCalledWith('/');
    done();
  })
});