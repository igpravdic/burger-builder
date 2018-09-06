import React, { Component } from 'react';
import { connect } from 'react-redux';
import './theme/globalStyle';
//import logo from './logo.svg';
import { Route, Switch, withRouter, Redirect} from 'react-router-dom';

import Layout from './hoc/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Logout from './containers/Auth/Logout';

import { authCheckState } from './actions/action_auth';
import asyncComponent from './hoc/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/checkout');
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth');
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders');
})


class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSign()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" exact component={asyncAuth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>
    );
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
            <Route path="/checkout" component={asyncCheckout}/>
            <Route path="/orders" exact component={asyncOrders}/>
            <Route path="/logout" exact component={Logout}/>
            <Route path="/auth" exact component={asyncAuth}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <Layout>
          {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.aut.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSign: () => dispatch(authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
