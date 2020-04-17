import React from 'react';
import {
  Table,
} from 'reactstrap';
import { getCleanExtractStatement } from 'helpers/question';


const OnlineTestQuestionHeader = (props) => {
  const {
    question, openQuestionModal, children, classCustom,
  } = props;

  const onClickHandler = () => {
    openQuestionModal(question.id);
  };

  return (
    <td role="gridcell" onClick={onClickHandler} style={{ cursor: 'pointer' }} className={`c-my-documents__cell ${classCustom}`}>
      {children}
    </td>
  );
};


const OnlineTestQuestionsTable = (props) => {
  const { questions } = props;
  const totalScore = 15;
  return (
    <div className="c-online__question">
      <p className="c-online__subtitle"><strong>Relação de questões</strong></p>
      <Table responsive hover>
        <thead align="center">
          <tr>
            <th>#</th>
            <th>Extrato</th>
            <th>Tipo</th>
            <th>Mídias</th>
            <th>Pontuação</th>
          </tr>
        </thead>
        <tbody align="center">
          {questions && questions.map((questionOrder) => {
            const extractStatement = getCleanExtractStatement(questionOrder.question.statement);

            return (
              <tr key={questionOrder.question.id}>
                <OnlineTestQuestionHeader id={questionOrder.question.id}>
                  {questionOrder.question.id}
                </OnlineTestQuestionHeader>
                <OnlineTestQuestionHeader id={questionOrder.question.id} classCustom="text-left">
                  {(extractStatement.length >= 120) ? ` ${extractStatement.substring(0, 120)} ...` : extractStatement}
                </OnlineTestQuestionHeader>
                <td>
                  {questionOrder.question.type_question}
                </td>
                <td>
                  {questionOrder.question.learning_objects.length}
                </td>
                <td>
                  {questionOrder.score}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <p className="text-right c-online-results__total-score">
        <strong>Total: </strong>
        {totalScore}
      </p>
    </div>
  );
};

export default OnlineTestQuestionsTable;
