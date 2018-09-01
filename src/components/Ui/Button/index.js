import React from 'react';
import { ButtonWrap } from './styles';

const Button = (props) => {
    return(
        <ButtonWrap
            onClick={props.clicked} 
            className={props.buttonClass}>
            {props.children}
        </ButtonWrap>  
    )
}

export default Button;