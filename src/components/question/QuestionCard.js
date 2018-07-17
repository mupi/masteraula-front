import React  from 'react';
import {Button, Card, CardImg, CardBody, Row } from 'reactstrap';
import imageCard from "assets/img/home/question-card.jpg";
import DisciplineList from "components/disciplines/DisciplineList"
import TagList from "components/tags/TagList"
import QuestionAuthor from "./QuestionAuthor"
import QuestionSourceYear from "./QuestionSourceYear"
import { Link } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';

const QuestionCard = ({id, disciplines, source, year, statement, urlImage="", author, teaching_levels}) =>
			<Card className= { urlImage !=="" ?"h-10 image-card": "h-100" } >
				{ urlImage !== "" ? <CardImg top width="100%" src={imageCard} alt="Card image cap" /> : null }
			  <CardBody>
			    <Row>
						<DisciplineList list={disciplines} />
					</Row>
							<Row><QuestionSourceYear styleTag="top-label-question source-name" source={source} year={year}/></Row>
							{ !urlImage ?
									<Row><TagList list={teaching_levels} styleTag="label-info teaching-level"/></Row>
							 : null
						 	}

			    <div className="card-text">
						<p className="info-question-card">Autor: <QuestionAuthor author={author} styleTag="author-card"/></p>
						<p className="info-question-card"> { statement.substring(0, 150) } {statement.length >=150 && <span>...</span>}</p>
					</div>
			    <Link to={"/view-question/" + id}><Button className="buttonCard">Ver mais</Button></Link>
					<Button className="buttonCard"><i className="fa fa-plus-circle"></i> Adicionar</Button>
			  </CardBody>
			</Card>

export default QuestionCard;
