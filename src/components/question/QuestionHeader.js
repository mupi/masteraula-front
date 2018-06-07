import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';


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
                <span className="top-label-question source-name">ENEM 2010</span>
              </Row>
              <Row className="title-section-question">
                <h4><i className="fa fa-question-circle"></i> Questão</h4>
              </Row>

            </Container>
    );
  }
}

export default QuestionHeader;
