import React from 'react';
import PropTypes from 'prop-types';

import {
  Row, Container, Col, Label, Button, Modal, ModalBody, ModalFooter, ModalHeader,
} from 'reactstrap';
import QuestionContent from 'components/question/QuestionContent';
import ViewQuestionModal from 'components/question/ViewQuestionModal';
import DisciplineList from 'components/disciplines/DisciplineList';
import QuestionSourceYear from 'components/question/QuestionSourceYear';
import GoToQuestionBaseButton from 'components/buttons/GoToQuestionBaseButton';
import RemoveQuestionButton from 'components/buttons/RemoveQuestionButton';

const getListQuestions = (activeDocument, removeSelectedQuestion) => {
  const questions = [];
  if (activeDocument) {
    for (let i = 0; i < activeDocument.questions.length; i += 1) {
      const question = activeDocument.questions[i];
      questions.push(
        <div key={i} className="c-document__question">
          <RemoveQuestionButton
            questionId={question.question}
            activeDocumentId={activeDocument.id}
            removeSelectedQuestion={removeSelectedQuestion}
          />
          <Row>
            <Col sm="12">
              <DisciplineList list={question.disciplines} />
              <QuestionSourceYear source={question.source} year={question.year} />
            </Col>
          </Row>
          <Row>
            <div className="c-document__question-content">
              <QuestionContent statement={question.question} />
            </div>
          </Row>
          <Row>
            <div className="c-document__question-view-more col-md-3 offset-md-9">
              <Button onClick={() => this.toggle(question)}>
                <i className="fa fa-search" />
                {' '}
                <span className="button-text">
                  Ver mais
                </span>
              </Button>
            </div>
          </Row>
        </div>,
      );
    }
  }
  return questions;
};

class DocumentQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
    };

    this.toggle = this.toggle.bind(this);
  }

   toggle(question) {
    if (question) {
      this.setState({
        question,
      });
    } else {
      this.setState({
        question: '',
      });
    }
  }


  render() {
    const { activeDocument, removeSelectedQuestion } = this.props;
    const questions = getListQuestions(activeDocument, removeSelectedQuestion);

    return (
      <Container>
        <div>
          <div className="l-button-add-question">
            <GoToQuestionBaseButton customClass="o-button-add-question-doc o-button-add-question-doc--xl" />
          </div>
          {questions}
          <ViewQuestionModal />
        </div>

      </Container>);
  }
}

DocumentQuestions.propTypes = {
  removeSelectedQuestion: PropTypes.func,
};

DocumentQuestions.defaultProps = {
  removeSelectedQuestion: f => f,
};

export default DocumentQuestions;
