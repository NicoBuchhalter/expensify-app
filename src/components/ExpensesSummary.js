import React from 'react';
import { connect } from 'react-redux';
import selectExpensesTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';
import numeral from 'numeral';

export const ExpensesSummary = ({ expenseCount, expensesTotal}) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
  const formattedTotal = numeral(expensesTotal / 100).format('$0,0.00');
  return (
    <div>
      <h1>Viewing {expenseCount} {expenseWord} totalling {formattedTotal}</h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  const expenses = selectExpenses(state.expenses, state.filters)
  return {
    expenseCount: expenses.length,
    expensesTotal: selectExpensesTotal(expenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
