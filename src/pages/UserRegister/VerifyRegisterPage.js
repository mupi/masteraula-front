import React from 'react';
import {
  Container, Row, Col, Alert, Button,
} from 'reactstrap';
import { toggleModal } from 'actions/loginAction';
import { Link } from 'react-router-dom';


class VerifyRegisterPage extends React.Component {
  componentDidMount() {
    const { match } = this.props;
    this.props.verifyEmail(match.params.key);
  }

  render() {
    return (
      <div className="l-site-masteraula__public-home middle-box">
        <Container className="l-user-operations c-verify-register">
          {this.props.success && (
          <Alert color="success" className="text-center">
            <p className="alert__message">
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
          <Row className="justify-content-center text-center">
            <Col sm="12" xs="12">
              <Button onClick={() => this.props.toggleModal(this.props.modal)}>
Login
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default VerifyRegisterPage;
