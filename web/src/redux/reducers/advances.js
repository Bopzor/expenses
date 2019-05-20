import {
  GET_ADVANCES_REQUEST,
  GET_ADVANCES_SUCCESS,
  GET_ADVANCES_FAILURE,
  GET_ADVANCES_FINISH,
  ADD_ADVANCE_REQUEST,
  ADD_ADVANCE_SUCCESS,
  ADD_ADVANCE_FAILURE,
  ADD_ADVANCE_FINISH,
  REMOVE_ADVANCE_REQUEST,
  REMOVE_ADVANCE_SUCCESS,
  REMOVE_ADVANCE_FAILURE,
  REMOVE_ADVANCE_FINISH,
  UPDATE_ADVANCE_REQUEST,
  UPDATE_ADVANCE_SUCCESS,
  UPDATE_ADVANCE_FAILURE,
  UPDATE_ADVANCE_FINISH,
  VALIDATE_ADVANCE_REQUEST,
  VALIDATE_FIELD_REQUEST,
} from '../actions';

const defaultState = {
  fetchingAdvances: false,
  errors: null,
  list: [],
  addingAdvance: false,
  removingAdvance: false,
  updatingAdvance: false
};

export const advances = (state = defaultState, action) => {
  switch (action.type) {

    case GET_ADVANCES_REQUEST:
      return {
        ...state,
        fetchingAdvances: true,
        errors: null,
      };

    case GET_ADVANCES_SUCCESS:
      return {
        ...state,
        list: action.body,
      };

    case GET_ADVANCES_FAILURE:
      return {
        ...state,
        errors: action.body,
      };

    case GET_ADVANCES_FINISH:
      return {
        ...state,
        fetchingAdvances: false,
      };

    case ADD_ADVANCE_REQUEST:
      return {
        ...state,
        addingAdvance: true,
        errors: null,
      };

    case ADD_ADVANCE_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.body],
      };

    case ADD_ADVANCE_FAILURE:
      return {
        ...state,
        errors: action.body,
      };

    case ADD_ADVANCE_FINISH:
      return {
        ...state,
        addingAdvance: false,
      };

    case REMOVE_ADVANCE_REQUEST:
      return {
        ...state,
        removingAdvance: true,
        errors: null,
      };

    case REMOVE_ADVANCE_SUCCESS:
      return {
        ...state,
        list: state.list.filter(e => e.id !== action.body),
      };

    case REMOVE_ADVANCE_FAILURE:
      return {
        ...state,
        errors: action.body,
      };

    case REMOVE_ADVANCE_FINISH:
      return {
        ...state,
        removingAdvance: false,
      };

    case UPDATE_ADVANCE_REQUEST:
      return {
        ...state,
        updatingAdvance: true,
        errors: null,
      };

    case UPDATE_ADVANCE_SUCCESS:
      const idx = state.list.findIndex(e => e.id === action.body.id);

      return {
        ...state,
        list: [
          ...state.list.slice(0, idx),
          action.body,
          ...state.list.slice(idx + 1),
        ]
      };

    case UPDATE_ADVANCE_FAILURE:
      return {
        ...state,
        errors: action.body,
      };

    case UPDATE_ADVANCE_FINISH:
      return {
        ...state,
        updatingAdvance: false,
      };

      case VALIDATE_ADVANCE_REQUEST:
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
