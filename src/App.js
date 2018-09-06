import React, { Component } from 'react';
import { connect } from 'react-redux';
import './theme/globalStyle';
//import logo from './logo.svg';
import { Route, Switch, withRouter, Redirect} from 'react-router-dom';

import Layout from './hoc/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/checkout';
import Orders from './containers/Orders';
import Auth from './containers/Auth';
import Logout from './containers/Auth/Logout';

import { authCheckState } from './actions/action_auth';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSign()
  }

  
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" exact component={Auth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>
    );
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" exact component={Orders}/>
            <Route path="/logout" exact component={Logout}/>
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
