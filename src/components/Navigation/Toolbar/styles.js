import styled from 'styled-components';

export const ToolbarWrap = styled.header`
    height: 56px;
    width: 100%;
    background: #703B09;
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    z-index: 90;
    @media (max-width: 500px){
        nav{
            display: none;
        }
    }
`

export const DrawerToggle = styled.div`
    width: 40px;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    box-sizing: border-box;
    cursor: pointer;
    @media (min-width: 500px) {
        display: none;
    }
    div{
        width: 90%;
        height: 3px;
        background-color: white;
    }
`