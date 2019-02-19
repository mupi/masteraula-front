import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Button,
} from 'reactstrap';
import RemoveQuestionButton from 'components/buttons/RemoveQuestionButton';
import { getTeachingLevel, getCleanExtractStatement } from 'helpers/question';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DocumentQuestionItem = (props) => {
  const {
    question, activeDocument, removeSelectedQuestion, readOnly = false,
  } = props;
  const extractStatement = getCleanExtractStatement(question.statement);

  return (
    <div className="c-document__question">

      { question.statement && (
        <Row>
          <Col sm="8" className="c-document__question-image">
            <p className="c-document__question-info-title">
              Questão
              {' '}
              {question.learning_objects && question.learning_objects.length > 0 ? (
                <span className="c-document__question-number-learning-obj">
                  (
                  {' '}
                  <FontAwesomeIcon icon="image" />
                  {' '}
                  {question.learning_objects.length}
                  {' '}
                  )
                </span>
              ) : ''}
              :
            </p>
            <p className="c-document__question-info-statement">
              { (extractStatement.length >= 350) ? ` ${extractStatement.substring(0, 350)}${' ...'}` : extractStatement }
            </p>
            <p className="c-document__question-info-author">
              por:
              {' '}
              {question.author.name}
            </p>
          </Col>
          <Col sm="4" className="c-document__question-info">
            <Row>
              <Col sm="12">
                <p className="c-document__question-info-subtitle">
                  Informações:
                </p>
              </Col>
              <Col sm="12">
                <p className="c-document__question-info-row">
                  Fonte:
                  {' '}
                  <span className="c-document__question-info-detail">{ question.source}</span>
                </p>
                <p className="c-document__question-info-row">
                  Ano:
                  {' '}
                  <span className="c-document__question-info-detail">{ question.year}</span>
                </p>
                <p className="c-document__question-info-row">
                  Dificuldade:
                  {' '}
                  <span className="c-document__question-info-detail">
                    {getTeachingLevel(question.difficulty)}
                  </span>
                </p>
                <p className="c-document__question-info-row">
                  Níveis de Ensino:
                  {' '}
                  {question.teaching_levels && question.teaching_levels.map(level => (
                    <span key={level.id} className="c-document__question-info-detail">
                      {level.name}
                    </span>
                  ))}
                </p>
                <p className="c-document__question-info-row">
                  Disciplinas:
                  {' '}
                  <i>{question.disciplines && question.disciplines.map(discipline => (discipline.name.trim())).join(', ')}</i>
                </p>
                {(!readOnly) && (question.tags || question.topics) && (question.tags.length > 0 || question.topics.length > 0) ? (
                  <p className="c-document__question-info-row">
                  Tags:
                    {' '}
                    <i>{question.tags.concat(question.topics).map(tag => (tag.name.trim())).join(', ')}</i>
                  </p>) : ''}
              </Col>
            </Row>
            { (!readOnly) ? (
              <Row>
                <div className="c-document__question-view-more col-md-12">
                  { (!readOnly) ? (
                    <RemoveQuestionButton
                      questionId={question.id}
                      activeDocumentId={activeDocument.id}
                      removeSelectedQuestion={removeSelectedQuestion}
                      customClass="c-document__btn-remove-question"
                      label={<FontAwesomeIcon icon="trash-alt" />}
                    />) : ' ' }
                  <Link to={`/view-question/${question.id}`}>
                    <Button>
                      <FontAwesomeIcon icon="search" />
                      {' '}
                      <span className="button-text">
                        Ver questão
                      </span>
                    </Button>
                  </Link>
                </div>
              </Row>) : ' ' }
          </Col>
        </Row>
      )}
    </div>
  );
};

DocumentQuestionItem.propTypes = {
  removeSelectedQuestion: PropTypes.func,
};

DocumentQuestionItem.defaultProps = {
  removeSelectedQuestion: f => f,
};

export default DocumentQuestionItem;
