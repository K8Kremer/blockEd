import { STORE_CONTRACT } from '../actions';

export default function(state = {}, action){
  if(action.error){
    return (action.error);
  }
  switch(action.type){
    case STORE_CONTRACT:
      return action.payload;
    default:
      return state;
  }
}