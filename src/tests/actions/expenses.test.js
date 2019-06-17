import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startAddExpense,
  addExpense,
  removeExpense,
  editExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import firestore from "../../firebase/firebase";

const uid = 'Test uid'
const defaultAuthState = { auth: { uid }};
const createMockStore = configureMockStore([thunk]);

test("Should setup remove expense action object", () => {
  const action = removeExpense({ id: "testId123" });

  expect(action).toEqual({ type: "REMOVE_EXPENSE", id: "testId123" });
});

test("Should setup edit expense action object", () => {
  const action = editExpense("testId123", { note: "New note value" });

  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "testId123",
    updates: { note: "New note value" }
  });
});

test("Should setup add expense action object with provided values", () => {
  const action = addExpense(expenses[2]);

  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2]
  });
});

test("Should add expense to firestore and store", done => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: "Almuerzo",
    amount: 15500,
    note: "Guiso de lentejas en El Patio",
    createdAt: 1000
  };
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });
      return firestore
        .collection('users')
        .doc(uid)
        .collection("expenses")
        .doc(actions[0].expense.id)
        .get();
    })
    .then(snapshot => {
      expect(snapshot.data()).toEqual(expenseData);
      done();
    });
});

test("Should add expense to firestore and store with default values", done => {
  const store = createMockStore(defaultAuthState);
  const defaultValues = { description: "", note: "", amount: 0, createdAt: 0 };
  store
    .dispatch(startAddExpense())
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...defaultValues
        }
      });
      return firestore
        .collection('users')
        .doc(uid)
        .collection("expenses")
        .doc(actions[0].expense.id)
        .get();
    })
    .then(snapshot => {
      expect(snapshot.data()).toEqual(defaultValues);
      done();
    });
});

test("Should setup set expense action object with provided values", () => {
  const action = setExpenses(expenses);

  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses
  });
});

describe("Async actions", () => {
  beforeEach(done => {
    const expensesCollection = firestore.collection('users').doc(uid).collection('expenses');
    expensesCollection.get().then(querySnapshot => {
      let batch = firestore.batch();
      querySnapshot.forEach(doc => {
        batch = batch.delete(doc.ref);
      });
      batch.commit().then(() => {
        let otherBatch = firestore.batch();
        expenses.forEach(({ id, description, amount, createdAt, note }) => {
          otherBatch = otherBatch.set(expensesCollection.doc(id), { description, amount, createdAt, note });
        });
        otherBatch.commit().then(() => done());
      });
    });
  });

  test("Should fetch expenses from firebase", done => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "SET_EXPENSES",
        expenses
      });
      done();
    });
  });

  test("Should remove expense from firestore and store", done => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[1].id;
    store
      .dispatch(startRemoveExpense({ id }))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: "REMOVE_EXPENSE",
          id
        });
        return firestore
          .collection('users')
          .doc(uid)
          .collection("expenses")
          .doc(id)
          .get();
      })
      .then(snapshot => {
        expect(snapshot.exists).toBeFalsy();
        done();
      });
  });

  test("Should update expense from firestore and store", done => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[1].id;
    const updates = { note: "New note value" };
    store
      .dispatch(startEditExpense(id, updates))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: "EDIT_EXPENSE",
          id,
          updates
        });
        return firestore
          .collection('users')
          .doc(uid)
          .collection("expenses")
          .doc(id)
          .get()
      })
      .then((snapshot) => {
        expect(snapshot.data().note).toBe("New note value");
        done();
      });
  });
});
