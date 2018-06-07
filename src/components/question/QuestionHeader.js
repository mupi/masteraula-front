import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import learningObject from "../../img/home/question-objeto-aprendizagem.jpg";


class QuestionHeader  extends Component {

  constructor(props) {
    super(props);
    this.state = {
            disciplines: [
              {
              name: "Química"
              },
              {
              name: "Física"
              }
            ]
        }
  }

  render() {
    const { disciplines } = this.state
    return (
            <Container>
              <Row>
                {  disciplines.map((discipline, i) =>
                       <span key= {i} className="top-label-question discipline-name">{discipline.name}</span>
                   )
                 }
              </Row>

              <Row>
                <span className="top-label-question source-name">ENEM</span>
              </Row>
              <Row>
                <h4><i className="fa fa-question-circle"></i> Questão</h4>
              </Row>
              <Row className="text-center">
                <Col sm="12" xs="12">
                  <div className="img-learning-object">
                    <img src={learningObject}/>
                  </div>
                </Col>
              </Row>
            </Container>
    );
  }
}

export default QuestionHeader;
