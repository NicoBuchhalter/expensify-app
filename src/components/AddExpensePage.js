import React from 'react';
import ExpenseForm from './ExpenseForm';
import LoadingPage from './LoadingPage';
import {connect} from 'react-redux';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {

  state = {
    loading: false
  }

  onSubmit = (expense) => {
    this.setState({ loading: true });
    this.props.startAddExpense(expense).then(() => {
      this.props.history.push('/');
    })
  };

  render() {
    return(
      <div>
        { this.state.loading ? 
          (
            <LoadingPage/>
          ) :
          (
            <div>
              <div className='page-header'>
                <div className='content-container'>
                  <h1 className='page-header__title'>Add Expense</h1>
                </div>
              </div>
              <div className='content-container'>
                <ExpenseForm 
                  onSubmit={this.onSubmit}
                  submitText='Save Expense'
                />
              </div>
            </div>
          )
        }
      </div>
    )
  }

}


const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense))
});


export default connect(undefined, mapDispatchToProps)(AddExpensePage);