import React from 'react';
import {
  Table, Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
          <th>Duração</th>
          <th>Pontuação</th>
          <th>Respostas</th>
        </tr>
      </thead>
      <tbody align="center">
        {students && students.map(student => (
          <tr key={student.id}>
            <td>
              {student.student_name}
            </td>
            <td>
              {student.student_levels}
            </td>
            <td>
              {student.start}
            </td>
            <td>
              {student.finish}
            </td>
            <td>
              {student.finish}
            </td>
            <td>
              {student.total_score}
            </td>
            <td>
              <Button onClick={() => showStudentModal()}>
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
