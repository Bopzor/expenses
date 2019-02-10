import {
  GET_TOTAL_REQUEST,
  GET_TOTAL_SUCCESS,
  GET_TOTAL_FAILURE,
  GET_TOTAL_FINISH,
} from '../actions';

const total = (state = { fetchingTotal: false, error: null, total: {} }, action) => {
  switch (action.type) {

    case GET_TOTAL_REQUEST:
      return {
        ...state,
        fetchingTotal: true,
        error: null,
      };

    case GET_TOTAL_SUCCESS:
      return {
        ...state,
        total: {
          nils: {
            expenses: action.body.nils[0].expenses === null ? 0 : parseInt(action.body.nils[0].expenses),
            advances: action.body.nils[1].advances === null ? 0 : parseInt(action.body.nils[1].advances),
          },
          vio: {
            expenses: action.body.vio[0].expenses === null ? 0 : parseInt(action.body.vio[0].expenses),
            advances: action.body.vio[1].advances === null ? 0 : parseInt(action.body.vio[1].advances),
          },
        }
      };

    case GET_TOTAL_FAILURE:
      return {
        ...state,
        error: action.body,
      };

    case GET_TOTAL_FINISH:
      return {
        ...state,
        fetchingTotal: false,
      };

    default:
      return state;
  }
};

export default total;
