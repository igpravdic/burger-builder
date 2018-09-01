import React from 'react';
import  {LogoWrap, LogoImg } from './styles';
import imageLogo from '../../assets/images/burger-logo.png';

const logo = (props) => (
    <LogoWrap>
        <LogoImg src={imageLogo} className="img-fluid" alt=""/>
    </LogoWrap>
);

export default logo;

