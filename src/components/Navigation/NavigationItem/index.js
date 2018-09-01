import React from 'react';
import { NavigationItemWrap } from './styles';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => (
    <NavigationItemWrap>
        <NavLink 
            to={props.link}
            exact
            activeClassName="active">{props.children}</NavLink>    
    </NavigationItemWrap>
);

export default NavigationItem;