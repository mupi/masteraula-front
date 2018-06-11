import React from 'react';
import { Button, Form, FormGroup, Input, Label} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { FontAwesome} from 'react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import userPhoto from "../../img/home/person-female.png";


const UserProfile = () =>
      <div className="row justify-content-center">
        <div className="col-sm-5 col-md-5 col-lg-6 col-xs-12">
          <Form>
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
                                  <img src={userPhoto}/>
                                </div>
                        </Label>
                        <div className="small-text">Tamano máximo 1 MB. JPG, GIF ou PNG</div>
                        <Input type="file" name="picture" id="upload-avatar" className="hidden"/>

                    </Col>
                    <Col sm="8" xs="12">
                      <FormGroup>
                        <Label>Nome completo</Label>
                        <Input
                          type="text"
                          name="nome-completo"
                          id="nome-completo"
                          placeholder="Ingrese seu nome completo"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Sobre mim</Label>
                        <Input
                          type="textarea"
                          name="sobre-mim"
                          id="sobre-mim"
                          placeholder=""
                        />
                      </FormGroup>

                    </Col>
                  </Row>
              </Container>
              <Container>
                    <Row  className="section-user-title">
                      <FormGroup>
                        <h4>Minha Conta</h4>
                      </FormGroup>
                    </Row>
                    <Row>
                      <Col sm="4">
                        Email
                      </Col>
                      <Col sm="4">
                        <Label>usuario@masteraula.com.br</Label>
                      </Col>
                    </Row>
                    <Row className="sub-section-user-title">
                      <h5>Trocar senha</h5>
                    </Row>
                    <Row>
                        <Col sm="4"><Input
                          type="password"
                          name="password"
                          id="senha-atual"
                          placeholder="Senha Atual"
                        /></Col>
                        <Col sm="4"><Input
                          type="password"
                          name="password"
                          id="nova-senha"
                          placeholder="Nova senha"
                        /></Col>
                        <Col sm="4"><Input
                          type="password"
                          name="password"
                          id="confirma-nova-senha"
                          placeholder="Confirme nova senha"
                        /></Col>
                    </Row>


                  <Row className="section-user-title">
                    <Col className="text-center">
                      <Button>Salvar</Button>
                    </Col>
                  </Row>
            </Container>
          </Form>
        </div>
    </div>
export default UserProfile;
