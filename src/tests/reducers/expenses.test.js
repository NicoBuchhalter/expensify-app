import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('Should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('Should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('Should not remove expenses if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('Should add an expense', () => {
  const expense = {
    id: '4',
    description: 'Laptop',
    note: '',
    amount: 3560000,
    createdAt: moment(0).add(6, 'days')
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test('Should edit an expense', () => {
  const note = 'A new special note';
  const updates = { note };
  const state = expensesReducer(expenses, { type: 'EDIT_EXPENSE', id: expenses[0].id, updates });
  expect(state[0].note).toBe(note);
});

test('Should not edit expense if id not found', () => {
  const note = 'A new special note';
  const updates = { note };
  const state = expensesReducer(expenses, { type: 'EDIT_EXPENSE', id: '-1', updates });
  expect(state).toEqual(expenses);
});