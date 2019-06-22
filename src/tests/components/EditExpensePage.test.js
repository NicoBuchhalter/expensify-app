import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import RemoveExpenseModal from '../../components/RemoveExpenseModal';
import LoadingPage from '../../components/LoadingPage';
import expenses from '../fixtures/expenses';

let startEditExpense, startRemoveExpense, history, wrapper;
beforeEach(() => {
  startEditExpense = jest.fn().mockImplementation(() => Promise.resolve('Edited!'));
  startRemoveExpense = jest.fn().mockImplementation(() => Promise.resolve('Removed!'));;
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

test('Should handle onSubmit', (done) => {
  expect(wrapper.find(LoadingPage)).toHaveLength(0);
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(startEditExpense).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
  expect(wrapper.find(LoadingPage)).toHaveLength(1);
  startEditExpense().then(() => {
    expect(history.push).toHaveBeenLastCalledWith('/');
    done();
  })
});

test('Should handle Remove from Modal', (done) => {
  expect(wrapper.find(LoadingPage)).toHaveLength(0);
  wrapper.find(RemoveExpenseModal).dive().find('.button--secondary').simulate('click');
  expect(startRemoveExpense).toHaveBeenLastCalledWith(expenses[1].id);
  expect(wrapper.find(LoadingPage)).toHaveLength(1);
  startRemoveExpense().then(() => {
    expect(history.push).toHaveBeenLastCalledWith('/');
    done();
  })
});