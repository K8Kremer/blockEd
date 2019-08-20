import accountReducer from './accountReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  account: accountReducer
})

export default rootReducer