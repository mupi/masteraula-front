
import React, { Component } from 'react';
import {
  Row, Col, Button, Collapse,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class FaqQuestion extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    const {
      collapse,
    } = this.state;
    this.setState({ collapse: !collapse });
  }


  render() {
    const {
      collapse,
    } = this.state;

    const { faqQuestion } = this.props;

    return (
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <div
            className="d-flex justify-content-between c-faq-page__question-section"
            onClick={this.toggle}
            onKeyDown={this.toggle}
            role="button"
            tabIndex={0}
          >
            <div
              className="c-faq-page__question-title"
            >
              {faqQuestion.faq_question}
            </div>
            <div>
              <Button color="light">
                {collapse ? <FontAwesomeIcon icon="angle-down" /> : <FontAwesomeIcon icon="angle-left" />}
              </Button>
            </div>
          </div>
          <Collapse isOpen={collapse} className="c-faq-page__question-answer">
            {faqQuestion.faq_answer}
          </Collapse>
        </Col>
      </Row>
    );
  }
}

export default FaqQuestion;
