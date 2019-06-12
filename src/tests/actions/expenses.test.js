import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, removeExpense, editExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import firestore from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test('Should setup remove expense action object', () => {
  const action = removeExpense({ id: 'testId123'});

  expect(action).toEqual({ type: 'REMOVE_EXPENSE', id: 'testId123'});
});

test('Should setup edit expense action object', () => {
  const action = editExpense('testId123', { note: 'New note value'});

  expect(action).toEqual({ type: 'EDIT_EXPENSE', id: 'testId123', updates: { note: 'New note value' }});
}); 


test('Should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);

  expect(action).toEqual({ 
    type: 'ADD_EXPENSE', 
    expense: expenses[2]
  });

});

test('Should add expense to firestore and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Almuerzo',
    amount: 15500,
    note: 'Guiso de lentejas en El Patio',
    createdAt: 1000
  }
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    return firestore.collection('expenses').doc(actions[0].expense.id).get();
  }).then(snapshot => {
    expect(snapshot.data()).toEqual(expenseData);
    done(); 
  })
});

test('Should add expense to firestore and store with default values', (done) => {
  const store = createMockStore({});
  const defaultValues = { description: '', note: '', amount:0, createdAt: 0 };
  store.dispatch(startAddExpense()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...defaultValues
      }
    });
    return firestore.collection('expenses').doc(actions[0].expense.id).get();
  }).then(snapshot => {
    expect(snapshot.data()).toEqual(defaultValues);
    done(); 
  })
});
// test('Should setup add expense action object with default values', () => {
//   const action = addExpense();
//   const defaultValues= { description: '', note: '', amount:0, createdAt: 0 };
//   expect(action).toEqual({ type: 'ADD_EXPENSE', expense: { ...defaultValues, id: expect.any(String)}});  
// });