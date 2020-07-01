import React from 'react';
import {
  Row, Table, Button,
} from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDate, formatTime, diffDateInMinutes } from 'helpers/question';
import { downloadResults } from 'actions/onlineTestAction';

/*
review_score
true = ok
false = need review
*/

function getStudentScore(student) {
  const totalScore = student.student_answer
    ? student.student_answer.map(q => q.score_answer).filter(item => item).reduce((a, b) => parseFloat(a) + parseFloat(b), 0) : 0;
  const totalScoreFinal = parseFloat(totalScore).toFixed(2);

  return totalScoreFinal;
}

const OnlineTestStudentList = ({ students, showStudentModal, documentOnline, onClickDownload, isSending}) => (
  <div className="c-online__question">
    <p className="c-online__subtitle"><strong>Relação de alunos</strong></p>
    <Row className="c-document-modal__main-options">
        <div className="auto-margin-left-element mb-3">
          <Button title="Baixar resultados" color="secondary" onClick={(() => onClickDownload(documentOnline.link, documentOnline.name))} disabled={isSending}>
            <FontAwesomeIcon icon="download" className="btn__icon" />
            <span className="button-text">
              Baixar resultados
            </span>
          </Button>
        </div>
    </Row>
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
          <tr key={student.id}>
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
              {getStudentScore(student)}
              {' '}
              {!student.student_answer.reduce((sum, next) => sum && next.review_score, true)
              && <FontAwesomeIcon className="student-online__pending-review" icon="exclamation-triangle" />}
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

const mapStateToProps = state => ({
  isSending: state.onlineTest.isSending,
});

const mapDispatchToProps = dispatch => ({
  onClickDownload: (val1,val2) => {
    return dispatch(downloadResults(val1,val2));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnlineTestStudentList)
