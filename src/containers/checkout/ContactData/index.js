import React, {Component} from 'react';
import axios from '../../../axios-orders';
import { Button, Form, FormGroup } from 'reactstrap';
import Spinner from '../../../components/Ui/Spinner';
import Input from '../../../components/Ui/Input';
import withErrorHandler from '../../../hoc/withErrorHandler';

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
        loading: false,
        isFormValid: false
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        //alert(this.state.loading);
        const formData = {}
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderDate: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false})
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false })
            });
    }

    checkValidity(value, rules){
        let isValid = true;

        if(!rules){
            return true;
        }
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }
    
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
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
        if(this.state.loading){
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

export default withErrorHandler(ContactData, axios);