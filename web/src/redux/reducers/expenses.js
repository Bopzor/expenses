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
  VALIDATE_EXPENSE_REQUEST,
  VALIDATE_FIELD_REQUEST,
} from '../actions';

const defaultState = {
  fetchingExpenses: false,
  errors: null,
  list: [],
  addingExpense: false,
  removingExpense: false,
  updatingExpense: false
};

export const expenses = (state = defaultState, action) => {
  switch (action.type) {

    case GET_EXPENSES_REQUEST:
      return {
        ...state,
        fetchingExpenses: true,
        errors: null,
      };

    case GET_EXPENSES_SUCCESS:
      return {
        ...state,
        list: action.body,
      };

    case GET_EXPENSES_FAILURE:
      return {
        ...state,
        errors: action.body,
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
        errors: null,
      };

    case ADD_EXPENSE_SUCCESS:
      return {
        ...state,
        list: [ ...state.list, action.body ],
      };

    case ADD_EXPENSE_FAILURE:
      return {
        ...state,
        errors: action.body,
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
        errors: null,
      };

    case REMOVE_EXPENSE_SUCCESS:
      return {
        ...state,
        list: state.list.filter(e => e.id !== action.body),
      };

    case REMOVE_EXPENSE_FAILURE:
      return {
        ...state,
        errors: action.body,
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
        errors: null,
      };

    case UPDATE_EXPENSE_SUCCESS:
      const idx = state.list.findIndex(e => e.id === action.body.id);

      return {
        ...state,
        list: [
          ...state.list.slice(0, idx),
          action.body,
          ...state.list.slice(idx + 1),
        ]
      };

    case UPDATE_EXPENSE_FAILURE:
      return {
        ...state,
        errors: action.body,
      };

    case UPDATE_EXPENSE_FINISH:
      return {
        ...state,
        updatingExpense: false,
      };

    case VALIDATE_EXPENSE_REQUEST:
      return {
        ...state,
        errors: action.body,
      }

    case VALIDATE_FIELD_REQUEST:
      return {
        ...state,
        errors: state.errors === null
          ? { [action.body.name]: { message: action.body.message} }
          : { ...state.errors, [action.body.name]: { message: action.body.message } },
      }

    default:
      return state;
  }
};
