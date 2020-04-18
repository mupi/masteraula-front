import React from 'react';
import {
  Table, Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDate, formatTime, diffDateInMinutes } from 'helpers/question';

const OnlineTestStudentList = ({ students, showStudentModal }) => (
  <div className="c-online__question">
    <p className="c-online__subtitle"><strong>Relação de alunos</strong></p>
    <Table responsive hover>
      <thead align="center">
        <tr>
          <th>Aluno</th>
          <th>Série</th>
          <th>Data</th>
          <th>Horário</th>
          <th>Duração (min)</th>
          <th>Pontuação</th>
          <th>Respostas</th>
        </tr>
      </thead>
      <tbody align="center">
        {students && students.map(student => (
          <tr key={student.student_name}>
            <td>
              {student.student_name}
            </td>
            <td>
              {student.student_levels}
            </td>
            <td>
              {formatDate(student.finish)}
            </td>
            <td>
              {formatTime(student.finish)}
            </td>
            <td>
              {`${diffDateInMinutes(student.start, student.finish)} min`}
            </td>
            <td>
              {student.total_score}
            </td>
            <td>
              <Button onClick={() => showStudentModal(student)}>
                <FontAwesomeIcon icon="eye" />
              </Button>
            </td>
          </tr>
        ))
          }
      </tbody>
    </Table>
  </div>
);

export default OnlineTestStudentList;
