import getWeb3 from '../utils/getWeb3';
import axios from 'axios';

const ROOT_URL = 'http://localhost:8000';

export const SET_ACCOUNT = 'set_account';
export const SET_DEPLOYED_NETWORK = 'set_deployed_network';
export const STORE_CONTRACT = 'store_contract';
export const WRITE_HASH = 'write_hash';
export const WRITE_TRANSACTION = 'write_transaction';
export const RECORD_INDEX = 'record_index';

export function setAccount(account){
  return{
    type: SET_ACCOUNT,
    payload: account
  }
}

export function setDeployedNetwork(network){
  return{
    type: SET_DEPLOYED_NETWORK, 
    payload: network
  }
}

export function storeContract(contract){
  return{
    type: STORE_CONTRACT,
    payload: contract
  }
}

export function writeHash(hash){
  return{
    type: WRITE_HASH,
    payload: hash
  }
}

export function writeTransaction(transaction, hash, index){
  const body = {
    
      index: index, 
      digest: hash,
      valid: 'true', 
      verifiedBy: null, 
      issuedBy: transaction.from
  
  }
  const request = axios.post(`${ROOT_URL}/record`, body);
  return{
    type: WRITE_TRANSACTION,
    payload: request
  }
}

export function recordIndex(index){
  return{
    type: RECORD_INDEX,
    payload: index
  }
}