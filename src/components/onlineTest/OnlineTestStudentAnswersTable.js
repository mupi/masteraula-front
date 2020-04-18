import React from 'react';
import {
  Table,
} from 'reactstrap';

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
              <td>
                  467
              </td>
              <td className="text-left">
                  a
              </td>
              <td>
                  b
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
