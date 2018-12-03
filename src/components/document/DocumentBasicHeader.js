import React, { Component } from 'react';
import {
  Row, Col, Label, Button, Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Field, reduxForm, Form } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <Input
      {...input}
      placeholder={label}
      type={type}
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

class DocumentBasicHeader extends Component {
  fileSelectedHandler= () => {
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="c-document__header">
        <Form onSubmit={handleSubmit}>
          Nome da prova:
          <Field
            component={renderField}
            type="text"
            name="name"
            id="name"
            label="Nome da prova"
          />
          <Row className="c-document__main-buttons text-center">
            <Col>
              <Button type="submit" title="Salvar prova" className="btn-secondary btn-margin-right">
                <FontAwesomeIcon
                  className="btn__icon"
                  icon="save"
                />
                <span>
                  Salvar
                </span>
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    initialValues: ownProps.data,
  };
}

export default connect(mapStateToProps)(reduxForm({
  form: 'header_form',
  enableReinitialize: true,
})(DocumentBasicHeader));
