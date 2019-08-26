import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import{ Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reducers from './reducers'
import PageHeader from './components/PageHeader';
import AdminIssueTrans from './components/AdminIssueTrans';
import AdminSuccess from './components/AdminSuccess';
import AdminVerify from './components/AdminVerify';
import AdminDash from './components/AdminDash';
import Home from './components/Home';
import WebFont from 'webfontloader';
import 'bootstrap/dist/css/bootstrap.min.css';

WebFont.load({
  google: {
    families: [ 'Concert One', 'Comfortaa', 'M PLUS Rounded 1c','cursive', 'sans-serif']
  }
});

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render((
  <Provider store={createStoreWithMiddleware(reducers, composeWithDevTools())}>
  <BrowserRouter>
      <PageHeader />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/admindash' component={AdminDash}/>
        <Route exact path='/issue' component={AdminIssueTrans} />
        <Route exact path='/success' component={AdminSuccess} />
        <Route exact path='/verify' component={AdminVerify} />
      </Switch>
</BrowserRouter>
</Provider>
), document.getElementById('root'));



