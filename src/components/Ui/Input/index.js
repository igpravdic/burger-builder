import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const Cinput = (props) => {
    let inputElement = null;

    switch (props.elementType){
        case ('input'):
            inputElement = <Input valid={props.invalid} {...props.elementConfig} onChange={props.changed} value={props.value} />;
            break;
        case ('textarea'):
            inputElement = (
                <textarea 
                    {...props.elementConfig}
                    onChange={props.changed} 
                    value={props.value} />
            );
            break;
        case ('select'):
            inputElement = (
                <Input 
                    type="select" 
                    value={props.value}
                    onChange={props.changed}
                    >
                    {props.elementConfig.options.map( option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </Input>
            )
            break;
        default:
            inputElement = <Input {...props.elementConfig} value={props.value} />;
    }
    return(
        <div>
            <FormGroup>
                <Label>{props.label}</Label>
                {inputElement}
            </FormGroup>
        </div>
    )
}

export default Cinput;