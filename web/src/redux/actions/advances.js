import myFetch from '../../myFetch';

const BASE_URL = 'http://192.168.0.17:4242/advances';

// GET ADVANCES:
export const GET_ADVANCES_REQUEST = 'GET_ADVANCES_REQUEST';
export const GET_ADVANCES_SUCCESS = 'GET_ADVANCES_SUCCESS';
export const GET_ADVANCES_FAILURE = 'GET_ADVANCES_FAILURE';
export const GET_ADVANCES_FINISH = 'GET_ADVANCES_FINISH';

const getAdvances = {
  REQUEST: () => ({
    type: GET_ADVANCES_REQUEST,
  }),
  SUCCESS: advances => ({
    type: GET_ADVANCES_SUCCESS,
    body: advances,
  }),
  FAILURE: error => ({
    type: GET_ADVANCES_FAILURE,
    body: error,
  }),
  FINISH: () => ({
    type: GET_ADVANCES_FINISH,
  }),
};

export const fetchAdvances = (dateFilter = undefined) => dispatch => {
  const url = `BASE_URL?year=${dateFilter.getFullYear()}&month=${dateFilter.getMonth()}`;

  dispatch(getAdvances.REQUEST());

  return myFetch(url)
    .then(
      advances => dispatch(getAdvances.SUCCESS(advances)),
      error => dispatch(getAdvances.FAILURE(error)),
    )
    .then(() => dispatch(getAdvances.FINISH()));
};

// ADD ADVANCE:
export const ADD_ADVANCE_REQUEST = 'ADD_ADVANCE_REQUEST';
export const ADD_ADVANCE_SUCCESS = 'ADD_ADVANCE_SUCCESS';
export const ADD_ADVANCE_FAILURE = 'ADD_ADVANCE_FAILURE';
export const ADD_ADVANCE_FINISH = 'ADD_ADVANCEE_FINISH';

const addAdvance = {
  REQUEST: () => ({
    type: ADD_ADVANCE_REQUEST,
  }),
  SUCCESS: advance => ({
    type: ADD_ADVANCE_SUCCESS,
    body: advance,
  }),
  FAILURE: error => ({
    type: ADD_ADVANCE_FAILURE,
    body: error,
  }),
  FINISH: () => ({
    type: ADD_ADVANCE_FINISH,
  }),
};

export const createadvance = advance => dispatch => {
  const url = BASE_URL;
  const opts = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(advance),
  };

  dispatch(addAdvance.REQUEST());

  return myFetch(url, opts)
    .then(
      advance=> dispatch(addAdvance.SUCCESS(advance)),
      error => dispatch(addAdvance.FAILURE(error)),
    )
    .then(() => dispatch(addAdvance.FINISH()));
};

// REMOVE ADVANCE:
export const REMOVE_ADVANCE_REQUEST = 'REMOVE_ADVANCE_REQUEST';
export const REMOVE_ADVANCE_SUCCESS = 'REMOVE_ADVANCE_SUCCESS';
export const REMOVE_ADVANCE_FAILURE = 'REMOVE_ADVANCE_FAILURE';
export const REMOVE_ADVANCE_FINISH = 'REMOVE_ADVANCEE_FINISH';

const removeAdvance = {
  REQUEST: () => ({
    type: REMOVE_ADVANCE_REQUEST,
  }),
  SUCCESS: id => ({
    type: REMOVE_ADVANCE_SUCCESS,
    body: id,
  }),
  FAILURE: error => ({
    type: REMOVE_ADVANCE_FAILURE,
    body: error,
  }),
  FINISH: () => ({
    type: REMOVE_ADVANCE_FINISH,
  }),
};

export const deleteAdvance = id => dispatch => {
  const url = BASE_URL + '/' + id;
  const opts = {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };

  dispatch(removeAdvance.REQUEST());

  return myFetch(url, opts)
    .then(
      () => dispatch(removeAdvance.SUCCESS(id)),
      error => dispatch(removeAdvance.FAILURE(error)),
    )
    .then(() => dispatch(removeAdvance.FINISH()));
};


// UPDATE ADVANCE:
export const UPDATE_ADVANCE_REQUEST = 'UPDATE_ADVANCE_REQUEST';
export const UPDATE_ADVANCE_SUCCESS = 'UPDATE_ADVANCE_SUCCESS';
export const UPDATE_ADVANCE_FAILURE = 'UPDATE_ADVANCE_FAILURE';
export const UPDATE_ADVANCE_FINISH = 'UPDATE_ADVANCEE_FINISH';

const updateAdvance = {
  REQUEST: () => ({
    type: UPDATE_ADVANCE_REQUEST,
  }),
  SUCCESS: advance => ({
    type: UPDATE_ADVANCE_SUCCESS,
    body: advance,
  }),
  FAILURE: error => ({
    type: UPDATE_ADVANCE_FAILURE,
    body: error,
  }),
  FINISH: () => ({
    type: UPDATE_ADVANCE_FINISH,
  }),
};

export const editAdvance = advance => dispatch => {
  const url = BASE_URL + '/' + advance.id;
  const opts = {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(advance),
  };

  dispatch(updateAdvance.REQUEST());

  return myFetch(url, opts)
    .then(
      advance => dispatch(updateAdvance.SUCCESS(advance)),
      error => dispatch(updateAdvance.FAILURE(error)),
    )
    .then(() => dispatch(updateAdvance.FINISH()));
};
