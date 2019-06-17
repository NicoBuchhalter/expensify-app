import authReducer from '../../reducers/auth';

test('Should set uid value on login', () => {
  const uid = 'asdasd';
  const state = authReducer(undefined, { type: 'LOGIN', uid });
  expect(state.uid).toBe(uid);
});

test('Should remove uid on logout', () => {
  const currentState = { uid: '123asd' };
  const state = authReducer(currentState, { type: 'LOGOUT' });
  expect(state).toEqual({});
});