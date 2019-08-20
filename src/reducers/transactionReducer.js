import { WRITE_TRANSACTION} from '../actions';

export default function (state = {}, action){
  if(action.error){
    return (action.error);
  }
  switch(action.type){
    case WRITE_TRANSACTION:
      return action.payload;
    default:
      return state;
  }
}