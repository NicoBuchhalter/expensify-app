import filtersReducer from '../../reducers/filters';
import moment from 'moment';


test('Should setup default filter values', () => {
  const state = filtersReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    endDate: moment().endOf('month'),
    startDate: moment().startOf('month')
  })
});


test('Should set sortBy to amount', () => {
  const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
  expect(state.sortBy).toBe('amount');
});

test('Should set sortBy to date', () => {
  const currentState = {
    text: '', sortBy: 'amount', endDate: undefined, startDate: undefined
  }
  const state = filtersReducer(currentState, {type: 'SORT_BY_DATE'});
  expect(state.sortBy).toBe('date');
});

test('Should set text filter', () => {
  const text = 'Something'
  const state = filtersReducer(undefined, {type: 'SET_TEXT_FILTER', text});
  expect(state.text).toBe(text);
});

test('Should set startDate filter', () => {
  const startDate = moment(0);
  const state = filtersReducer(undefined, {type: 'SET_START_DATE', startDate});
  expect(state.startDate).toBe(startDate);
});

test('Should set startDate filter', () => {
  const endDate = moment(0);
  const state = filtersReducer(undefined, { type: 'SET_END_DATE', endDate });
  expect(state.endDate).toBe(endDate);
});