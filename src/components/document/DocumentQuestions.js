import React from 'react';
import PropTypes from 'prop-types';

import {
  Row, Container, Col, Label, Button, Modal, ModalBody, ModalFooter, ModalHeader,
} from 'reactstrap';
import QuestionContent from 'components/question/QuestionContent';
import DisciplineList from 'components/disciplines/DisciplineList';
import QuestionSourceYear from 'components/question/QuestionSourceYear';
import GoToQuestionBaseButton from 'components/buttons/GoToQuestionBaseButton';
import RemoveQuestionButton from 'components/buttons/RemoveQuestionButton';
import { getTeachingLevel } from 'helpers/question';
import DocumentQuestionItem from './DocumentQuestionItem';

class DocumentQuestions extends React.Component {

  getListQuestions(activeDocument, removeSelectedQuestion) {
    const questions = [];
    if (activeDocument) {
      for (let i = 0; i < activeDocument.questions.length; i += 1) {
        const question = activeDocument.questions[i];
        console.log(question.id);
        questions.push(
          <DocumentQuestionItem key={i} question={question} activeDocument={activeDocument} removeSelectedQuestion={removeSelectedQuestion} />
        );
      }
    }
    return questions;
  }

  clickRemove(removeFunction, documentId, questionIdToRemove) {
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
