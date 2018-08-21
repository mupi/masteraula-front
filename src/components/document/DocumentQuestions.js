import React from 'react';
import PropTypes from 'prop-types';

import { Container } from 'reactstrap';
import GoToQuestionBaseButton from 'components/buttons/GoToQuestionBaseButton';
import DocumentQuestionItem from './DocumentQuestionItem';

const DocumentQuestions = (props) => {
  const { activeDocument, removeSelectedQuestion } = props;

  return (
    <Container>
      <div>
        <div className="l-button-add-question">
          <GoToQuestionBaseButton customClass="o-button-add-question-doc o-button-add-question-doc--xl" />
        </div>
        {activeDocument && activeDocument.questions.map(questionOrder => (
          <DocumentQuestionItem question={questionOrder.question} activeDocument={activeDocument} removeSelectedQuestion={removeSelectedQuestion} />
        ))}
        {/* <ViewQuestionModal /> */}
      </div>

    </Container>);
};

DocumentQuestions.propTypes = {
  activeDocument: PropTypes.shape(),
  removeSelectedQuestion: PropTypes.func,
};

DocumentQuestions.defaultProps = {
  activeDocument: null,
  removeSelectedQuestion: f => f,
};

export default DocumentQuestions;
