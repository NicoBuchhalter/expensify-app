import React from 'react';
import {connect} from 'react-redux';
import RemoveExpenseModal from './RemoveExpenseModal';
import ExpenseForm from './ExpenseForm';
import LoadingPage from './LoadingPage';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {

  state = {
    isModalOpen: false,
    loading: false
  }

  onSubmit = (expense) => {
    this.setState({ loading: true });
    this.props.startEditExpense(this.props.expense.id, expense).then(() => {
      this.props.history.push('/');
    })
  };

  onRemove = () => {
    this.setState({ isModalOpen: false, loading: true });
    this.props.startRemoveExpense(this.props.expense.id).then(() => {
      this.props.history.push('/');
    })
  };

  handleOpenModal = () => {
    this.setState({ isModalOpen: true });
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    return (
      <div>
        {!this.state.loading ? (
          <div>
            <div className='page-header'>
              <div className='content-container'>
                <h1 className='page-header__title'>Edit Expense</h1>
              </div>
            </div>
            <div className='content-container'>
              <ExpenseForm
                expense={this.props.expense}
                onSubmit={this.onSubmit}
                submitText='Save Expense'
              />
              <button className='button--secondary' onClick={this.handleOpenModal}>Remove Expense</button>
            </div>
            <RemoveExpenseModal 
              isModalOpen={this.state.isModalOpen} 
              expenseDescription={this.props.expense.description}
              handleRemoveExpense={this.onRemove}
              handleCloseModal={this.closeModal}
            />
          </div>
        ) :
        (
          <LoadingPage/>
        )}
      </div>
    );
  };
};


const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: (id) => dispatch(startRemoveExpense({ id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);