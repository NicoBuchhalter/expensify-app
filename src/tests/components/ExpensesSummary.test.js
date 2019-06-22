import React from 'react';
import { shallow } from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';

test('Should show correct message when only one expense', () => {
  expect(shallow(<ExpensesSummary allExpensesCount={1} expenseCount={1} expensesTotal={15000}/>)).toMatchSnapshot();
});

test('Should show correct message when multiple expenses', () => {
  expect(shallow(<ExpensesSummary allExpensesCount={5} expenseCount={3} expensesTotal={2550000}/>)).toMatchSnapshot();
});