import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import StarRating from './../stars/StarRating'

class QuestionInfo  extends Component {
  constructor(props) {
    super(props);
    this.state = {
            disciplines: [  {  name: "Química"},  {name: "Física"  }],
            levels: [  {name: "Ensino Fundamental II"  },{name: "Ensino Médio"}],
            tags: [  {name: "Mafalda"  },{name: "Feminismo"}],
            descriptors: [  {name: "Localizar informações explícitas"  },{name: "Inferir o sentido de uma palavra"}]
        }
  }

/*In discipline-name row, we need an array of disciplines that question belongs to*/
  render() {
    const { disciplines, levels, tags, descriptors } = this.state

    return (

            <Container className="question-information">
              <Row className="title-section-question">
                    <h4><i className="fa fa-info-circle"></i> Informação da Questão</h4>
              </Row>
              <Row className="row-info">
                 <Col className="info-label" sm="4" xs="4">Disciplinas</Col>
                 <Col sm="8" xs="8">
                   {  disciplines.map((discipline, i) =>
                          <span key= {i} className="label-info discipline-name">{discipline.name}</span>
                      )
                    }
                 </Col>
              </Row>
              <Row className="row-info">
                 <Col className="info-label" sm="4" xs="4">Grau de difuldade</Col>
                 <Col sm="8" xs="8">
                    <span className="label-info difficulty-level">Difícil</span>
                 </Col>
              </Row>
              <Row className="row-info">
                 <Col  className="info-label" sm="4" xs="4">Nível de Ensino</Col>
                 <Col sm="8" xs="8">
                   {  levels.map((level, i) =>
                          <span key= {i} className="label-info teaching-level">{level.name}</span>
                      )
                    }
                 </Col>
              </Row>
              <Row className="row-info">
                 <Col  className="info-label" sm="4" xs="4">Tags</Col>
                 <Col sm="8" xs="8">
                   {  tags.map((tag, i) =>
                          <span key= {i} className="label-info tag-name">{tag.name}</span>
                      )
                    }
                 </Col>
              </Row>
              <Row className="row-info">
                 <Col  className="info-label" sm="4" xs="4">Descritores</Col>
                 <Col sm="8" xs="12">
                   {  descriptors.map((descriptor, i) =>
                          <span key= {i} className="label-info descriptor-name">{descriptor.name}</span>
                      )
                    }
                 </Col>
              </Row>
              <Row className="row-info">
                 <Col  className="info-label" sm="4" xs="4">Autor</Col>
                 <Col sm="8" xs="8">
                   <span className="label-info author">Thiago Oliveira dos Santos</span>
                 </Col>
              </Row>
              <Row className="row-info">
                 <Col  className="info-label" sm="4" xs="4">Avaliação</Col>
                 <Col sm="8" xs="8">
                     <StarRating />
                 </Col>
              </Row>
            </Container>
    );
  }
}

export default QuestionInfo;
