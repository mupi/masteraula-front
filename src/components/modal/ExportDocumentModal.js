import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Label,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  listMyHeadersCombo,
} from 'actions/headerAction';
import { downloadDocument } from 'actions/documentAction';

class ConfirmExportModal extends React.PureComponent {
  render() {
    const {
      closeModal, documentName, title, handleSubmit,
    } = this.props;

    return (
      <div className="modal__content modal-content c-export-document">
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
          <Form onSubmit={handleSubmit}>
            <p className="text-center">
              {'Selecione as opções para exportar sua prova '}
              <strong>{documentName}</strong>
            </p>
            <p className="c-export-document__option-name">
              Com ou sem gabarito?
            </p>
            <FormGroup className="c-export-document__answers-section">
              <div>
                <Label className="c-export-document__answers-label">
                  <Field
                    name="answers"
                    component="input"
                    type="radio"
                    value="false"
                  />
                  Sem gabarito
                </Label>
                <Label className="c-export-document__answers-label">
                  <Field
                    name="answers"
                    component="input"
                    type="radio"
                    value="true"
                  />
                  Com gabarito
                </Label>
              </div>
            </FormGroup>
            <p className="c-export-document__option-name">
              Com ou sem vestibular/ano?
            </p>
            <FormGroup className="c-export-document__answers-section">
              <div>
                <Label className="c-export-document__answers-label">
                  <Field
                    name="sources"
                    component="input"
                    type="radio"
                    value="false"
                  />
                  Sem vestibular/ano
                </Label>
                <Label className="c-export-document__answers-label">
                  <Field
                    name="sources"
                    component="input"
                    type="radio"
                    value="true"
                  />
                  Com vestibular/ano
                </Label>
              </div>
            </FormGroup>
            <div className="modal-footer modal__footer">
              <Button className="btn--confirm" type="submit">
                Exportar
              </Button>
              <Button color="secondary" onClick={closeModal}>
                Cancelar
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

ConfirmExportModal.propTypes = {
  closeModal: PropTypes.func,
  title: PropTypes.string,
};

ConfirmExportModal.defaultProps = {
  closeModal: f => f,
  title: '',
};

const mapStateToProps = state => ({
  modal: state.document.modal,
  initialValues: {
    answers: 'false',
    sources: 'true',
  },
  enableReinitialize: true,
});

const mapDispatchToProps = dispatch => ({
  listMyHeadersCombo: () => dispatch(listMyHeadersCombo()),
  onSubmit: (values, _2, props) => {
    const exportOptions = {
      answers: values.answers === 'true',
      sources: values.sources === 'true',
      documentId: props.documentId,
      documentName: props.documentName,
    };
    return dispatch(downloadDocument(exportOptions));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'exportDocumentModal',
})(ConfirmExportModal));
