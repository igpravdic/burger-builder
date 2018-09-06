import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {logout} from '../../../actions/action_auth';


class Logout extends Component {

    componentDidMount () {
        this.props.onUserLogout();
    }

    render() {
        return <Redirect to="/"/>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUserLogout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);