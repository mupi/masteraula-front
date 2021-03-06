import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Button, Badge, Alert,
} from 'reactstrap';
import RemoveQuestionButton from 'components/buttons/RemoveQuestionButton';
import { getCleanExtractStatement } from 'helpers/question';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Document's item options available for Public Document
const options = {
  showViewButton,
  removeOption,
  showTags,
};
*/

/* eslint-disable react/no-array-index-key */
const DocumentQuestionItem = (props) => {
  const {
    question, questionOrder, activeDocument, removeSelectedQuestion, options, match, showLoginModal, showQuestionModal,
  } = props;

  const autorship = question.authorship ? question.authorship : question.author.name;

  const userNickname = question.author.nickname;
  const userAnonymous = question.author.anonymous;

  const handleOpenLoginModal = () => {
    showLoginModal(match.url);
  };
  const extractStatement = getCleanExtractStatement(question.statement);

  return (
    <div className="c-document__question">

      {question.statement && (
        <Row>
          <Col sm="8" className="c-document__question-image">
            {question.disabled && (
              <Alert color="danger" className="c-document__question-unavailable">
                A questão não está mais disponível no Banco de Questões.
              </Alert>
            )}
            <p className="c-document__question-info-title">
              {`Questão N° ${question.id} `}
              {question.learning_objects && question.learning_objects.length > 0 ? (
                <span className="c-document__question-number-learning-obj">
                  (
                  {' '}
                  <FontAwesomeIcon icon="image" />
                  {` ${question.learning_objects.length}`}
                  )
                </span>
              ) : ''}
              :
            </p>
            <p className="c-document__question-info-statement">
              {(extractStatement.length >= 350) ? ` ${extractStatement.substring(0, 350)} ...` : extractStatement}
            </p>
            {(question.tags || question.all_topics) && (question.tags.length > 0 || question.all_topics.length > 0) ? (
              <p className="c-document__question-info-row-topics">
                {question.tags.concat(question.all_topics).map((tag, x) => <Badge key={`${question.id}-${x}`} color="success" pill>{tag.name.trim()}</Badge>)}
              </p>
            ) : ''}
            {options.showScore && questionOrder.score && (
            <p>
              <span className="c-online__score-label" style={{ marginRight: '7px' }}><strong>Pontuação: </strong></span>
              {questionOrder.score}
            </p>
            )}
          </Col>
          <Col sm="4" className="c-document__question-info">
            <Row>
              <Col sm="12">
                <p className="c-document__question-info-subtitle">
                  Informações:
                </p>
              </Col>
              <Col sm="12">
                {!question.source
                  ? (
                    <p className="c-document__question-info-row">
                      {'Autoria: '}
                      <span className="c-document__question-info-detail">
                        {userAnonymous === true && userNickname !== null ? ( userNickname
                        ) : autorship
                        }
                      </span>
                    </p>
                  ) : (
                    <>
                      {question.source && (
                      <p className="c-document__question-info-row">
                        {'Vestibular: '}
                        <span className="c-document__question-info-detail">{question.source}</span>
                      </p>
                      )}
                      {question.year && (
                      <p className="c-document__question-info-row">
                        {'Ano: '}
                        <span className="c-document__question-info-detail">{question.year}</span>
                      </p>
                      )}
                    </>
                  )
                }
                <p className="c-document__question-info-row">
                  {'Níveis de Ensino: '}
                  {question.teaching_levels && question.teaching_levels.map(level => (
                    <span key={level.id} className="c-document__question-info-detail">
                      {level.name}
                    </span>
                  ))}
                </p>
                <p className="c-document__question-info-row">
                  {'Disciplinas: '}
                  <i>{question.disciplines && question.disciplines.map(discipline => (discipline.name.trim())).join(', ')}</i>
                </p>
              </Col>
            </Row>
            <Row>
              <div className="c-document__question-view-more col-md-12">
                {(options.removeOption) ? (
                  <RemoveQuestionButton
                    questionId={question.id}
                    activeDocumentId={activeDocument.id}
                    removeSelectedQuestion={removeSelectedQuestion}
                    customClass="c-document__btn-remove-question"
                    label={<FontAwesomeIcon icon="trash-alt" />}
                    {...props}
                  />
                ) : ' '}
                {(options.showViewButton && !options.showLoginModal) ? (
                  <Link to={`/view-question/${question.id}`}>
                    <Button>
                      <FontAwesomeIcon icon="search" />
                      {' '}
                      <span className="button-text">
                        Ver questão
                      </span>
                    </Button>
                  </Link>
                ) : ' '}
                {(options.showViewButton && options.showLoginModal) ? (
                  <Button onClick={handleOpenLoginModal}>
                    <FontAwesomeIcon icon="search" />
                    {' '}
                    <span className="button-text">
                      Ver questão
                    </span>
                  </Button>
                ) : ' '}
                {(options.showViewModal) ? (
                  <Button onClick={() => showQuestionModal(question.id)}>
                    <FontAwesomeIcon icon="search" />
                    {' '}
                    <span className="button-text">
                      Ver questão
                    </span>
                  </Button>
                ) : ' '}
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
