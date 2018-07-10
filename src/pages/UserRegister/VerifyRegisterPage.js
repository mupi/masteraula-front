import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { Container, Row, Col,Alert, Button, Form } from 'reactstrap';
import LoginModal from 'components/login/LoginModal';
import { connect } from 'react-redux'
import {  toggleModal } from 'actions/loginAction';
import { Link } from 'react-router-dom'


import 'bootstrap/dist/css/bootstrap.css';
import 'assets/css/General.css';

class VerifyRegisterPage extends React.Component {

  componentDidMount(){
    const {  match } = this.props
    this.props.verifyEmail(match.params.key)
  }

  render() {
    return(
      <div className="page main-contenedor middle-box">
        <Container>
          {this.props.success && <Alert color="success" className="text-center">
            <p><i className="fa fa-sign-in"></i> Parabéns!, seu cadastro foi ativado com sucesso.</p>
          </Alert>
          }
          {this.props.error && <Alert color="danger" className="text-center">
            <p><i className="fa fa-exclamation-circle "></i> Link inválido! </p>
          </Alert>
          }
          <div className="row justify-content-center text-center">
            <Col sm="12" xs="12">
                  <Button><Link to="#" onClick={ () => toggleModal(this.props.modal) }>Login</Link></Button>
            </Col>
          </div>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  modal : state.login.modal
})

const mapDispatchToProps = dispatch => ({
  toggleModal : modal => dispatch(toggleModal(modal))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
(VerifyRegisterPage);
