import getWeb3 from '../utils/getWeb3';

export const SET_ACCOUNT = 'set_account';


export function setAccount(account){
  console.log('action')
  return{
    type: SET_ACCOUNT,
    payload: account
  }
}