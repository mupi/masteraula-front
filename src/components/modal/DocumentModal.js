import React from 'react';
import PropTypes from 'prop-types';

import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button,
}
  from 'reactstrap';

const DocumentModal = ({
  closeModal, confirmAction, title, message,
}) => (
  <div className="modal__content modal-content">
    <div className="modal__header modal-header">
      <h5
        className="modal-title"
      >
        {title}
      </h5>
      <button type="button" className="close" aria-label="Close" onClick={closeModal}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="modal-body">
      <p>{message}</p>
      <div className="modal__footer modal-footer">
      <button type="button" className="btn btn-secondary" onClick={closeModal}><i className="fa fa-sign-out btn__icon" />
      Fechar</button>
      <button color="primary" className="btn--confirm btn btn-secondary" onClick={confirmAction}>
        <i className="fa fa-check-circle btn__icon" />
        Continuar
      </button>
    </div>
    </div>
    
  </div>
);

<Modal className="c-document-modal" isOpen={!!this.state.document} toggle={() => this.toggle()} size="lg">
              <ModalHeader toggle={() => this.toggle()}>
                <div>
                  {this.state.document.name}
                </div>
              </ModalHeader>
              <ModalBody className="c-document-modal__body">
                <Row>
                  <div className="auto-margin-left-element btn-margin-right">
                    <ExportDocumentButton color="success" />
                  </div>
                  <div>
                    <Button title="Editar documento" className="btn-success" onClick={()=>this.editDocument(this.state.document)}>
                      <i className="fa fa-pencil btn__icon" />
                      <span className="button-text">Editar</span>
                    </Button>
                  </div>
                </Row>
                <Row className="c-document-modal__header-info">
                  <Col xs="2">
                    <Label for="upload-avatar" className="upload-avatar">
                      <div className="thumbnail">
                        <img src={this.state.document.logo ? this.state.document.logo : 'http://via.placeholder.com/100x100'} alt="logo-documento" />
                      </div>
                    </Label>
                  </Col>
                  <Col>
                    <Label>
                      {this.state.document.institution_name ? this.state.document.institution_name : 'Nome da instituição'}
                    </Label>
                    <br />
                    <Label>
                        {this.state.document.discipline_name ? this.state.document.discipline_name : 'Curso/Disciplina'}
                    </Label>
                    {' | '}
                    <Label>
                      {this.state.document.professor_name ?
                          this.state.document.professor_name : 'Professor(a)'}
                    </Label>
                      <br />
                    {this.state.document.student_indicator ? (
                        <p>Nome:</p>
                    ) : ''}
                    {this.state.document.class_indicator ? 'Turma: _________  ' : ''}
                    {this.state.document.date_indicator ? 'Data: ___/___/___  ' : ''}
                    {this.state.document.score_indicator ? 'Nota: _______  ' : ''}
                    </Col>
                  </Row>
                {this.state.document.questions.map((question, i) => (
                  <div key={i} className="c-document-modal__question">
                    <Row>
                      <Col sm="12">
                        <DisciplineList list={question.disciplines} />
                        <QuestionSourceYear source={question.source} year={question.year} />
                      </Col>
                    </Row>
                    <Row>
                      <div className="c-document-modal__question-content">
                        <b className="c-document-modal__question-number">
                          {i + 1}
                          {')'}
                        </b>
                        {' '}
                        <QuestionContent statement={question.question} />
                      </div>
                    </Row>
                  </div>

                ))}
              </ModalBody>
              <ModalFooter className="c-document-modal__footer">
                <Button color="primary" onClick={() => this.toggle()}>
                  <i className="fa fa-sign-out btn__icon" />
                  Fechar
                </Button>
                <Button color="danger" onClick={() => this.toggle()}>
                  <i className="fa fa-trash btn__icon" />
                  Apagar
                </Button>
              </ModalFooter>
            </Modal>
 
DocumentModal.propTypes = {
  closeModal: PropTypes.func,
  confirmAction: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
};

DocumentModal.defaultProps = {
  closeModal: f => f,
  confirmAction: f => f,
  title: '',
  message: '',
};

export default DocumentModal;
