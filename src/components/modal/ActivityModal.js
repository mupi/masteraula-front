import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { hideModal } from 'actions/modalAction';
import LearningObjectList from 'components/learningObject/LearningObjectList';
import ActivityInfo from 'components/activity/ActivityInfo';
import ActivityTasks from 'components/activity/ActivityTasks';

import {
  Row, Alert, Col, Button,
}
  from 'reactstrap';

const AlertDocumentNotAvailable = ({ activity }) => (
  activity.disabled ? (
    <Row>
      <Col className="c-question__col-full-section-details">
        <Alert color="danger" className="c-question-edit__warning-message">
          A atividade
          {' '}
          N°
          <strong>{activity.id}</strong>
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


const ActivityModal = (props) => {
  const {
    idActivity, closeModal, isFetching, fetchActivity, activeActivity,
  } = props;


  useEffect(() => {
    fetchActivity(idActivity);
  }, []);

  if (isFetching) {
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
          {`Atividade Nº ${idActivity}`}
        </h6>
        <button type="button" className="close" aria-label="Close" onClick={closeModal}>
          <span aria-hidden="true">
            &times;
          </span>
        </button>
      </div>
      { activeActivity && (
      <div className="c-document-modal__body modal-body">
        <AlertDocumentNotAvailable activity={activeActivity} />
        <Row className="justify-content-center">
          <Col className="c-question__col-full-section-details" sm="12" md="12" xs="12">
            {(activeActivity.learning_objects && activeActivity.learning_objects.length > 0)
              ? (
                <LearningObjectList
                  learningObjects={activeActivity.learning_objects}
                  options={options}
                />
              ) : ''}
            {activeActivity && (
            <ActivityTasks
              tasks={activeActivity.tasks}
            />
            )}
            <ActivityInfo activity={activeActivity} />
          </Col>
        </Row>
        <div className="modal__footer modal-footer">
          <Button color="secondary" onClick={closeModal}>
            Fechar
          </Button>
        </div>
      </div>
      )}
    </div>
  );
};


const mapStateToProps = state => ({
  isFetching: state.activity.isFetching,
  activeActivity: state.activity.activeActivity,
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
});

ActivityModal.propTypes = {
  closeModal: PropTypes.func,
};

ActivityModal.defaultProps = {
  closeModal: f => f,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityModal);
