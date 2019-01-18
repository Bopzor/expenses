import { combineReducers } from 'redux';

import expenses from './expenses';
import advances from './advances';

const rootReducer = combineReducers({
  expenses,
  advances,
})

export {
  rootReducer,
};
