import React, { Component } from 'react';
import { Row, Input, Container, Col, Label, Button } from 'reactstrap';

const DocumentForm =() =>
             <Container> 
              Nome: <Input /><br/>
              Cabeçalho (padrão):<p/>
              <Container>
                <Row>
                  <Col xs='2'>
                  Logo<br/>
                  <img src="http://via.placeholder.com/100x100"/>
                  </Col>
                  <Col>
                    <Input placeholder="Nome da instituição"/>
                    <Input placeholder="Curso/Disciplina"/>
                    <Input placeholder="Professor(a)"/><br/>
                    Mostrar os seguintes campos em branco:<br/>
                    <Row>
                      <Col>
                        <Input addon type="checkbox" aria-label="Checkbox for following text input" /> Aluno<br/>
                        <Input addon type="checkbox" aria-label="Checkbox for following text input" /> Turma<br/>
                      </Col>
                      <Col>
                        <Input addon type="checkbox" aria-label="Checkbox for following text input" /> Nota da avaliação<br/>
                        <Input addon type="checkbox" aria-label="Checkbox for following text input" /> Data
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container><p/>

              <Row>Selecione o formato do template como serão apresentadas as questões: </Row><p/>
              <Row>
                <Col sm="12" md={{ size: 8, offset: 2 }}>
                  <Container>
                  Uma coluna
                  </Container>
                </Col>
              </Row>
              <Row>
                <Col sm={{ size: 'auto', offset: 10 }}>
                  <Button> Visualizar</Button>
                </Col>
              </Row>
              </Container>

export default DocumentForm;         