import React from 'react';
import { connect } from 'react-redux'
import { Button, Form, FormGroup, Input, Label, UncontrolledAlert} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'
import 'bootstrap/dist/css/bootstrap.css';
import userPhoto from "assets/img/home/person-female.png";

const renderField = ({
  input,
  placeholder,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <Input {...input}
      placeholder={placeholder}
      type={type}
    />
    { touched &&
      ((error && <span>{error}</span>) ||
      (warning && <span> {warning} </span>))
    }
  </div>
);

const UserProfile = props => {
  const { handleSubmit, user, submitSucceeded } = props

    return (
          <Form onSubmit={ handleSubmit }>
            <Container>
              <Row className="section-user-title">
                <FormGroup>
                  <h4>Dados básicos</h4>
                </FormGroup>
              </Row>
              <Row>
                <Col sm="4" xs="12" className="text-center">
                  <Label for="upload-avatar" className="upload-avatar">
                    <span><i className="fa fa-picture-o"></i>Enviar foto</span>
                    <div className="thumbnail">
                      <img src={ userPhoto } alt="foto-usuario"/>
                    </div>
                  </Label>
                  <div className="small-text">Tamano máximo 1 MB. JPG, GIF ou PNG</div>
                  <Field
                    component="input"
                    type="file"
                    name="picture"
                    id="upload-avatar"
                    className="hidden"
                  />

                </Col>
                <Col sm="8" xs="12">
                  <FormGroup>
                    <Label>Nome completo</Label>
                    <Field
                      component="input"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Ingrese seu nome completo"
                      className="form-control"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Sobre mim</Label>
                    <Field
                      component="textarea"
                      name="about_me"
                      id="about_me"
                      placeholder=""
                      className="form-control"
                    />
                  </FormGroup>

                </Col>
              </Row>
              <Row className="section-user-title">
                <Col className="text-center">
                  <Button>Salvar</Button>
                </Col>
              </Row>
            </Container>
          </Form>
  )
}



const mapStateToProps = state => {
  const { user } = state.session.session
  return ({
    initialValues : {
      name : user.name
    },
    user
  })
}

export default connect(
  mapStateToProps
)
(reduxForm({
  form: 'profile'
})(UserProfile));
