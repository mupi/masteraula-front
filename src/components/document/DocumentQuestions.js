import React from 'react';
import PropTypes from 'prop-types';

import {
  Row, Container, Col, Label, Button, Modal, ModalBody, ModalFooter, ModalHeader,
} from 'reactstrap';
import QuestionContent from 'components/question/QuestionContent';
import QuestionHeader from 'components/question/QuestionHeader';
import QuestionInfo from 'components/question/QuestionInfo';
import ViewQuestionModal from 'components/question/ViewQuestionModal';
import DisciplineList from 'components/disciplines/DisciplineList';
import QuestionSourceYear from 'components/question/QuestionSourceYear';
import GoToQuestionBaseButton from 'components/buttons/GoToQuestionBaseButton';
import RemoveQuestionButton from 'components/buttons/RemoveQuestionButton';

class DocumentQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
    };

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

  getListQuestions(activeDocument, removeSelectedQuestion) {
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
                <Button onClick={() => this.toggle(question.question)}>
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

  clickRemove(removeFunction, documentId, questionIdToRemove){
    removeFunction(documentId, questionIdToRemove);
    this.toggle();
  }

  render() {
    const { activeDocument, removeSelectedQuestion } = this.props;
    const questions = this.getListQuestions(activeDocument, removeSelectedQuestion);

    return (
      <Container>
        <div>
          <div className="l-button-add-question">
            <GoToQuestionBaseButton customClass="o-button-add-question-doc o-button-add-question-doc--xl" />
          </div>
          {questions}
          <Modal className="c-document__question-modal" isOpen={this.state.question?true:false} toggle={() => this.toggle()}  size="lg">
            <ModalHeader toggle={() => this.toggle()} />
            <ModalBody>
              <p>Detalhe da questão</p>
              <QuestionHeader disciplines={this.state.question.disciplines} source={this.state.question.source} year={this.state.question.year} />
              <QuestionContent alternatives={this.state.question.alternatives} statement={this.state.question.statement} answer={this.state.question.resolution} />
              <QuestionInfo {...this.state.question} />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.clickRemove(removeSelectedQuestion, activeDocument.id, this.state.question)}>
                Remover
              </Button>
              {' '}
              <Button color="danger" onClick={() => this.toggle()}>
                Fechar
              </Button>
            </ModalFooter>
          </Modal>
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
