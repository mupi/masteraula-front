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

const isQuestionAdded = (activeDocument, id) => {
  if (activeDocument) {
    const questionAdded = activeDocument.questions.filter(question => question.question === id)
    return (questionAdded.length > 0)
  }
  return false;
}

const QuestionCard = ({
  id, disciplines, source, year, statement, urlImage = '', author, teaching_levels,
  toggleModal, modal, activeDocument, addSelectedQuestion}) => {
  return (
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
          ) : null}

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

        {!isQuestionAdded(activeDocument, id) ? (
          <AddQuestionButton
            questionId={id}
            customClass="question-card__btn"
            nameButton="Adicionar"
            toggleModal={toggleModal}
            modal={modal}
            activeDocument={activeDocument}
            addSelectedQuestion={addSelectedQuestion}
          />
        ) : (
          <span className="btn question-card__added">
            <i className="fa fa-check-circle btn__icon" />
            Adicionada
          </span>
        )}

      </CardBody>
    </Card>
  );
};
export default QuestionCard;
