import React, { Component } from 'react';
import {Button, Card, CardBlock, CardTitle, CardImg, CardBody, CardText, CardSubtitle } from 'reactstrap';

class QuestionCard extends Component {
	render(){
		return(
			<Card>
			  <CardImg top width="100%" src="" alt="Card image cap" />
			  <CardBody>
			    <CardTitle>Card title</CardTitle>
			    <CardSubtitle>Card subtitle</CardSubtitle>
			    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
			    <Button>Button</Button>
			  </CardBody>
			</Card>
			)
	}
}

export default QuestionCard;
