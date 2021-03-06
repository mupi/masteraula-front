import React from 'react';
import {
  Container, Row, Col, Alert, Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class VerifyRegisterPage extends React.Component {
  componentDidMount() {
    const { match, verifyEmail } = this.props;
    verifyEmail(match.params.key);
  }

  render() {
    const { success, error, showLoginModal } = this.props;

    return (
      <div className="l-site-masteraula__public-home middle-box">
        <Container className="l-user-operations c-verify-register">
          {success && (
          <Alert color="success" className="text-center">
            <p className="alert__message">
              <FontAwesomeIcon icon="sign-in-alt" />
              {' '}
              Parabéns! Seu cadastro foi ativado com sucesso.
            </p>
          </Alert>
          )
          }
          {error && (
          <Alert color="danger" className="text-center">
            <p>
              <FontAwesomeIcon icon="exclamation-circle" />
              {' '}
              Link inválido!
            </p>
          </Alert>
          )
          }
          <Row className="justify-content-center text-center">
            <Col sm="12" xs="12">
              <Button onClick={showLoginModal}>
                Entrar
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default VerifyRegisterPage;
