import React  from 'react';
import {Button, Card, CardBlock, CardTitle, CardImg, CardBody, CardText, CardSubtitle, Row } from 'reactstrap';
import imageCard from "assets/img/home/question-card.jpg";
import DisciplineList from "components/disciplines/DisciplineList"
import TagList from "components/tags/TagList"
import QuestionAuthor from "./QuestionAuthor"
import QuestionSourceYear from "./QuestionSourceYear"
import { Link, Route } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';

const QuestionCard = ({disciplines, source, year, extract, urlImage, author, teachingLevels}) =>
			<Card  className= { urlImage !=="" ?"h-10 image-card": "h-100" } >
				{ urlImage !== "" ? <CardImg top width="100%" src={imageCard} alt="Card image cap" /> : null }
			  <CardBody>
			    <Row>
						<DisciplineList list={disciplines} />
					</Row>
							<Row><QuestionSourceYear styleTag="top-label-question source-name" source={source} year={year}/></Row>
							{ urlImage === "" ?
									<Row><TagList list={teachingLevels} styleTag="label-info teaching-level"/></Row>
							 : null
						 	}


			    <div className="card-text">
						<p className="info-question-card">Autor: <QuestionAuthor author={author} styleTag="author-card"/></p>
						<p className="info-question-card">	{extract}</p>
					</div>

			    <Button className="buttonCard"><Link to="/view-question">Ver mais</Link></Button>
					<Button className="buttonCard"><i className="fa fa-plus-circle"></i> Adicionar</Button>
			  </CardBody>
			</Card>

export default QuestionCard;
