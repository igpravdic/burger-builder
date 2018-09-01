import React from 'react';
import { BuildControlWrap, Button, Label } from './styles';

const BuildControl = (props) => {
    return (
        <BuildControlWrap>
            <Button className="less" 
                disabled={props.disabled} 
                onClick={props.removed}>Less</Button>
            <Label>{ props.label}</Label>
            <Button className="more"
                onClick={props.added}>More</Button>    
        </BuildControlWrap>    
    )
}

export default BuildControl;