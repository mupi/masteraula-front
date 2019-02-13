import React from 'react';
import { Container, Row, Col, Form } from 'reactstrap';
import PropTypes from 'prop-types';
import DisciplineList from 'components/disciplines/DisciplineList';
import DescriptorList from 'components/descriptors/DescriptorList';
import TagList from 'components/tags/TagList';
import { getTeachingLevel } from 'helpers/question';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field } from 'redux-form';
import QuestionAuthor from './QuestionAuthor';

const renderSelectField = ({
    input, label, meta: { touched, error }, children, optionDefault,
  }) => (
    <div>
      <div>
        <select {...input} className="form-control">
          <option value={optionDefault}>
            {label}
          </option>
          {children}
        </select>
        {touched && error && (
          <span className="error-message-text">
            {error}
          </span>
        )}
      </div>
    </div>
  );

  const difficultyList = {
    difficulties: [
      { id: 'E', name: 'Fácil' },
      { id: 'M', name: 'Médio' },
      { id: 'H', name: 'Difícil' },
    ],
  };

const QuestionEditInfo = ({ question }) => (
<Form>  
  <Container className="question-information">
    <Row className="c-question__tittle-section">
      <h4>
        <FontAwesomeIcon icon="info-circle" />
        {' '}
          Informações da Questão
      </h4>
    </Row>
    <Row className="c-question__row-info">
      <Col className="info-label" sm="4" xs="4">
      Ano
      </Col>
      <Col sm="8" xs="8">
        <span className="question-info c-question__tag--purple">
          {question.year}
        </span>
      </Col>
    </Row>
    <Row className="c-question__row-info">
      <Col className="info-label" sm="4" xs="4">
      Fonte
      </Col>
      <Col sm="8" xs="8">
        <span className="question-info c-question__tag--purple">
          {question.source}
        </span>
      </Col>
    </Row>
    <Row>
      <Col className="info-label" sm="4" xs="4">
          Disciplinas
      </Col>
      <Col sm="8" xs="8">
        <DisciplineList list={question.disciplines} />
      </Col>
    </Row>
    <Row className="c-question__row-info">
      <Col className="info-label" sm="4" xs="4">
          Grau de difuldade
      </Col>
      <Col sm="8" xs="8">
        <Field
            name="difficulty"
            type="text"
            component={renderSelectField}
            className="form-control"
            label="Selecione um nível de dificuldade"
            optionDefault="NaN"
        >
            { difficultyList && difficultyList.difficulties.map(difficulty => (
                        <option className="c-user-profile__state-city-dropdown-item" key={difficulty.id} value={difficulty.id}>
                          {getTeachingLevel(difficulty.name)}
                        </option>
                      )) }

        </Field>
      </Col>
    </Row>
    <Row className="c-question__row-info">
      <Col className="info-label" sm="4" xs="4">
        Nível de Ensino
      </Col>
      <Col sm="8" xs="8">
        <TagList list={question.teaching_levels} styleTag="question-info  teaching-level" />
      </Col>
    </Row>
    {question.tags && question.tags.length > 0 ? (
      <Row className="c-question__row-info">
        <Col className="info-label" sm="4" xs="4">
          Tags
        </Col>
        <Col sm="8" xs="8">
          <TagList list={question.tags} styleTag="question-info  tag-name" />
        </Col>
      </Row>
    ) : ' '}
    {question.descriptors && question.descriptors.length > 0 ? (
      <Row className="c-question__row-info">
        <Col className="info-label" sm="4" xs="4">
          Descritores
        </Col>
        <Col sm="8" xs="12">
          <DescriptorList list={question.descriptors} styleTag="question-info  descriptor-name" />
        </Col>
      </Row>
    ) : ' '}

    <Row className="c-question__row-info">
      <Col className="info-label" sm="4" xs="4">
      Autor
      </Col>
      <Col sm="8" xs="8">
        <QuestionAuthor author={question.author} styleTag="question-info author" />
      </Col>
    </Row>
  </Container>
  </Form>
);
QuestionEditInfo.propTypes = {
  question: PropTypes.shape({}).isRequired,
};

QuestionEditInfo.defaultProps = {
};


export default QuestionEditInfo;
