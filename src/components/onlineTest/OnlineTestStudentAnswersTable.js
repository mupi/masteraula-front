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
            <tr key={answer.id}>
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
                  5 pontos
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OnlineTestStudentAnswersTable;
