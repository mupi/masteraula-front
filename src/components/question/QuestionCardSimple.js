import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardFooter, CardBody, CardHeader, Badge,
} from 'reactstrap';
import { getCleanExtractStatement } from 'helpers/question';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const getQuoteSeparator = (i, length) => {
  if (i !== length - 1) {
    return ', ';
  }
  return '';
};

const QuestionCardSimple = (props) => {
  const {
    question, button,
  } = props;
  const extractStatement = getCleanExtractStatement(question.statement);
  const tagList = question.tags.concat(question.topics);

  return (
    <Card className="h-100 question-card__full">

      <CardHeader className="question-card__header text-left">
        <div className="d-flex question-card__id align-items-center">
          <div>
            { !question.source && (<FontAwesomeIcon className="question-card__authorship" icon="graduation-cap" />)}
            { ` Questão N° ${question.id}`}
          </div>
        </div>
        <div className="question-card__info-section">
          {question.disciplines && question.disciplines.map(discipline => <Badge className="question-card__info-section-item--pink" key={`${discipline.id}-${discipline.name}`} color="success" pill>{discipline.name.trim()}</Badge>)}
          {question.teaching_levels && question.teaching_levels.map(teachingLevel => <Badge key={`${teachingLevel.id}-${teachingLevel.name}`} color="success" pill>{teachingLevel.name.trim()}</Badge>)}
        </div>
        <p className="question-card__more-info">
          {question.learning_objects && question.learning_objects.length > 0 ? (
            <span className="question-card__number-learning-obj">
              <FontAwesomeIcon icon="image" />
              {' '}
              {question.learning_objects.length}
              {' '}
              {' | '}
            </span>
          ) : ''}
          {question.source && (
          <span
            className="question-card__filter-link"
          >
            {question.source}
          </span>
          )
          }
          {' '}
          {question.year && (
          <span
            className="question-card__filter-link"
          >
            {question.year}
          </span>
          )
          }
          <span className="question-card__more-info--lightgray hidden">
            {' | '}
          </span>
          <span className="question-card__more-info--lightgray hidden">
            {'autor: '}
          </span>
          {
            (tagList.length > 0) ? (
              <span className="question-card__more-info--lightgray">
                {' | '}
                tags:
                {' '}
              </span>
            ) : ''}
          {tagList && tagList.map((tag, i) => (
            /* eslint-disable react/no-array-index-key */
            <span key={i} className="question-card__tag question-card__info-section-item--italic">
              {tag.name}
              { getQuoteSeparator(i, tagList.length)}
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
      {button && (
      <CardFooter className="document-card__footer">
        {button}
      </CardFooter>
      )}
    </Card>
  );
};

QuestionCardSimple.propTypes = {
  question: PropTypes.shape({}).isRequired,
  activeDocument: PropTypes.shape({}),
};

QuestionCardSimple.defaultProps = {
  activeDocument: null,
};


export default QuestionCardSimple;
