import React from 'react';
import { BackdropWrap } from './styles';

const Backdrop = (props) => {
    
    return (
        <BackdropWrap showBackdrop={props.show} onClick={props.hide}/>
    )
}

export default Backdrop;