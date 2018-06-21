import React from 'react';
import { Row,  Container, Col, Label, Button } from 'reactstrap';
import QuestionContent from "../../components/question/QuestionContent.js";

const DocumentPreview = (props) => {
    
  let questions = [];
  for(let i=0; i<props.data.questions.length;i++){
    let question = props.data.questions[i];
     questions.push(
       <div>
         <b>Questão {i+1}:</b>
         <QuestionContent question={question.question} />
         <Row>
           <Col sm={{ size: 'auto', offset: 8 }}>
             <Button>Ver mais</Button>
             <Button color='danger'>Remover</Button>
           </Col>
         </Row>
       </div>
       );
  }

  return(
             <Container> 
              <div className="question-section-border">
              <Container> 
                <Row>
                  <Col xs='2'>
                  <img src={props.data.logo? props.data.logo : "http://via.placeholder.com/100x100"}/>
                  </Col>
                  <Col>
                    <Label>{props.data.schoolName ? props.data.schoolName: 'Nome da instituição'}</Label><br/>
                    <Label>{props.data.course ? props.data.course : "Curso/Disciplina"}</Label>{' | '}
                    <Label>{props.data.teacherName ? props.data.teacherName : "Professor(a)"}</Label>
                   {props.data.studentName? <p>Nome: ________________________________________________________</p>:''}
                   {props.data.class? 'Turma: _________  ':''}
                   {props.data.date? 'Data: ___/___/___  ':''}
                   {props.data.grade? 'Nota: _______  ':''}
                  </Col>
                </Row>
              </Container><p/>
                      {questions}
              </div>
              <Row>
                <Col>
                  <Button>Adicionar mais questões</Button>
                </Col>
                <Col sm={{ size: 'auto', offset: 5 }}>
                  <Button> Confirmar</Button>
                </Col>
              </Row>
              </Container>);
            }

export default DocumentPreview;         