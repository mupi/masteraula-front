import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { hideModal } from 'actions/modalAction';
import OnlineTestStudentAnswersTable from 'components/onlineTest/OnlineTestStudentAnswersTable';
import OnlineTestStudentBasicInfo from 'components/onlineTest/OnlineTestStudentBasicInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Row, Col, Button,
}
  from 'reactstrap';

const OnlineTestStudentResultsModal = (props) => {
  const {
    closeModal,
    student,
  } = props;
  return (
    <div className="modal__content modal-content">
      <div className="modal__header modal-header">
        <h6
          className="modal-title"
        >
          Resultados da prova
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
        <Row className="justify-content-center">
          <Col sm="12">
            <p>
              <span>Resultados de: </span>
              <span className="c-online__subtitle"><strong>{student.name}</strong></span>
            </p>
          </Col>
          <Col sm="12">
            <OnlineTestStudentBasicInfo studentAnswers={student.student_answer} />
          </Col>
          <Col sm="12">
            <OnlineTestStudentAnswersTable student={student} />
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
      </div>
    </div>
  );
};


const mapStateToProps = state => ({
  isFetchingQuestion: state.question.isFetching,
  activeQuestion: state.question.activeQuestion,
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
});

OnlineTestStudentResultsModal.propTypes = {
  closeModal: PropTypes.func,
};

OnlineTestStudentResultsModal.defaultProps = {
  closeModal: f => f,
};

export default connect(mapStateToProps, mapDispatchToProps)(OnlineTestStudentResultsModal);
