import { RECORD_INDEX } from '../actions';

export default function(state = null, action){
  if(action.error){
    return (action.error);
  }
  switch(action.type){
    case RECORD_INDEX:
      return action.payload;
    default:
      return state;
  }
}