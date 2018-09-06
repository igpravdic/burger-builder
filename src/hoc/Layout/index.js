import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import { Main } from './styles';
import Toolbar from '../../components/Navigation/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    showSideDrawerHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    showSideDrawerToggleHandler = () => {
        this.setState({ showSideDrawer: !this.state.showSideDrawer })
    }
    render(){
        return(
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    sidedrawerhandler={this.showSideDrawerToggleHandler}/>
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    hide={this.showSideDrawerHandler} 
                />
                <Main className="wrapper">
                    <Container>
                        {this.props.children}
                    </Container>
                </Main>
            </Aux>
        )
    };
    
}
const mapStateToProps = state => {
    return{
        isAuthenticated: state.aut.token !== null
    }
}
export default connect(mapStateToProps)(Layout);