import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import StarRating from 'components/stars/StarRating';
import DisciplineList from 'components/disciplines/DisciplineList';
import DescriptorList from 'components/descriptors/DescriptorList';
import TagList from 'components/tags/TagList';

import QuestionAuthor from './QuestionAuthor';

const getTeachingLevel = (difficulty) => {
  switch (difficulty) {
    case 'E': return 'Fácil';
    case 'M': return 'Médio';
    case 'H': return 'Difícil';
    default: return difficulty;
  }
};

const QuestionInfo = ({
  disciplines, teaching_levels, descriptors, tags, difficulty, author, rating, onRate = f => f,
}) => (
  <Container className="question-information">
    <Row className="c-question__tittle-section">
      <h4>
        <i className="fa fa-info-circle" />
        {' '}
Informação da Questão
      </h4>
    </Row>
    <Row>
      <Col className="info-label" sm="4" xs="4">
Disciplinas
      </Col>
      <Col sm="8" xs="8">
        <DisciplineList list={disciplines} />
      </Col>
    </Row>
    <Row className="c-question__row-info">
      <Col className="info-label" sm="4" xs="4">
Grau de difuldade
      </Col>
      <Col sm="8" xs="8">
        <span className="question-info  difficulty-level">
          {getTeachingLevel(difficulty)}
        </span>
      </Col>
    </Row>
    <Row className="c-question__row-info">
      <Col className="info-label" sm="4" xs="4">
Nível de Ensino
      </Col>
      <Col sm="8" xs="8">
        <TagList list={teaching_levels} styleTag="question-info  teaching-level" />
      </Col>
    </Row>
    <Row className="c-question__row-info">
      <Col className="info-label" sm="4" xs="4">
Tags
      </Col>
      <Col sm="8" xs="8">
        <TagList list={tags} styleTag="question-info  tag-name" />
      </Col>
    </Row>
    <Row className="c-question__row-info">
      <Col className="info-label" sm="4" xs="4">
Descritores
      </Col>
      <Col sm="8" xs="12">
        <DescriptorList list={descriptors} styleTag="question-info  descriptor-name" />
      </Col>
    </Row>
    <Row className="c-question__row-info">
      <Col className="info-label" sm="4" xs="4">
Autor
      </Col>
      <Col sm="8" xs="8">
        <QuestionAuthor author={author} styleTag="question-info author" />
      </Col>
    </Row>
    <Row className="c-question__row-info">
      <Col className="info-label" sm="4" xs="4">
Avaliação
      </Col>
      <Col sm="8" xs="8">
        <StarRating onRate={rating => onRate(rating)} starsSelected={rating} />
      </Col>
    </Row>
  </Container>
);
QuestionInfo.propTypes = {
  rating: PropTypes.number,
  onRate: PropTypes.func,
};

QuestionInfo.defaultProps = {
  rating: 0,
  onRate: f => f,
};


export default QuestionInfo;
