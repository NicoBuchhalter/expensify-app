import uuid from 'uuid';
import firestore from '../firebase/firebase';

const firestoreExpenses = firestore.collection('expenses')

export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
}); 

export const startAddExpense = (expensesData = {}) => {
  return (dispatch) => {
    const {
      description = '', 
      note = '', 
      amount = 0, 
      createdAt = 0       
    } =  expensesData;
    const expense = { description, note, amount, createdAt };
    return firestoreExpenses.add(expense).then((docRef) => {
      dispatch(addExpense({
        id: docRef.id, 
        ...expense
      }));
    });

  };
};

export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch) => {
    return firestoreExpenses.doc(id).delete().then(() => {
      dispatch(removeExpense({ id }));
    });    
  }
};

export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});


export const startSetExpenses = () => {
  return (dispatch) => {
    return firestoreExpenses.get().then(querySnapshot => {
      const expenses = querySnapshot.docs.map(docRef => ({
        id: docRef.id,
        ...docRef.data()
      }));
      dispatch(setExpenses(expenses));
    });    
  }
};