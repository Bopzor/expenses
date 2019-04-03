import { combineReducers } from 'redux';

import { expenses } from './expenses';
import { advances } from './advances';
import { total } from './total';

export const rootReducer = combineReducers({
  expenses,
  advances,
  total,
});
