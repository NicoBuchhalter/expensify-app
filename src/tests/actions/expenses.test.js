import { addExpense, removeExpense, editExpense } from '../../actions/expenses'

test('Should setup remove expense action object', () => {
  const action = removeExpense({ id: 'testId123'});

  expect(action).toEqual({ type: 'REMOVE_EXPENSE', id: 'testId123'});
});

test('Should setup edit expense action object', () => {
  const action = editExpense('testId123', { note: 'New note value'});

  expect(action).toEqual({ type: 'EDIT_EXPENSE', id: 'testId123', updates: { note: 'New note value' }});
}); 


test('Should setup add expense action object with provided values', () => {
  const expenseData = { description: 'Rent', amount: 1150000, createdAt: 120000, note: 'This was last month expense' };
  const action = addExpense(expenseData);

  expect(action).toEqual({ type: 'ADD_EXPENSE', expense: { ...expenseData, id: expect.any(String)}});

});

test('Should setup add expense action object with default values', () => {
  const action = addExpense();
  const defaultValues= { description: '', note: '', amount:0, createdAt: 0 };
  expect(action).toEqual({ type: 'ADD_EXPENSE', expense: { ...defaultValues, id: expect.any(String)}});  
});