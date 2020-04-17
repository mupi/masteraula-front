import React from 'react';
import {
  Table,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const OnlineTestStudentList = () => {
  const students = [
    {
      id: 1,
      name: 'Pamela Rosales',
      grade: '1eiro B',
      date: '20/04/2020',
      time: '08:50',
      duration: 55,
      score: 16,
    },
    {
      id: 2,
      name: 'Matías Rosales',
      grade: '1eiro B',
      date: '20/04/2020',
      time: '18:22',
      duration: 35,
      score: 16,
    },
  ];
  return (
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
                {student.name}
              </td>
              <td>
                {student.grade}
              </td>
              <td>
                {student.date}
              </td>
              <td>
                {student.time}
              </td>
              <td>
                {student.duration}
              </td>
              <td>
                {student.score}
              </td>
              <td>
                <Link
                  to={`/online-tests/${document.id}/1`}
                  className="c-my-documents__btn-manage-onlines"
                  title="Ver respostas"
                >
                  <FontAwesomeIcon icon="eye" />
                </Link>
              </td>
            </tr>
          ))
          }
        </tbody>
      </Table>
    </div>
  );
};

export default OnlineTestStudentList;
