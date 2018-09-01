import React from 'react';
import { ToolbarWrap, DrawerToggle} from './styles';
import Logo from '../../Logo';
import NavigationItems from '../NavigationItems';

const Toolbar = (props) => {
    return(
        <ToolbarWrap>
            <DrawerToggle onClick={props.sidedrawerhandler}>
                <div></div>
                <div></div>
                <div></div>
            </DrawerToggle>
            <Logo/>
            <nav>
                <NavigationItems />
            </nav>
        </ToolbarWrap>
    )
}

export default Toolbar;