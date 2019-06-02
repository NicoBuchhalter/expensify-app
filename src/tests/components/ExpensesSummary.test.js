import React from 'react';
import { shallow } from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('Should show correct message when only one expense', () => {
  expect(shallow(<ExpensesSummary expenseCount={1} expensesTotal={15000}/>)).toMatchSnapshot();
});

test('Should show correct message when multiple expenses', () => {
  expect(shallow(<ExpensesSummary expenseCount={3} expensesTotal={2550000}/>)).toMatchSnapshot();
});