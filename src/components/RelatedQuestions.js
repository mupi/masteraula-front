import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import '../css/Question.css';


class RelatedQuestions  extends Component {

  constructor(props) {
    super(props);
  }
/*In discipline-name row, we need an array of disciplines that question belongs to*/
  render() {
    return (

            <Container>
              <Container>
                <Row>
                  <Col sm="12" xs="12">
                    QUESTÕES RELACIONADAS
                  </Col>
                </Row>
              </Container>
            </Container>
    );
  }
}

export default RelatedQuestions;
