import React from 'react';
import DocumentQuestionItem from 'components/document/DocumentQuestionItem';


const OnlineTestQuestions = (props) => {
  const { questions, options, showQuestionModal } = props;
  return (
    <div>
      {questions && questions.map(questionOrder => (
        <DocumentQuestionItem
          key={questionOrder.question.id}
          question={questionOrder.question}
          options={options}
          questionOrder={questionOrder}
          showQuestionModal={showQuestionModal}
        />
      ))}
    </div>
  );
};

export default OnlineTestQuestions;
