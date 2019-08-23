import { WRITE_TRANSACTION} from '../actions';

export default function (state = {}, action){
  if(action.error){
    return (action.error);
  }
  switch(action.type){
   
    case WRITE_TRANSACTION:
        console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
}