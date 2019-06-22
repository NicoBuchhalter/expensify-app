import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import RemoveExpenseModal from '../../components/RemoveExpenseModal';

let handleRemoveExpense, handleCloseModal, history, wrapper;
beforeEach(() => {
  handleRemoveExpense = jest.fn();
  handleCloseModal = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <RemoveExpenseModal
      isModalOpen={true}
      expenseDescription={expenses[1].description} 
      handleRemoveExpense={handleRemoveExpense}
      handleCloseModal={handleCloseModal} 
      history={history} 
    />
  );
});

test('Should render RemoveExpenseModal correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should handle remove', () => {
  wrapper.find('.button--secondary').simulate('click');
  expect(handleRemoveExpense).toHaveBeenCalled();
});

test('Should handle cancel', () => {
  wrapper.find('button').last().simulate('click');
  expect(handleCloseModal).toHaveBeenCalled();
});