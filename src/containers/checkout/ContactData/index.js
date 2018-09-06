import React, {Component} from 'react';
import axios from '../../../axios-orders';
import { Button, Form, FormGroup } from 'reactstrap';
import Spinner from '../../../components/Ui/Spinner';
import Input from '../../../components/Ui/Input';
import withErrorHandler from '../../../hoc/withErrorHandler';
import { purchaseBurger } from '../../../actions/action_order';
import { checkValidity } from '../../../helpers';

import { connect } from 'react-redux';

class ContactData extends Component{
    state = {
        name: 'Igor',
        email: 'igor@vollo.net',
        address: {
            street: 'street 12',
            postalCode: '10000'
        },
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 22
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [ 
                        { value: 'fastest', displayValue: 'Fastest'},
                        { value: 'normal', displayValue: 'Normal'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            }
        },
        isFormValid: false
    }
    orderHandler = (event) => {
        event.preventDefault();
        //this.setState({ loading: true })
        //alert(this.state.loading);
        const formData = {}
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(this.props.token, order);
        
    }
    
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        updatedFormElement.touched = true;
        
        let isFormValid = true;
        for (let inputIdentifier in updatedOrderForm){
            isFormValid = updatedOrderForm[inputIdentifier].valid && isFormValid;
        }
        this.setState({ orderForm: updatedOrderForm, isFormValid: isFormValid });
    }
    render(){
        let formElArray = [];
        for (let key in this.state.orderForm){
            formElArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <Form onSubmit={this.orderHandler}>
                {formElArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value }
                        invalid={formElement.config.valid}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                
                
                <FormGroup>
                    <Button disabled={!this.state.isFormValid}>Submit</Button>
                </FormGroup>
            </Form>
        );
        if(this.props.loading){
            form = <Spinner />;
        }
        return(
            <div>
                <h2>Enter your contact details!</h2>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        ings: state.ing.ingredients,
        price: state.ing.totalPrice,
        loading: state.ord.loading,
        token: state.aut.token,
        userId: state.aut.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: (token, orderData) => dispatch(purchaseBurger(token, orderData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData, axios));