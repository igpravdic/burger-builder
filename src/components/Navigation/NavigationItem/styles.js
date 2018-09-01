import styled from 'styled-components';

export const NavigationItemWrap = styled.li`
    margin: 0;
    a{
        color: #8f5c2c;
        width: 100%;
        &:hover,&:active,&.active{
            color: #40A4c8;
        }
    }
    @media (min-width: 500px){
        margin: 0;
        display: flex;
        box-sizing: border-box;
        height: 100%;
        align-items: center;
        a{
            color: #fff;
            text-decoration: none;
            height: 100%;
            padding: 16px 10px;
            border-bottom: 4px solid transparanet;
            box-sizing: border-box;
            display: block;
            &:hover,&:active,&.active{
                background-color: #8F5c2c;
                border-bottom: 4px solid #40A4c8;
                color: white;
            }
        }
    }
`