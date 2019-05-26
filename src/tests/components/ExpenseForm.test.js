import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('Should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm/>);
  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseForm with given data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('Should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm/>);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', { 
    preventDefault: () => { }
  });

  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('Should set description on input change', () => {
  const wrapper = shallow(<ExpenseForm/>);
  const value = 'New Description';
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('description')).toBe(value);
});

test('Should set note on text area change', () => {
  const wrapper = shallow(<ExpenseForm/>);
  const value = 'New Note';
  wrapper.find('textarea').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('note')).toBe(value);
});

test('Should set amount on valid input change', () => {
  const wrapper = shallow(<ExpenseForm/>);
  const value = '23.50';
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe(value);
});

test('Should not set amount on invalid input', () => {
  const wrapper = shallow(<ExpenseForm/>);
  const value = '12.122';
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe('');
});

test('Should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
  wrapper.find('form').simulate('submit', { 
    preventDefault: () => { }
  });
  expect(wrapper.state('error')).toBe('');


  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  });
});

test('Should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm/>);
  wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('Should set calendar focused on focus change', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm/>);
  wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused });
  expect(wrapper.state('calendarFocused')).toBe(focused);
});