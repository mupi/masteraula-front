import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import '../css/Question.css';


class QuestionView  extends Component {

  constructor(props) {
    super(props);
  }
/*In discipline-name row, we need an array of disciplines that question belongs to*/
  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-sm-5 col-md-5 col-lg-6 col-xs-12">
            <Container>
              <Row>
                <span className="top-label-question discipline-name">Química</span>
              </Row>
              <Row>
                <span className="top-label-question source-name">ENEM</span>
              </Row>
              <Row>
                <h4><i className="fa fa-question-circle"></i> Questão</h4>
              </Row>
            </Container>
          </div>
        </div>
    );
  }
}

export default QuestionView;
