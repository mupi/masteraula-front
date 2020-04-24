import React from 'react';
import {
  Table,
} from 'reactstrap';
import { getOrderAlternative } from 'helpers/question';

const OnlineTestStudentAnswersTable = (props) => {
  const { studentAnswers } = props;
  return (
    <div className="c-online__question">
      <Table responsive hover>
        <thead align="center">
          <tr>
            <th>#</th>
            <th>Resposta do aluno</th>
            <th>Gabarito</th>
            <th>Pontuação</th>
          </tr>
        </thead>
        <tbody align="center">
          {studentAnswers && studentAnswers.map(answer => (
            <tr key={answer.student_question.id}>
              <td className="text-center">
                {answer.student_question.question.id}
              </td>
              <td className="text-center">
                {answer.student_question.question.alternatives.map((alternative, i) => (
                  alternative.id === answer.answer_alternative ? (
                    <span key={alternative.id}>{getOrderAlternative(i)}</span>
                  ) : ''
                ))}
                {
                  answer.answer_text && <span>{answer.answer_text}</span>
                }
              </td>
              <td className="text-center">

                {answer.student_question.question.alternatives.map((alternative, i) => (
                  alternative.is_correct ? (
                    <span key={alternative.id}>{getOrderAlternative(i)}</span>
                  ) : ''
                ))}
                {
                  answer.answer_text && <span>{answer.student_question.question.resolution}</span>
                }
              </td>
              <td>
                {answer.score_answer}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OnlineTestStudentAnswersTable;
