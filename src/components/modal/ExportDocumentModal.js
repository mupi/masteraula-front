import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Input, Label, Container, Row, Col,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';


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

  }

  render() {
    const {
      closeModal, documentId, documentName, downloadDocument, title,
    } = this.props;

    const headerList = {
      results: [{ id: 1, name: 'cabeçalho 1' }, { id: 2, name: 'cabeçalho turma 1' }],
    };

    return (
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
          <p>
            Selecione as opções para exportar sua prova
            {' '}
            <strong>{documentName}</strong>
          </p>
          <FormGroup>
            <Field
              name="headerDocument"
              type="text"
              component={renderSelectField}
              className="form-control"
              label="Sem cabeçalho"
            >
              { headerList.results && headerList.results.map(header => (
                <option className="c-export-document__" key={header.id} value={header.id}>
                    {header.name}
                            </option>
                          )) }
                        </Field>

                      </FormGroup>

            <FormGroup>
              <label>
                <Field
                  name="sex"
                  component="input"
                  type="radio"
                  value="male"
                  className="form-group"
                />{' '}
                Sem gabarito
              </label>
              <label>
                <Field
                  name="sex"
                  component="input"
                  type="radio"
                  value="female"
                  className="form-group"

                />{' '}
                Com gabarito
              </label>
              </FormGroup>




                <div className="modal-footer modal__footer">
                  <Button className="btn--confirm">
                    Apagar
                  </Button>
                  <Button color="secondary" onClick={closeModal}>
                    Cancelar
                  </Button>
                </div>

        </div>
        
      </div>
)
  }
}

  
    ConfirmExportModal.propTypes = {
    closeModal: PropTypes.func,
    toggleModal: PropTypes.func,
    downloadDocument: PropTypes.func,
    title: PropTypes.string,
    message: PropTypes.string,
    modal: PropTypes.bool,
  };
  
    ConfirmExportModal.defaultProps = {
    closeModal: f => f,
    toggleModal: f => f,
    downloadDocument: f => f,
    title: '',
    message: '',
    modal: false,
  };
  export default reduxForm({
    form: 'exportDocumentModal' // a unique identifier for this form
  })(ConfirmExportModal)

