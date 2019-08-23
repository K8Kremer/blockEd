import _ from 'lodash';
import { FETCH_ISSUED_RECORDS } from '../actions'

export default function (state = [], action){
  if(action.error){
    return action.error;
  }
  switch (action.type){
    case FETCH_ISSUED_RECORDS:
      console.log(action.payload)
      return _.mapKeys(action.payload.data.records, '_id');
    default:
      return state;
  }
}