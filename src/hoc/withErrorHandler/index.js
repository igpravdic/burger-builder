import React, { Component }from 'react';
import Aux from '../Aux';
import Modal from '../../components/Ui/Modal';


const withErrorHandler = ( WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentDidMount (){
            this.reqIntercept = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            })
            this.resIntercept = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            })
            //console.log(this.resIntercept);
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqIntercept);
            axios.interceptors.response.eject(this.resIntercept);
        }

        errorConfirmedHandler() {
            this.setState({ error: null })
        }
        render(){
            return(
                <Aux>
                    <Modal
                        onClick={this.errorConfirmedHandler}
                        showModal={this.state.error}>
                        <div>{this.state.error ? this.state.error.message : null}</div>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;