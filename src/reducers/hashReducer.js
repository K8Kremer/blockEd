import { WRITE_HASH } from '../actions';

export default function(state = {}, action){
  if(action.error){
    return (action.error);
  }
  switch(action.type){
    case WRITE_HASH:
      return action.payload;
    default:
      return state;
  }
}