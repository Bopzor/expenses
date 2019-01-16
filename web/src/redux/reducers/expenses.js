import {
  GET_EXPENSES_REQUEST,
  GET_EXPENSES_SUCCESS,
  GET_EXPENSES_FAILURE,
  GET_EXPENSES_FINISH,
  ADD_EXPENSE_REQUEST,
  ADD_EXPENSE_SUCCESS,
  ADD_EXPENSE_FAILURE,
  ADD_EXPENSE_FINISH,
  REMOVE_EXPENSE_REQUEST,
  REMOVE_EXPENSE_SUCCESS,
  REMOVE_EXPENSE_FAILURE,
  REMOVE_EXPENSE_FINISH,
  UPDATE_EXPENSE_REQUEST,
  UPDATE_EXPENSE_SUCCESS,
  UPDATE_EXPENSE_FAILURE,
  UPDATE_EXPENSE_FINISH,
  SET_DATE_FILTER,
} from '../actions';

const expensesApp = (state = { fetchingExpenses: false, error: null, expenses: [], addingExpense: false, removingExpense: false, updatingExpense: false, dateFilter: new Date() }, action) => {
  switch (action.type) {

    case GET_EXPENSES_REQUEST:
      return {
        ...state,
        fetchingExpenses: true,
      };

    case GET_EXPENSES_SUCCESS:
      return {
        ...state,
        expenses: action.body,
      };

    case GET_EXPENSES_FAILURE:
      return {
        ...state,
        error: action.body,
      };

    case GET_EXPENSES_FINISH:
      return {
        ...state,
        fetchingExpenses: false,
      };

    case ADD_EXPENSE_REQUEST:
      return {
        ...state,
        addingExpense: true,
      };

    case ADD_EXPENSE_SUCCESS:
      return {
        ...state,
        expenses: [ ...state.expenses, action.body ],
      };

    case ADD_EXPENSE_FAILURE:
      return {
        ...state,
        error: action.body,
      };

    case ADD_EXPENSE_FINISH:
      return {
        ...state,
        addingExpense: false,
      };

    case REMOVE_EXPENSE_REQUEST:
      return {
        ...state,
        removingExpense: true,
      };

    case REMOVE_EXPENSE_SUCCESS:
      return {
        ...state,
        expenses: state.expenses.filter(e => e.id !== action.body),
      };

    case REMOVE_EXPENSE_FAILURE:
      return {
        ...state,
        error: action.body,
      };

    case REMOVE_EXPENSE_FINISH:
      return {
        ...state,
        removingExpense: false,
      };

    case UPDATE_EXPENSE_REQUEST:
      return {
        ...state,
        updatingExpense: true,
      };

    case UPDATE_EXPENSE_SUCCESS:
      const idx = state.expenses.findIndex(e => e.id === action.body.id);

      return {
        ...state,
        expenses: [
          ...state.expenses.slice(0, idx),
          action.body,
          ...state.expenses.slice(idx + 1),
        ]
      };

    case UPDATE_EXPENSE_FAILURE:
      return {
        ...state,
        error: action.body,
      };

    case UPDATE_EXPENSE_FINISH:
      return {
        ...state,
        updatingExpense: false,
      };

    // TODO: SPECIFIC REDUCER
    case SET_DATE_FILTER:
      return {
        ...state,
        dateFilter: action.body,
      }

    default:
      return state;
  }
};

export default expensesApp;
