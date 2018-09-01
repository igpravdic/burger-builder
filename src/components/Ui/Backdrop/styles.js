import styled from 'styled-components';

export const BackdropWrap = styled.div`
    display: ${props => props.showBackdrop ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
`