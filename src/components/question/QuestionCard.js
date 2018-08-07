import React from 'react';
import {
  Button, Card, CardImg, CardBody, Row,
} from 'reactstrap';
import AddQuestionButton from 'components/buttons/AddQuestionButton';

import imageCard from 'assets/img/home/question-card.jpg';
import DisciplineList from 'components/disciplines/DisciplineList';
import TagList from 'components/tags/TagList';
import { Link } from 'react-router-dom';
import QuestionAuthor from './QuestionAuthor';
import QuestionSourceYear from './QuestionSourceYear';

const QuestionCard = ({
id, disciplines, source, year, statement, urlImage = '', author, teaching_levels, addQuestion, removeQuestion}) => {
  const handleAddQuestionButton = (e) => {
    console.log(id);
  //  addQuestion(id);
  };


  return(
  <Card className={urlImage !== '' ? 'h-10 image-card' : 'h-100'}>
    { urlImage !== '' ? <CardImg className="question-card__image" top width="100%" src={imageCard} alt="Card image cap" /> : null }
    <CardBody className="question-card__body">
      <Row>
        <DisciplineList list={disciplines} />
      </Row>
      <Row>
        <QuestionSourceYear source={source} year={year} />
      </Row>
      { !urlImage
        ? (
          <Row>
            <TagList list={teaching_levels} styleTag="question-info teaching-level" />
          </Row>
        ) : null
			}

      <div className="l-question-card-text">
        <p className="question-info__more-info">
          Autor:
          <QuestionAuthor author={author} styleTag="question-info__author" />
        </p>
        <p className="question-info__more-info">
          {' '}
          { statement.substring(0, 150) }
          {' '}
          {statement.length >= 150 && (
          <span>
...
          </span>
          )}
        </p>
      </div>
      <Link to={`/view-question/${id}`}>
        <Button className="question-card__btn">
          Ver mais
        </Button>
      </Link>

      <AddQuestionButton
        questionId={id}
        customClass="question-card__btn"
        nameButton="Adicionar"
        onClick={e => handleAddQuestionButton(e)}
      />
      
    </CardBody>
  </Card>
  );
};
export default QuestionCard;
