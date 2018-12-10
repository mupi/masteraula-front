import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Label,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  listMyHeadersCombo,
} from 'actions/headerAction';
import { downloadDocument } from 'actions/documentAction';

const renderSelectField = ({
  input, label, meta: { touched, error }, children, optionDefault,
}) => (
  <div>
    <div>
      <select {...input} className="form-control">
        <option value={optionDefault}>
          {label}
        </option>
        {children}
      </select>
      {touched && error && (
        <span className="error-message-text">
          {error}
        </span>
      )}
    </div>
  </div>
);

class ConfirmExportModal extends React.Component {

  componentDidMount() {
    const { listMyHeadersCombo } = this.props;
    listMyHeadersCombo();
  }

  render() {
    const {
      closeModal, documentName, title, myHeadersListCombo, handleSubmit,
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
              Selecione as opções para exportar sua prova
              {' '}
              <strong>{documentName}</strong>
            </p>
            <p className="c-export-document__option-name">
              Selecione um cabeçalho
            </p>
            <FormGroup className="c-export-document__select">
              <Field
                name="headerDocument"
                type="text"
                component={renderSelectField}
                className="form-control"
                label="Sem cabeçalho"
                optionDefault="NaN"
              >
                { myHeadersListCombo && myHeadersListCombo.map(header => (
                  <option className="c-export-document__select-item" key={header.id} value={header.id}>
                    {header.name}
                  </option>
                )) }
              </Field>
              <Link onClick={closeModal} to="/new-header" className="c-export-document__new-header">
                Criar novo cabeçalho
              </Link>
            </FormGroup>
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
                    value="without"
                  />
                  {' '}
                  Sem gabarito
                </Label>
                <Label className="c-export-document__answers-label">
                  <Field
                    name="answers"
                    component="input"
                    type="radio"
                    value="with"
                  />
                  {' '}
                  Com gabarito
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
  downloadDocument: f => f,
  title: '',
  modal: false,
};

const mapStateToProps = state => ({
  myHeadersListCombo: state.header.myHeadersListCombo,
  modal: state.document.modal,
  initialValues: {
    answers: 'without',
  },
});

const mapDispatchToProps = dispatch => ({
  listMyHeadersCombo: () => dispatch(listMyHeadersCombo()),
  onSubmit: (values) => {
    const exportOptions = {
      headerId: values.headerDocument,
      answer: values.answers,
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
