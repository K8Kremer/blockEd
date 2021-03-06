import { SET_ACCOUNT } from '../actions';

export default function (state = {}, action){
  if(action.error){
    return (action.error);
  }
  switch(action.type){
    case SET_ACCOUNT:
      return action.payload;
    default:
      return state;
  }
}