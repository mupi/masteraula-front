import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, CardFooter, CardImg, CardBody, CardHeader,
} from 'reactstrap';
import AddQuestionButton from 'components/buttons/AddQuestionButton';
import imageCard from 'assets/img/home/question-card.jpg';
import { Link } from 'react-router-dom';
import { isQuestionAdded, getCleanExtractStatement } from 'helpers/question';
import QuestionAuthor from './QuestionAuthor';


const getQuoteSeparator = (i, length) => {
  if (i !== length - 1) {
    return ', ';
  }
  return '';
};

const QuestionCard = (props) => {
  const {
    question, urlImage, activeDocument, addSelectedDisciplineFilter, addSelectedTeachingLevelFilter,
  } = props;
  const extractStatement = getCleanExtractStatement(question.statement);
  return (
    <Card className={urlImage !== '' ? 'h-10 image-card' : 'h-100 question-card__full'}>
      { urlImage !== '' ? <CardImg className="question-card__image" top width="100%" src={imageCard} alt="Card image cap" /> : null }

      <CardHeader className="question-card__header">
        <div className="question-card__info-section">
          {question.disciplines && question.disciplines.map(discipline => (
            <Button
              key={discipline.id}
              className="question-card__info-section-item question-card__info-section-item--pink"
              onClick={() => addSelectedDisciplineFilter(discipline.id)}
            >
              {discipline.name}
            </Button>
          ))}
          {question.teaching_levels && question.teaching_levels.map(teachingLevel => (
            <Button
              key={teachingLevel.id}
              className="question-card__info-section-item question-card__info-section-item--green"
              onClick={() => addSelectedTeachingLevelFilter(teachingLevel.id)}
            >
              {teachingLevel.name}
            </Button>
          ))}
        </div>
        <p className="question-card__more-info">
          {question.source}
          {' '}
          {question.year}
          {' | '}
          <span className="question-card__more-info--lightgray">
            autor:
          </span>
          <QuestionAuthor author={question.author} styleTag="question-card__info-section-item--italic" />
          {
            (question.tags.length > 0) ? (
              <span className="question-card__more-info--lightgray">
                {'| '}
                tags:
                {' '}
              </span>
            ) : ''}
          {question.tags && question.tags.map((tag, i) => (
            <span key={i} className="question-card__tag question-card__info-section-item--italic">
              {tag.name}
              { getQuoteSeparator(i, question.tags.length)}
            </span>
          ))}
        </p>
      </CardHeader>

      <CardBody className="question-card__body">
        <div className="l-question-card-text">
          <p className="question-card__extract">
            { (extractStatement.length >= 150) ? ` ${extractStatement.substring(0, 150)}${' ...'}` : extractStatement }
          </p>
        </div>
      </CardBody>
      <CardFooter className="question-card__footer">
        <Link to={`/view-question/${question.id}`}>
          <Button className="question-card__btn">
            Ver questão
          </Button>
        </Link>

        {!isQuestionAdded(activeDocument, question.id) ? (
          <AddQuestionButton
            questionId={question.id}
            customClass="question-card__btn "
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
      </CardFooter>
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
