import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { hideModal } from 'actions/modalAction';
import { editAnswersOnlineTest } from 'actions/onlineTestAction';
import OnlineTestStudentBasicInfo from 'components/onlineTest/OnlineTestStudentBasicInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Row, Col, Button, Table, Form, Input,
} from 'reactstrap';
import { getOrderAlternative } from 'helpers/question';
import {
  Field, reduxForm, FieldArray, initialize,
} from 'redux-form';
import {
  minDuration,
} from 'helpers/validators';

// Numeric Input Field
const renderNumericField = ({
  input,
  type,
  meta: { touched, error, warning },
  className,
  placeholder,
}) => (
  <div>
    <Input
      {...input}
      placeholder={placeholder}
      type={type}
      className={className}
    />
    { touched
          && ((error && (
          <span className="error-message-text">
            {error}
          </span>
          ))
          || (warning && (
          <span>
            {' '}
            {warning}
            {' '}
          </span>
          )))
        }
  </div>
);

const renderQuestions = ({ fields, studentAnswers }) => (
  <>
    {fields && fields.map((answerField, i) => {
      const answerShown = studentAnswers[i];

      return (
        <tr key={answerShown.student_question.id}>
          <td className="text-center">
            {answerShown.student_question.question.id}
          </td>
          <td className="text-center">
            {answerShown.student_question.question.alternatives.map((alternative, a) => (
              alternative.id === answerShown.answer_alternative ? (
                <span key={alternative.id}>{getOrderAlternative(a)}</span>
              ) : ''
            ))}
            {
          answerShown.answer_text && <span>{answerShown.answer_text}</span>
        }
          </td>
          <td className="text-center">
            {answerShown.student_question.question.alternatives.map((alternative, g) => (
              alternative.is_correct ? (
                <span key={alternative.id}>{getOrderAlternative(g)}</span>
              ) : ''
            ))}
            {
        answerShown.answer_text && <span>{answerShown.student_question.question.resolution}</span>
       }
          </td>
          <td>
            {!answerShown.answer_text && answerShown.score_answer}
            {answerShown.answer_text && (
              <Field
                name={`${answerField}.score_answer_updated`}
                type="number"
                component={renderNumericField}
                placeholder="Ex. 5.5"
                validate={minDuration}
                className="c-online-results__single-score"
              />
            )}
          </td>
        </tr>
      );
    })}
  </>
);

const OnlineTestStudentResultsModal = (props) => {
  const {
    closeModal,
    student,
    handleSubmit,
    prepareForm,
  } = props;
  const studentAnswers = student.student_answer;

  useEffect(() => {
    prepareForm(student);
  }, []);

  return (
    <div className="modal__content modal-content">
      <div className="modal__header modal-header">
        <h6
          className="modal-title"
        >
          Resultados da prova online
        </h6>
        <button type="button" className="close" aria-label="Close" onClick={closeModal}>
          <span aria-hidden="true">
            &times;
          </span>
        </button>
      </div>
      <div className="c-document-modal__body modal-body">
        <Row className="c-document-modal__main-options">
          <div className="auto-margin-left-element">
            <Button title="Baixar resultados" color="secondary" onClick={() => {}}>
              <FontAwesomeIcon icon="download" className="btn__icon" />
              <span className="button-text">
                Baixar resultados
              </span>
            </Button>
          </div>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-center">
            <Col sm="12">
              <p>
                <span>Resultados de: </span>
                <span className="c-online__subtitle"><strong>{student.student_name}</strong></span>
              </p>
            </Col>
            <Col sm="12">
              <OnlineTestStudentBasicInfo student={student} />
            </Col>
            <Col sm="12">
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
                    <FieldArray
                      name="student_answers"
                      component={renderQuestions}
                      studentAnswers={studentAnswers}
                    />
                  </tbody>
                </Table>
              </div>
            </Col>
            <Col sm="12">
              <div className="modal__footer modal-footer">
                <Button type="submit" color="" className="btn--confirm">
                Salvar
                </Button>
                {' '}
                <Button color="secondary" onClick={() => closeModal()}>
                Cancelar
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

OnlineTestStudentResultsModal.propTypes = {
  closeModal: PropTypes.func,
};

OnlineTestStudentResultsModal.defaultProps = {
  closeModal: f => f,
};

const mapStateToProps = state => ({
  activeOnlineTest: state.onlineTest.activeOnlineTest,
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
  prepareForm: (student) => {
    dispatch(initialize('student-answers', {
      id_student: student.id,
      student_answers: student.student_answer,
    }));
  },
  onSubmit: (values) => {
    /* Body:
{
  "student_answer": [{"score_answer":3, "id": 21}]
} */
    const idStudent = values.id_student;
    const updatedAnswers = values.student_answers.map((value) => {
      if ((typeof (value.score_answer_updated) !== 'undefined') && value.score_answer_updated.trim().length > 0) {
        return {
          id: value.id,
          score_answer: value.score_answer_updated,
        };
      }
      return {};
    }).filter(value => Object.keys(value).length !== 0);

    dispatch(editAnswersOnlineTest(idStudent, updatedAnswers));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'student-answers',
})(OnlineTestStudentResultsModal));
