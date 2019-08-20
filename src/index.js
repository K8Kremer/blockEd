import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import{ Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reducers from './reducers'
import AdminIssueTrans from './components/AdminIssueTrans';
import AdminSuccess from './components/AdminSuccess';
import AdminVerify from './components/AdminVerify';
import 'bootstrap/dist/css/bootstrap.min.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render((
  <Provider store={createStoreWithMiddleware(reducers, composeWithDevTools())}>
  <BrowserRouter>

      <Switch>
        <Route exact path='/admin/issue' component={AdminIssueTrans} />
        <Route exact path='/admin/success' component={AdminSuccess} />
        <Route exact path='/admin/verify' component={AdminVerify} />
      </Switch>
  
  
</BrowserRouter>
</Provider>
), document.getElementById('root'));



