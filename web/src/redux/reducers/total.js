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
          totalCommon: action.body.totalCommon === null ? 0 : parseInt(action.body.totalCommon),
          nils: {
            expenses: action.body.nils.expenses === null ? 0 : parseInt(action.body.nils.expenses),
            advances: action.body.nils.advances === null ? 0 : parseInt(action.body.nils.advances),
            total: action.body.nils.total,
          },
          vio: {
            expenses: action.body.vio.expenses === null ? 0 : parseInt(action.body.vio.expenses),
            advances: action.body.vio.advances === null ? 0 : parseInt(action.body.vio.advances),
            total: action.body.vio.total,
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
