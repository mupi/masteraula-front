import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Button,
} from 'reactstrap';
import RemoveQuestionButton from 'components/buttons/RemoveQuestionButton';
import { getTeachingLevel, getCleanExtractStatement } from 'helpers/question';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


/* Document's item options available for Public Document
const options = {
  showViewButton,
  removeOption,
  showTags,
};
*/


const DocumentQuestionItem = (props) => {
  const {
    question, activeDocument, removeSelectedQuestion, options, hideModal, showModal,
  } = props;

  const closeModal = () => {
    hideModal();
  };

  const handleOpenLoginModal = () => {
    // open modal
    const { optionalMessage } = options;
    showModal({
      open: true,
      closeModal,
      optionalMessage,
    }, 'login2');
  };

  const extractStatement = getCleanExtractStatement(question.statement);

  return (
    <div className="c-document__question">

      { question.statement && (
        <Row>
          <Col sm="8" className="c-document__question-image">
            <p className="c-document__question-info-title">
              Questão N°
              {' '}
              {question.id}
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
                { question.source && (
                <p className="c-document__question-info-row">
                  Vestibular:
                  {' '}
                  <span className="c-document__question-info-detail">{ question.source}</span>
                </p>
                )
                }
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
                {(options.showTags) && (question.tags || question.all_topics) && (question.tags.length > 0 || question.all_topics.length > 0) ? (
                  <p className="c-document__question-info-row">
                  Tags:
                    {' '}
                    <i>{question.tags.concat(question.all_topics).map(tag => (tag.name.trim())).join(', ')}</i>
                  </p>
                ) : ''}
              </Col>
            </Row>
            <Row>
              <div className="c-document__question-view-more col-md-12">
                { (options.removeOption) ? (
                  <RemoveQuestionButton
                    questionId={question.id}
                    activeDocumentId={activeDocument.id}
                    removeSelectedQuestion={removeSelectedQuestion}
                    customClass="c-document__btn-remove-question"
                    label={<FontAwesomeIcon icon="trash-alt" />}
                    {...props}
                  />
                ) : ' ' }
                { (options.showViewButton && !options.showLoginModal) ? (
                  <Link to={`/view-question/${question.id}`}>
                    <Button>
                      <FontAwesomeIcon icon="search" />
                      {' '}
                      <span className="button-text">
                        Ver questão
                      </span>
                    </Button>
                  </Link>
                ) : ' ' }
                { (options.showViewButton && options.showLoginModal) ? (
                  <Button onClick={handleOpenLoginModal}>
                    <FontAwesomeIcon icon="search" />
                    {' '}
                    <span className="button-text">
                      Ver questão
                    </span>
                  </Button>
                ) : ' ' }
              </div>
            </Row>
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
