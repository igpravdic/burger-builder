import React from 'react';
import { SideDrawerWrap } from './styles';
import Logo from '../../Logo';
import NavigationItems from '../NavigationItems';
import Backdrop from '../../Ui/Backdrop';
import Aux from '../../../hoc/Aux';

const SideDrawer = (props) => {
    let sideDrawerClass = 'open';
    if(!props.open){
        sideDrawerClass = 'close';
    }
    return(
        <Aux>
            <Backdrop show={props.open} hide={props.hide}/>
            <SideDrawerWrap className={sideDrawerClass}>
                <Logo />
                <nav>
                    <NavigationItems />
                </nav>
            </SideDrawerWrap>
        </Aux>
    );
}

export default SideDrawer;