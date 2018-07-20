import React from 'react';
import {
  Container, Col, Alert, Button,
} from 'reactstrap';
import { toggleModal } from 'actions/loginAction';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'assets/css/General.css';

class VerifyRegisterPage extends React.Component {
  componentDidMount() {
    const { match } = this.props;
    this.props.verifyEmail(match.params.key);
  }

  render() {
    return (
      <div className="page main-contenedor middle-box">
        <Container>
          {this.props.success && (
          <Alert color="success" className="text-center">
            <p>
              <i className="fa fa-sign-in" />
              {' '}
Parabéns!, seu cadastro foi ativado com sucesso.
            </p>
          </Alert>
          )
          }
          {this.props.error && (
          <Alert color="danger" className="text-center">
            <p>
              <i className="fa fa-exclamation-circle " />
              {' '}
Link inválido!
            </p>
          </Alert>
          )
          }
          <div className="row justify-content-center text-center">
            <Col sm="12" xs="12">
              <Button onClick={() => this.props.toggleModal(this.props.modal)}>
Login
              </Button>
            </Col>
          </div>
        </Container>
      </div>
    );
  }
}
export default VerifyRegisterPage;
