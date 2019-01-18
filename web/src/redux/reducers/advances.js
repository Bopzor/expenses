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
} from '../actions';

const advances = (state = { fetchingAdvances: false, error: null, list: [], addingAdvance: false, removingAdvance: false, updatingAdvance: false }, action) => {
  switch (action.type) {

    case GET_ADVANCES_REQUEST:
      return {
        ...state,
        fetchingAdvances: true,
      };

    case GET_ADVANCES_SUCCESS:
      return {
        ...state,
        list: action.body,
      };

    case GET_ADVANCES_FAILURE:
      return {
        ...state,
        error: action.body,
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
      };

    case ADD_ADVANCE_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.body],
      };

    case ADD_ADVANCE_FAILURE:
      return {
        ...state,
        error: action.body,
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
      };

    case REMOVE_ADVANCE_SUCCESS:
      return {
        ...state,
        list: state.list.filter(e => e.id !== action.body),
      };

    case REMOVE_ADVANCE_FAILURE:
      return {
        ...state,
        error: action.body,
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
        error: action.body,
      };

    case UPDATE_ADVANCE_FINISH:
      return {
        ...state,
        updatingAdvance: false,
      };

    default:
      return state;
  }
};

export default advances;
