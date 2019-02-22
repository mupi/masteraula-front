import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import StarRating from 'components/stars/StarRating';
import DisciplineList from 'components/disciplines/DisciplineList';
import DescriptorList from 'components/descriptors/DescriptorList';
import TagList from 'components/tags/TagList';
import { getTeachingLevel } from 'helpers/question';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import QuestionAuthor from './QuestionAuthor';

const QuestionInfo = ({ question, rating, onRate = f => f }) => (
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
        Nível de Ensino
      </Col>
      <Col sm="8" xs="8">
        <TagList list={question.teaching_levels} styleTag="question-info  teaching-level" />
      </Col>
    </Row>
    <Row className="c-question__row-info">
      <Col className="info-label" sm="4" xs="4">
          Grau de difuldade
      </Col>
      <Col sm="8" xs="8">
        <span className="question-info  difficulty-level">
          {getTeachingLevel(question.difficulty)}
        </span>
      </Col>
    </Row>
    {question.tags && question.tags.length > 0 ? (
      <Row className="c-question__row-info c-question__row-tags">
        <Col className="info-label" sm="4" xs="4">
          Tags
        </Col>
        <Col sm="8" xs="8">
          <TagList list={question.tags} styleTag="question-info  c-question__tag-name" />
        </Col>
      </Row>
    ) : ' '}
    {question.all_topics && question.all_topics.length > 0 ? (
      <Row className="c-question__row-info c-question__row-tags">
        <Col className="info-label" sm="4" xs="4">
          Tópicos
        </Col>
        <Col sm="8" xs="8">
          <TagList list={question.all_topics} styleTag="question-info c-question__tag-name" />
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
    <Row className="c-question__row-info hidden">
      <Col className="info-label" sm="4" xs="4">
        Avaliação
      </Col>
      <Col sm="8" xs="8">
        <StarRating onRate={rt => onRate(rt)} starsSelected={rating} />
      </Col>
    </Row>
  </Container>
);
QuestionInfo.propTypes = {
  question: PropTypes.shape({}).isRequired,
  rating: PropTypes.number,
  onRate: PropTypes.func,
};

QuestionInfo.defaultProps = {
  rating: 0,
  onRate: f => f,
};


export default QuestionInfo;
