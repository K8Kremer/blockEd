import accountReducer from './accountReducer';
import networkReducer from './networkReducer';
import contractReducer from './contractReducer';
import hashReducer from './hashReducer';
import transactionReducer from './transactionReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  account: accountReducer,
  network: networkReducer,
  contract: contractReducer,
  docHash: hashReducer,
  transaction: transactionReducer
})

export default rootReducer