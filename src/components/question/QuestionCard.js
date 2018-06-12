import React  from 'react';
import {Button, Card, CardBlock, CardTitle, CardImg, CardBody, CardText, CardSubtitle } from 'reactstrap';
import imageCard from "../../img/home/question-card.jpg";
import DisciplineList from "./../disciplines/DisciplineList"

const QuestionCard = ({disciplines, source, year, extract, urlImage}) =>
			<Card>
			  <CardImg top width="100%" src={imageCard} alt="Card image cap" />
			  <CardBody>
			    <CardTitle>
						<DisciplineList list={disciplines} />
					</CardTitle>
			    <CardSubtitle><span className="top-label-question source-name">{source} {year}</span></CardSubtitle>
			    <CardText>{extract}</CardText>
			    <Button className="buttonCard">Ver mais</Button>
					<Button className="buttonCard">Adicionar</Button>
			  </CardBody>
			</Card>

export default QuestionCard;
