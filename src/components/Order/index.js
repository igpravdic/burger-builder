import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Badge } from 'reactstrap';
import { connect } from 'react-redux';
import { deleteOrder } from '../../actions/action_order';
class order extends Component{
    
    render(){
        const divStyle = {
            maxWidth: '300px',
            margin: '0 15px'
        };
        
        const ingredients = [];
    
        for (let ingredientName in this.props.ingredients ){
            ingredients.push({
                name: ingredientName,
                amount: this.props.ingredients[ingredientName]
            })
        }
    
        const ingredientsOutput = ingredients.map(ig => {   
            return (
                <span key={ig.name} style={{ textTransform: 'capitalize', minWidth: '100px'}}>
                    <Badge style={{ marginRight: '3px' }}color="primary">{ig.name} <Badge pill>{ig.amount}</Badge></Badge>
                </span>    
            )
        })
        return(
            <Card style={divStyle}>
                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                <CardBody>
                <CardTitle>Order number: 1</CardTitle>
                <CardSubtitle>Ingredients: <div>{ingredientsOutput}</div></CardSubtitle>
                <CardText>Price: <strong>USD {Number.parseFloat(this.props.price).toFixed(2)}</strong></CardText>
                <Button color="danger" onClick={() => this.props.delOrder(this.props.token, this.props.ordId,this.props.userId)}>Delete</Button>
                </CardBody>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.aut.token,
        userId: state.aut.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        delOrder: (token, orderId, userId) => dispatch(deleteOrder(token,orderId,userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(order);