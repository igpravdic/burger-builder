import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Badge } from 'reactstrap';
const order = (props) =>{
    const divStyle = {
        maxWidth: '300px',
        margin: '0 15px'
    };
    
    const ingredients = [];

    for (let ingredientName in props.ingredients ){
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
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
            <CardText>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></CardText>
            <Button>Button</Button>
            </CardBody>
        </Card>
    )
}

export default order;