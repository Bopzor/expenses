import { myFetch } from '../../utilities';
import { fetchTotal } from './total';

const BASE_URL = `${process.env.REACT_APP_API_URL}/expenses`;

// GET EXPENSES:
export const GET_EXPENSES_REQUEST = 'GET_EXPENSES_REQUEST';
export const GET_EXPENSES_SUCCESS = 'GET_EXPENSES_SUCCESS';
export const GET_EXPENSES_FAILURE = 'GET_EXPENSES_FAILURE';
export const GET_EXPENSES_FINISH = 'GET_EXPENSES_FINISH';

const getExpenses = {
  REQUEST: () => ({
    type: GET_EXPENSES_REQUEST,
  }),
  SUCCESS: (expenses) => ({
    type: GET_EXPENSES_SUCCESS,
    body: expenses,
  }),
  FAILURE: (error) => ({
    type: GET_EXPENSES_FAILURE,
    body: error,
  }),
  FINISH: () => ({
    type: GET_EXPENSES_FINISH,
  }),
};

export const fetchExpenses = (dateFilter = undefined) => (dispatch) => {
  let url = BASE_URL;

  if (dateFilter) {
    url += `?year=${dateFilter.getFullYear()}&month=${dateFilter.getMonth()}`;
  }

  dispatch(getExpenses.REQUEST());

  return myFetch(url)
    .then(
      (expenses) => dispatch(getExpenses.SUCCESS(expenses)),
      (error) => dispatch(getExpenses.FAILURE(error))
    )
    .then(() => dispatch(getExpenses.FINISH()));
};

// ADD EXPENSE:
export const ADD_EXPENSE_REQUEST = 'ADD_EXPENSE_REQUEST';
export const ADD_EXPENSE_SUCCESS = 'ADD_EXPENSE_SUCCESS';
export const ADD_EXPENSE_FAILURE = 'ADD_EXPENSE_FAILURE';
export const ADD_EXPENSE_FINISH = 'ADD_EXPENSE_FINISH';

const addExpense = {
  REQUEST: () => ({
    type: ADD_EXPENSE_REQUEST,
  }),
  SUCCESS: (expense) => ({
    type: ADD_EXPENSE_SUCCESS,
    body: expense,
  }),
  FAILURE: (error) => ({
    type: ADD_EXPENSE_FAILURE,
    body: error.body,
  }),
  FINISH: () => ({
    type: ADD_EXPENSE_FINISH,
  }),
};

export const createExpense = (expense) => (dispatch) => {
  const url = BASE_URL;
  const opts = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(expense),
  };

  dispatch(addExpense.REQUEST());

  return myFetch(url, opts)
    .then(
      (expense) => dispatch(addExpense.SUCCESS(expense)),
      (error) => dispatch(addExpense.FAILURE(error))
    )
    .then(() => dispatch(addExpense.FINISH()))
    .then(() => dispatch(fetchTotal()));
};

// REMOVE EXPENSE:
export const REMOVE_EXPENSE_REQUEST = 'REMOVE_EXPENSE_REQUEST';
export const REMOVE_EXPENSE_SUCCESS = 'REMOVE_EXPENSE_SUCCESS';
export const REMOVE_EXPENSE_FAILURE = 'REMOVE_EXPENSE_FAILURE';
export const REMOVE_EXPENSE_FINISH = 'REMOVE_EXPENSE_FINISH';

const removeExpense = {
  REQUEST: () => ({
    type: REMOVE_EXPENSE_REQUEST,
  }),
  SUCCESS: (id) => ({
    type: REMOVE_EXPENSE_SUCCESS,
    body: id,
  }),
  FAILURE: (error) => ({
    type: REMOVE_EXPENSE_FAILURE,
    body: error.body,
  }),
  FINISH: () => ({
    type: REMOVE_EXPENSE_FINISH,
  }),
};

export const deleteExpense = (id) => (dispatch) => {
  const url = BASE_URL + '/' + id;
  const opts = {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };

  dispatch(removeExpense.REQUEST());

  return myFetch(url, opts)
    .then(
      () => dispatch(removeExpense.SUCCESS(id)),
      (error) => dispatch(removeExpense.FAILURE(error))
    )
    .then(() => dispatch(removeExpense.FINISH()))
    .then(() => dispatch(fetchTotal()));
};

// UPDATE EXPENSE:
export const UPDATE_EXPENSE_REQUEST = 'UPDATE_EXPENSE_REQUEST';
export const UPDATE_EXPENSE_SUCCESS = 'UPDATE_EXPENSE_SUCCESS';
export const UPDATE_EXPENSE_FAILURE = 'UPDATE_EXPENSE_FAILURE';
export const UPDATE_EXPENSE_FINISH = 'UPDATE_EXPENSE_FINISH';

const updateExpense = {
  REQUEST: () => ({
    type: UPDATE_EXPENSE_REQUEST,
  }),
  SUCCESS: (expense) => ({
    type: UPDATE_EXPENSE_SUCCESS,
    body: expense,
  }),
  FAILURE: (error) => ({
    type: UPDATE_EXPENSE_FAILURE,
    body: error.body,
  }),
  FINISH: () => ({
    type: UPDATE_EXPENSE_FINISH,
  }),
};

export const editExpense = (expense) => (dispatch) => {
  const url = BASE_URL + '/' + expense.id;
  const opts = {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(expense),
  };

  dispatch(updateExpense.REQUEST());

  return myFetch(url, opts)
    .then(
      (expense) => dispatch(updateExpense.SUCCESS(expense)),
      (error) => dispatch(updateExpense.FAILURE(error))
    )
    .then(() => dispatch(updateExpense.FINISH()))
    .then(() => dispatch(fetchTotal()));
};
