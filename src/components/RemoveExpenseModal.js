import React from 'react';
import Modal from 'react-modal';


const RemoveExpenseModal = (props) => (
  <Modal 
    isOpen={props.isModalOpen} 
    contentLabel="Remove Expense"
    closeTimeoutMS={200}
    className="modal"
  >
    <h3 className='modal__title'>{props.expenseDescription}</h3>
    <p className='modal__body'>Are you sure you want to remove this expense?</p>
    <div className='modal__buttons'>
      <button className='button button--secondary' onClick={props.handleRemoveExpense}>Remove</button>
      <button className='button' onClick={props.handleCloseModal}>Cancel</button>
    </div>
  </Modal>
)

export default RemoveExpenseModal;