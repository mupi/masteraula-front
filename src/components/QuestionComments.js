import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import '../css/Question.css';


class QuestionComments  extends Component {

  constructor(props) {
    super(props);
  }
/*In discipline-name row, we need an array of disciplines that question belongs to*/
  render() {
    return (

            <Container>
              <Row>
                <Col sm="12" xs="12">
                  COMENTÁRIOS DA QUESTÃO
                </Col>
              </Row>
            </Container>
    );
  }
}

export default QuestionComments;
