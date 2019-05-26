import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import {ExpenseListFilters} from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setStartDate, setTextFilter, setEndDate, sortByDate, sortByAmount, wrapper;

beforeEach (() => {
  setTextFilter = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setEndDate={setEndDate}
      setStartDate={setStartDate}
      setTextFilter={setTextFilter}
      sortByAmount={sortByAmount}
      sortByDate={sortByDate}
    />
  );
});

test('Should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseListFilters with alternative data correctly', () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test('Should handle text change', () => {
  const value = 'New Text Filter';
  wrapper.find('input').simulate('change', {
    target: { value }
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('Should sort by date', () => {
  const value = "date";
  wrapper.setProps({
    filters: altFilters
  });
  wrapper.find('select').simulate('change', {
    target: { value }
  });
  expect(sortByDate).toHaveBeenCalled();
});

test('Should sort by amount', () => {
  const value = "amount";
  wrapper.find('select').simulate('change', {
    target: { value }
  });
  expect(sortByAmount).toHaveBeenCalled();
});


test('Should handle date change', () => {
  const startDate = moment().subtract(10, 'days');
  const endDate = moment().add(10, 'days')
  wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({ startDate, endDate });
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
});

test('Should handle date focus changes', () => {
  let focused = 'startDate';
  wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(focused);
  expect(wrapper.state('calendarFocused')).toBe(focused);
});