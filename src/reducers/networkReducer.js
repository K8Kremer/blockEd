import { SET_DEPLOYED_NETWORK } from '../actions';

export default function(state = {}, action){
  if(action.error){
    return (action.error);
  }
  switch(action.type){
    case SET_DEPLOYED_NETWORK:
      return action.payload;
    default:
      return state;
  }
}