import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'reactstrap';

class QuestionView  extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
            <Container>
              Aqui aparecerá a questão!
            </Container>
    );
  }
}

export default QuestionView;
