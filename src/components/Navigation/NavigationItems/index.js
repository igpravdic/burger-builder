import React from 'react';
import {NavigationItemsWrap} from './styles';
import NavigationItem from '../NavigationItem';
const NavigationItems = (props) => (
    <NavigationItemsWrap>
        <NavigationItem link="/">Burgers</NavigationItem>
        <NavigationItem link="/checkout">Checkout</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
    </NavigationItemsWrap>
);

export default NavigationItems;