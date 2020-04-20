import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { hideModal } from 'actions/modalAction';
import QuestionContent from 'components/question/QuestionContent';
import QuestionInfo from 'components/question/QuestionInfo';

import {
  Row, Alert, Col, Button,
}
  from 'reactstrap';

const AlertDocumentNotAvailable = ({ question }) => (
  question.disabled ? (
    <Row>
      <Col className="c-question__col-full-section-details">
        <Alert color="danger" className="c-question-edit__warning-message">
          A questão
          {' '}
          N°
          <strong>{question.id}</strong>
          {' '}
          foi removida pelo autor(a) e não está mais disponível
        </Alert>
      </Col>
    </Row>
  ) : ''
);

// Learning object's options available for LearnningObjectContent
const options = {
  showOperations: false,
  showViewButton: false,
  showCreateQuestionButton: false,
  removeOption: false,
  showTitle: false,
};


const QuestionModal = (props) => {
  const {
    idQuestion, closeModal, isFetchingQuestion, fetchQuestion, activeQuestion,
  } = props;


  useEffect(() => {
    fetchQuestion(idQuestion);
  }, []);

  if (isFetchingQuestion) {
    return (
      <div className="modal__content modal-content">
        <Alert className="alert--warning" color="warning">
              Carregando ...
        </Alert>
      </div>
    );
  }
  return (
    <div className="modal__content modal-content">
      <div className="modal__header modal-header">
        <h6
          className="modal-title"
        >
          {`Questão Nº ${activeQuestion.id}`}
        </h6>
        <button type="button" className="close" aria-label="Close" onClick={closeModal}>
          <span aria-hidden="true">
            &times;
          </span>
        </button>
      </div>
      <div className="c-document-modal__body modal-body">
        <AlertDocumentNotAvailable question={activeQuestion} />
        <Row className="justify-content-center">
          <Col className="c-question__col-full-section-details" sm="12" md="12" xs="12">
            <QuestionContent
              alternatives={activeQuestion.alternatives}
              statement={activeQuestion.statement}
              resolution={activeQuestion.resolution}
              learningObjects={activeQuestion.learning_objects}
              options={options}
            />
            <QuestionInfo question={activeQuestion} showReportError={false} />
          </Col>
        </Row>
        <div className="modal__footer modal-footer">
          <Button color="secondary" onClick={closeModal}>
            Fechar
          </Button>
        </div>
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

QuestionModal.propTypes = {
  closeModal: PropTypes.func,
};

QuestionModal.defaultProps = {
  closeModal: f => f,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionModal);
