import accountReducer from './accountReducer';
import networkReducer from './networkReducer';
import contractReducer from './contractReducer';
import hashReducer from './hashReducer';
import transactionReducer from './transactionReducer';
import indexReducer from './indexReducer';
import issuedRecordsReducer from './issuedRecordsReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  account: accountReducer,
  network: networkReducer,
  contract: contractReducer,
  docHash: hashReducer,
  transaction: transactionReducer,
  index: indexReducer,
  issuedRecords: issuedRecordsReducer
})

export default rootReducer