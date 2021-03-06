import React from 'react';
import PropTypes from 'prop-types';

// import GoToQuestionBaseButton from 'components/buttons/GoToQuestionBaseButton';
import DocumentQuestionItem from './DocumentQuestionItem';

const DocumentQuestions = (props) => {
  const { activeDocument, removeSelectedQuestion } = props;

  return (
    <div>
      {/* <div className="l-button-add-question">
          <GoToQuestionBaseButton customClass="o-button-add-question-doc o-button-add-question-doc--xl" />
      </div> */}
      {activeDocument && activeDocument.questions.map(questionOrder => (
        <DocumentQuestionItem
          key={questionOrder.question.id}
          question={questionOrder.question}
          activeDocument={activeDocument}
          removeSelectedQuestion={removeSelectedQuestion}
          {...props}
        />
      ))}
    </div>
  );
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
