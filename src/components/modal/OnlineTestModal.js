import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { hideModal } from 'actions/modalAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OnlineTestBasicInfo from 'components/onlineTest/OnlineTestBasicInfo';
import OnlineTestQuestions from 'components/onlineTest/OnlineTestQuestions';

import {
  Row, Alert, Col, Button,
}
  from 'reactstrap';

const AlertDocumentNotAvailable = ({ onlineTest }) => (
  onlineTest.disabled ? (
    <Row>
      <Col className="c-question__col-full-section-details">
        <Alert color="danger" className="c-question-edit__warning-message">
          A prova online
          {' '}
          N°
          <strong>{onlineTest.id}</strong>
          {' '}
          foi removida pelo autor(a) e não está mais disponível
        </Alert>
      </Col>
    </Row>
  ) : ''
);

// Question's options available for OnlineTest
const optionsQuestion = {
  showViewModal: false,
  removeOption: false,
  showTag: false,
  showScore: false,
};

const OnlineTestModal = (props) => {
  const {
    id, closeModal, isFetching, fetchOnlineTest, activeOnlineTest,
  } = props;


  useEffect(() => {
    fetchOnlineTest(id);
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
          {'Prova Online'}
        </h6>
        <button type="button" className="close" aria-label="Close" onClick={closeModal}>
          <span aria-hidden="true">
            &times;
          </span>
        </button>
      </div>
      { activeOnlineTest && (
      <div className="c-document-modal__body modal-body">
        <AlertDocumentNotAvailable onlineTest={activeOnlineTest} />
        <Row className="justify-content-center">
          <Col className="c-question__col-full-section-details" sm="12" md="12" xs="12">
            <h4>
              <FontAwesomeIcon
                icon="circle"
                className={`c-online__status ${activeOnlineTest.status ? 'c-online__status--active' : 'c-online__status--inactive'}`}
                title={activeOnlineTest.status ? 'Prova Ativa' : 'Prova Inativa'}
              />
              {' '}
              <FontAwesomeIcon icon="laptop" />
              {' '}
              {'Prova Online : '}
              <span className="c-online__name">{activeOnlineTest.name}</span>
            </h4>
            <p style={{ marginBottom: '0px' }}>
              {'Derivada da prova: '}
              <strong className="c-online__base-name">{activeOnlineTest.document.name}</strong>
            </p>
            <OnlineTestBasicInfo onlineTest={activeOnlineTest} />
            <OnlineTestQuestions
              questions={activeOnlineTest.questions_document}
              options={optionsQuestion}
            />
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
  isFetching: state.onlineTest.isFetchingOnlineTest,
  activeOnlineTest: state.onlineTest.activeOnlineTest,
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
});

OnlineTestModal.propTypes = {
  closeModal: PropTypes.func,
};

OnlineTestModal.defaultProps = {
  closeModal: f => f,
};

export default connect(mapStateToProps, mapDispatchToProps)(OnlineTestModal);
