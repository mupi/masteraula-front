import React  from 'react';
import {Button, Card, CardBlock, CardTitle, CardImg, CardBody, CardText, CardSubtitle } from 'reactstrap';
import imageCard from "assets/img/home/question-card.jpg";
import DisciplineList from "components/disciplines/DisciplineList"
import QuestionAuthor from "./QuestionAuthor"
import QuestionSourceYear from "./QuestionSourceYear"
import { Link, Route } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';

const QuestionCard = ({disciplines, source, year, extract, urlImage, author}) =>
			<Card>
				{ urlImage != "" ? <CardImg top width="100%" src={imageCard} alt="Card image cap" /> : null }
			  <CardBody>
			    <CardTitle>
						<DisciplineList list={disciplines} />
					</CardTitle>
			    <div className="card-subtitle">
							<QuestionSourceYear styleTag="top-label-question source-name" source={source} year={year}/>
					</div>
			    <div className="card-text">
						<p className="info-question-card">Autor: <QuestionAuthor author={author}/></p>
						<p className="info-question-card">	{extract}</p>
					</div>
			    <Button className="buttonCard"><Link to="/view-question">Ver mais</Link></Button>
					<Button className="buttonCard"><i className="fa fa-plus-circle"></i> Adicionar</Button>
			  </CardBody>
			</Card>

export default QuestionCard;
