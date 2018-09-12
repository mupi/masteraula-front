import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, CardImg, CardBody,
} from 'reactstrap';
import AddQuestionButton from 'components/buttons/AddQuestionButton';
import imageCard from 'assets/img/home/question-card.jpg';
import { Link } from 'react-router-dom';
import { isQuestionAdded, getCleanExtractStatement } from 'helpers/question';
import QuestionAuthor from './QuestionAuthor';

const QuestionCard = (props) => {
  const { question, urlImage, activeDocument } = props;
  const extractStatement = getCleanExtractStatement(question.statement);
  return (
    <Card className={urlImage !== '' ? 'h-10 image-card' : 'h-100'}>
      { urlImage !== '' ? <CardImg className="question-card__image" top width="100%" src={imageCard} alt="Card image cap" /> : null }
      <CardBody className="question-card__body">

        <div className="question-card__info-section">
          {question.disciplines && question.disciplines.map(discipline => (
            <span key={discipline.id} className="question-card__info-section-item question-card__info-section-item--pink">
              {discipline.name}
            </span>
          ))}
          <span className="question-card__info-section-item question-card__info-section-item--purple ">
            {question.source}
            {' '}
            {question.year}
          </span>
          {question.teaching_levels && question.teaching_levels.map(teachingLevel => (
            <span key={teachingLevel.id} className="question-card__info-section-item question-card__info-section-item--green">
              {teachingLevel.name}
            </span>
          ))}
        </div>

        <div className="l-question-card-text">
          <p className="question-info__more-info">
            Autor:
            <QuestionAuthor author={question.author} styleTag="question-info__author" />
          </p>
          <p className="question-info__more-info">
            { (extractStatement.length >= 150) ? ` ${extractStatement.substring(0, 150)}${' ...'}` : extractStatement }
          </p>
        </div>

        <Link to={`/view-question/${question.id}`}>
          <Button className="question-card__btn">
            Ver questão
          </Button>
        </Link>

        {!isQuestionAdded(activeDocument, question.id) ? (
          <AddQuestionButton
            questionId={question.id}
            customClass="question-card__btn"
            nameButton="Adicionar"
            activeDocument={activeDocument}
            {...props}
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

QuestionCard.propTypes = {
  question: PropTypes.shape({}).isRequired,
  activeDocument: PropTypes.shape({}),
  urlImage: PropTypes.string,
};

QuestionCard.defaultProps = {
  activeDocument: null,
  urlImage: '',
};


export default QuestionCard;
