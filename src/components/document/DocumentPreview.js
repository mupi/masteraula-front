import React from 'react';
import { Row,  Container, Col, Label, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import QuestionContent from "../../components/question/QuestionContent.js";
import QuestionHeader from "../../components/question/QuestionHeader.js";
import QuestionInfo from "../../components/question/QuestionInfo.js";
import DisciplineList from "components/disciplines/DisciplineList"
import QuestionSourceYear from "components/question/QuestionSourceYear"
import 'font-awesome/css/font-awesome.min.css';

class DocumentPreview extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      question: ''
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(question) {
    if(question){
    this.setState({
      question: question
    });
    }else{
      this.setState({
        question: ''
      });
    }
  }

    
  render(){
    let {props} = this;
    let questions = [];
    for(let i=0; i<props.data.questions.length;i++){
      let question = props.data.questions[i];
        questions.push(
        <div className="question-section-border">
          <Row>
            <Col sm='2'>
              <DisciplineList list={question.disciplines} />
            </Col>
            <Col sm='2'>
              <QuestionSourceYear styleTag="top-label-question source-name" source={question.source} year={question.year}/>
            </Col>
            <Col sm={{ size: 'auto', offset: 6 }}>
              <Button color='danger'><i className="fa fa-trash"></i></Button>
            </Col>
          </Row>
          <Row>
            <Col sm='0.5'>
              <b>{i+1})</b>
            </Col>
            <Col>
              <QuestionContent question={question.question} />
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 'auto', offset: 8 }}>
              <Button onClick={()=>this.toggle(question)}>Ver mais</Button>
            </Col>
          </Row>
          
        </div>
      );
    }

  return(
             <Container> 
              <div className="question-section-border">
              <Row>
                <Col sm={{ size: 'auto', offset: 9 }}>
                  <Button color="success">Adicionar questões</Button>
                </Col>
              </Row>
              <Container> 
                <Row className="question-section-border">
                  <Col xs='2'>
                  <img src={props.data.logo? props.data.logo : "http://via.placeholder.com/100x100"}/>
                  </Col>
                  <Col>
                    <Label>{props.data.schoolName ? props.data.schoolName: 'Nome da instituição'}</Label><br/>
                    <Label>{props.data.course ? props.data.course : "Curso/Disciplina"}</Label>{' | '}
                    <Label>{props.data.teacherName ? props.data.teacherName : "Professor(a)"}</Label><br/>
                   {props.data.studentName? <p>Nome: ________________________________________________________</p>:''}
                   {props.data.class? 'Turma: _________  ':''}
                   {props.data.date? 'Data: ___/___/___  ':''}
                   {props.data.grade? 'Nota: _______  ':''}
                  </Col>
                  <Col sm={{ size: 'auto', offset: 3 }}>
                  </Col>
                </Row>
              </Container><p/>
                      {questions}
              {this.state.question?
              <Modal isOpen={this.state.question} toggle={()=>this.toggle()} size='lg'>
                <ModalHeader toggle={()=>this.toggle()} />
                <ModalBody >
                  <QuestionHeader disciplines={this.state.question.disciplines} source={this.state.question.source} year={this.state.question.year} />
                      <QuestionContent alternatives={this.state.question.alternatives} question={this.state.question.question} answer={this.state.question.answer}/>
                      <QuestionInfo disciplines={this.state.question.disciplines}
                                    teachingLevels={this.state.question.teachingLevels}
                                    descriptors={this.state.question.descriptors}
                                    tags={this.state.question.tags}
                                    difficulty={this.state.question.difficulty}
                                    author={this.state.question.author}/>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={()=>this.toggle()}>Fechar</Button>{' '}
                  <Button color="danger" onClick={()=>this.toggle()}>remover</Button>
                </ModalFooter>
              </Modal>
                :''}
              </div>
              <Row>
                <Col sm={{ size: 'auto', offset: 9 }}>
                  <Button> Confirmar</Button>
                </Col>
              </Row>
              </Container>);
  }
}

export default DocumentPreview;         