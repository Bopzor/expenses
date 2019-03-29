import moment from 'moment';

import { myFetch } from '../../utilities';

const BASE_URL = `${process.env.REACT_APP_API_URL}/total`;

// GET TOTAL:
export const GET_TOTAL_REQUEST = 'GET_TOTAL_REQUEST';
export const GET_TOTAL_SUCCESS = 'GET_TOTAL_SUCCESS';
export const GET_TOTAL_FAILURE = 'GET_TOTAL_FAILURE';
export const GET_TOTAL_FINISH = 'GET_TOTALS_FINISH';

const getTotal = {
  REQUEST: () => ({
    type: GET_TOTAL_REQUEST,
  }),
  SUCCESS: (total) => ({
    type: GET_TOTAL_SUCCESS,
    body: total,
  }),
  FAILURE: (error) => ({
    type: GET_TOTAL_FAILURE,
    body: error,
  }),
  FINISH: () => ({
    type: GET_TOTAL_FINISH,
  }),
};

export const fetchTotal = (dateFilter = undefined) => (dispatch) => {
  let url = BASE_URL;

  if (dateFilter) {
    url += `?year=${moment(dateFilter, 'MM-YYYY').format('YYYY')}&month=${moment(dateFilter, 'MM-YYYY').format('M')}`;
  }

  dispatch(getTotal.REQUEST());

  return myFetch(url)
    .then(
      (total) => dispatch(getTotal.SUCCESS(total)),
      (error) => dispatch(getTotal.FAILURE(error))
    )
    .then(() => dispatch(getTotal.FINISH()));
};
