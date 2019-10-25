import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, CardFooter, CardImg, CardBody, CardHeader,
} from 'reactstrap';
import AddQuestionButton from 'components/buttons/AddQuestionButton';
import RemoveQuestionButton from 'components/buttons/RemoveQuestionButton';
import imageCard from 'assets/img/home/question-card.jpg';
import { Link } from 'react-router-dom';
import { isQuestionAdded, getCleanExtractStatement } from 'helpers/question';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const getIdFilter = (list, name) => {
  if (list) {
    const obj = list.filter(item => item.name.toString().trim() === name.toString().trim());
    if (obj.length > 0) return obj[0].id;
  }
  return -1;
};

const handleClick = (e, addFilter, id, name) => {
  e.preventDefault();
  if (name && id === -1) {
    addFilter(id, name);
  } else {
    addFilter(id);
  }
};

const getQuoteSeparator = (i, length) => {
  if (i !== length - 1) {
    return ', ';
  }
  return '';
};

const QuestionCard = (props) => {
  const {
    question, urlImage, activeDocument, addSelectedDisciplineFilter, addSelectedTeachingLevelFilter, addSelectedSourceFilter, addSelectedYearFilter,
    removeSelectedQuestion, sourceFilters, yearFilters,
  } = props;
  const extractStatement = getCleanExtractStatement(question.statement);
  const idSource = question.source ? getIdFilter(sourceFilters, question.source) : null;
  const idYear = question.year ? getIdFilter(yearFilters, question.year) : null;
  const tagList = question.tags.concat(question.topics);

  return (
    <Card className={urlImage !== '' ? 'h-10 image-card' : 'h-100 question-card__full'}>
      { urlImage !== '' ? <CardImg className="question-card__image" top width="100%" src={imageCard} alt="Card image cap" /> : null }

      <CardHeader className="question-card__header">
        <div className="question-card__id">
          { !question.source && (<FontAwesomeIcon icon="graduation-cap" /> )}
          { ` Questão N° ${question.id}`}
        </div>
        <div className="question-card__info-section">
          {question.disciplines && question.disciplines.map(discipline => (
            <Button
              key={discipline.id}
              className="question-card__info-section-item question-card__info-section-item--pink"
              onClick={() => addSelectedDisciplineFilter(discipline.id.toString())}
            >
              <span className="question-card__info-section--complete">{discipline.name}</span>
              <span className="question-card__info-section--substring">{discipline.slug.toUpperCase()}</span>
            </Button>
          ))}
          {question.teaching_levels && question.teaching_levels.map(teachingLevel => (
            <Button
              key={teachingLevel.id}
              className="question-card__info-section-item question-card__info-section-item--green"
              onClick={() => addSelectedTeachingLevelFilter(teachingLevel.id.toString())}
            >
              <span className="question-card__info-section--complete">{teachingLevel.name}</span>
              <span className="question-card__info-section--substring">{teachingLevel.slug.toUpperCase()}</span>
            </Button>
          ))}
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
          <button
            type="button"
            className="question-card__filter-link btn btn-link"
            onClick={(e => handleClick(e, addSelectedSourceFilter, idSource, question.source.toString().trim()))}
          >
            {question.source}
          </button>
          )
          }
          {' '}
          {question.year && (
          <button
            type="button"
            className="question-card__filter-link btn btn-link"
            onClick={(e => handleClick(e, addSelectedYearFilter, idYear, question.year.toString().trim()))}
          >
            {question.year}
          </button>
          )
          }
          <span className="question-card__more-info--lightgray hidden">
            {' | '}
          </span>
          <span className="question-card__more-info--lightgray hidden">
            {'autor: '}
          </span>
          {/* <QuestionAuthor author={question.author} styleTag="question-card__info-section-item--italic" /> */}
          {
            (tagList.length > 0) ? (
              <span className="question-card__more-info--lightgray">
                {' | '}
                tags:
                {' '}
              </span>
            ) : ''}
          {tagList && tagList.map((tag, i) => (
            <span key={i} className="question-card__tag question-card__info-section-item--italic">
              {tag.name}
              { getQuoteSeparator(i, tagList.length)}
            </span>
          ))}
        </p>
        {isQuestionAdded(activeDocument, question.id) ? (
          <div className="question-card__pin">
            <FontAwesomeIcon
              icon="thumbtack"
            />
          </div>
        ) : ('')}
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
          <RemoveQuestionButton
            questionId={question.id}
            activeDocumentId={activeDocument.id}
            removeSelectedQuestion={removeSelectedQuestion}
            customClass="c-question__btn-remove-question"
            label={(
              <span>
                <FontAwesomeIcon icon="minus" className="btn__icon" />
                Remover
              </span>
            )}
            {...props}
          />
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
