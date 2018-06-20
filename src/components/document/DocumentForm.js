import React, { Component } from 'react';
import { Row, Input, Container, Col, Label, Button } from 'reactstrap';

const DocumentForm =() => {
      return(<Container> 
              Nome: <Input /><br/>
              <Container >
              Cabeçalho (padrão):<p/>
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
              </Container>

              </Container>
              )}

export default DocumentForm;