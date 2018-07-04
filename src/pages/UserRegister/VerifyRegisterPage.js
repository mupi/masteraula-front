import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'assets/css/General.css';

import { Container, Row, Col } from 'reactstrap';

const VerifyRegisterPage = () =>
    <div className="page main-contenedor middle-box">
      <Container>
        <Alert color="success">
          <p><i className="fa fa fa-sign-in"></i> Seu cadastro foi ativado com sucesso</p>
        </Alert>
        <div className="row justify-content-center">
          <Col sm="12" xs="12">
            <Form>
                <Button>Entrar</Button>
            </Form>
          </Col>
        </div>
      </Container>
    </div>

export default VerifyRegisterPage;
