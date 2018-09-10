import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Button,
} from 'reactstrap';
import RemoveQuestionButton from 'components/buttons/RemoveQuestionButton';
import { getTeachingLevel } from 'helpers/question';
import { Link } from 'react-router-dom';
import { getCleanExtractStatement } from 'helpers/question';


const DocumentQuestionItem = (props) => { 
  const { question, activeDocument, removeSelectedQuestion, readOnly=false } = props;
  const extractStatement = getCleanExtractStatement(question.statement);

  return (
    <div className="c-document__question">
     
      { question.statement && (
        <Row>
          <Col sm="12">
            <p className="c-document__question-info-title">Questão:</p>
            <p className="c-document__question-info-statement">
              { (extractStatement.length >= 350) ? ` ${extractStatement.substring(0, 350)}${' ...'}` : extractStatement }
            </p>
            <p className="c-document__question-info-author">por: {' '} {question.author.name}</p>
          </Col>
          <Col sm="4" className="c-document__question-image">
            <img className="c-question__img" src="https://www.asomadetodosafetos.com/content/uploads/2016/05/Tirinha-Mafalda5.jpg" alt="objeto-aprendizagem" />
          </Col>
          <Col sm="8" className="c-document__question-info">
            <Row>
              <Col sm="12">
                <p className="c-document__question-info-subtitle">Informações:</p>
              </Col>
              <Col sm="12">
                <p className="c-document__question-info-row">Fonte: {' '} { question.source} </p>
                <p className="c-document__question-info-row">Ano: {' '} { question.year} </p>
                <p className="c-document__question-info-row">Dificuldade: {' '} <span className="c-document__question-info-detail c-document__question-info-detail--green"> {getTeachingLevel(question.difficulty)}</span> </p>
                <p className="c-document__question-info-row">Níveis de Ensino: {' '}  {question.teaching_levels && question.teaching_levels.map((level, i) => (
                  <span key={i} className="c-document__question-info-detail c-document__question-info-detail--green">
                    {level.name}
                  </span>
                ))}
                </p>
                <p className="c-document__question-info-row">Disciplinas: {' '}  {question.disciplines && question.disciplines.map((discipline, i) => (
                  <span key={i} className="c-document__question-info-detail c-document__question-info-detail--pink">
                    {discipline.name}
                  </span>
                ))}
                </p>
               

              </Col>
            </Row>
            { (!readOnly) ? (
              <Row>
                <div className="c-document__question-view-more col-md-4 offset-md-8">
                  { (!readOnly) ? (
                    <RemoveQuestionButton
                      questionId={question.id}
                      activeDocumentId={activeDocument.id}
                      removeSelectedQuestion={removeSelectedQuestion}
                    />) : ' ' }             
                  <Link to={`/view-question/${question.id}`}>
                    <Button>
                      <i className="fa fa-search" />
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
