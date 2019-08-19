import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import App from './App';
import AdminIssueTrans from './components/AdminIssueTrans';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter>

      <Switch>
        <Route exact path='/admin/issue' component={AdminIssueTrans} />
      </Switch>
  
  
</BrowserRouter>, document.getElementById('root'));



