import React, { Component } from 'react';
import './theme/globalStyle';
//import logo from './logo.svg';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/checkout';
import Orders from './containers/Orders';

class App extends Component {
  render() {
    return (
      <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" exact component={Orders}/>
            <Route path="/" exact component={BurgerBuilder}/>
          </Switch>
      </Layout>
    );
  }
}

export default App;
