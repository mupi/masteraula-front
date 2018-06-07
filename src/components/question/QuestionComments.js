import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';

class QuestionComments  extends Component {

  constructor(props) {
    super(props);
  }
/*In discipline-name row, we need an array of disciplines that question belongs to*/
  render() {
    return (

      <Container>
        <Row className="title-section-question">
              <h4><i class="fa fa-comments"></i> Comentários</h4>
        </Row>
      </Container>
    );
  }
}

export default QuestionComments;
