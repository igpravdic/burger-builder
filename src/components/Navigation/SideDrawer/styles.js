import styled from 'styled-components';

export const SideDrawerWrap = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 280px;
    max-width: 70%;
    z-index: 200;
    background-color: #fff;
    padding: 32px 16px;
    box-sizing: border-box;
    transition: transform 0.3s ease-out;
    nav{
        margin-top: 40px;
    }
    @media (min-width: 500px){
        display: none;
    }
    &.open{
        transform: translateX(0);
    }
    &.close{
        transform: translateX(-100%);
    }
`