import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup } from 'reactstrap';
import Input from '../../components/Ui/Input';
import  { FormWrap } from './styles';
import Spinner from '../../components/Ui/Spinner';
import { auth, setAuthRedirectPath } from '../../actions/action_auth';
import { checkValidity } from '../../helpers';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignedUp: true
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.redirectPath !== '/'){
            this.props.setAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    submitFormHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignedUp );
    }

    switchAuthModeHandler = () => {
        this.setState({ isSignedUp: !this.state.isSignedUp })
    }

    render () {
        let formElArray = [];
        for (let key in this.state.controls){
            formElArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = (
            <Form onSubmit={this.submitFormHandler}>
                {formElArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value }
                        invalid={formElement.config.valid}
                        touched={formElement.config.touched}
                        changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
                ))}
                
                
                <FormGroup>
                    <Button color="primary">{this.state.isSignedUp ? 'Sign Up' : 'Sign In'}</Button>
                </FormGroup>
            </Form>
        );

        if(this.props.loading){
            form = <Spinner />;
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = <p>{this.props.error.message}</p>;
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.redirectPath} />;
        }

        return (
            <FormWrap>
                {authRedirect}
                {errorMessage}
                {form}
                <Button onClick={this.switchAuthModeHandler}>{this.state.isSignedUp ? 'Already Signed Up? Sign In.' : 'Dont have account? Sign up.'}</Button>
            </FormWrap>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        loading: state.aut.loading,
        error: state.aut.error,
        isAuthenticated: state.aut.token !== null,
        buildingBurger: state.ing.building,
        redirectPath: state.aut.authRedirectPath
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignedUp) => dispatch(auth(email, password, isSignedUp)),
        onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);