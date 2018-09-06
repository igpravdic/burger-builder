import React from 'react';
import {NavigationItemsWrap} from './styles';
import NavigationItem from '../NavigationItem';
const NavigationItems = (props) => (
    <NavigationItemsWrap>
        <NavigationItem link="/">Burgers</NavigationItem>
        {props.isAuth ? <NavigationItem link="/checkout">Checkout</NavigationItem> : null }
        {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null }
        {!props.isAuth ?
        <NavigationItem link="/auth">Login</NavigationItem> :
        <NavigationItem link="/logout">Logout</NavigationItem>
        }
    </NavigationItemsWrap>
);

export default NavigationItems;