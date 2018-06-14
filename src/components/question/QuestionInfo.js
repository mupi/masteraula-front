import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import StarRating from 'components/stars/StarRating'
import DisciplineList from "components/disciplines/DisciplineList"
import TagList from "components/tags/TagList"

const QuestionInfo = ({disciplines, teachingLevels, descriptors, tags, difficulty, author}) => (
            <Container className="question-information">
              <Row className="title-section-question">
                    <h4><i className="fa fa-info-circle"></i> Informação da Questão</h4>
              </Row>
              <Row>
                 <Col className="info-label" sm="4" xs="4">Disciplinas</Col>
                 <Col sm="8" xs="8">
                     <DisciplineList list={disciplines} />
                 </Col>
              </Row>
              <Row className="row-info">
                 <Col className="info-label" sm="4" xs="4">Grau de difuldade</Col>
                 <Col sm="8" xs="8">
                    <span className="label-info difficulty-level">{difficulty}</span>
                 </Col>
              </Row>
              <Row className="row-info">
                 <Col  className="info-label" sm="4" xs="4">Nível de Ensino</Col>
                 <Col sm="8" xs="8">
                    <TagList list={teachingLevels} styleTag="label-info teaching-level"/>
                 </Col>
              </Row>
              <Row className="row-info">
                 <Col  className="info-label" sm="4" xs="4">Tags</Col>
                 <Col sm="8" xs="8">
                    <TagList list={tags} styleTag="label-info tag-name"/>
                 </Col>
              </Row>
              <Row className="row-info">
                 <Col  className="info-label" sm="4" xs="4">Descritores</Col>
                 <Col sm="8" xs="12">
                    <TagList list={descriptors} styleTag="label-info descriptor-name"/>
                 </Col>
              </Row>
              <Row className="row-info">
                 <Col  className="info-label" sm="4" xs="4">Autor</Col>
                 <Col sm="8" xs="8">
                   <span className="label-info author">{author}</span>
                 </Col>
              </Row>
              <Row className="row-info">
                 <Col  className="info-label" sm="4" xs="4">Avaliação</Col>
                 <Col sm="8" xs="8">
                     <StarRating />
                 </Col>
              </Row>
            </Container>
    )

export default QuestionInfo;
