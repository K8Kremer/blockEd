import { UPDATE_RECORD} from '../actions';

export default function (state = false, action){
  if(action.error){
    return (action.error);
  }
  switch(action.type){
  
    case UPDATE_RECORD:
      return true;
    default:
      return state;
  }
}