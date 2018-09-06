import React, { Component } from 'react';
import { ModalWrap } from './styles';
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop'

class Modal extends Component {
    //console.log(props.show);
    shouldComponentUpdate(nextProps, nextState){
        //console.log('test');
        return nextProps.showModal !== this.props.showModal || nextProps.children !== this.props.children;
    }
    componentWillUpdate(){
        //console.log('[Modal] WillUpdate');
    }
    render(){
        return (
            <Aux>
                <Backdrop show={this.props.showModal} hide={this.props.hideModal}/>
                <ModalWrap show={this.props.showModal}>
                    {this.props.children}
                </ModalWrap>
            </Aux>
        )
    }
}

export default Modal;