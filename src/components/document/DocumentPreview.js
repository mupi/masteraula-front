import React from 'react';
import { Row,  Container, Col, Label, Button, Modal, ModalBody, ModalFooter, ModalHeader, Input } from 'reactstrap';
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
        <div key={i} className="question-section-border question-in-doc">
            <div className="btn-float-remove-question">
                    <button title="Remover questão" type="button" className="btn btn-default btn-circle btn-xl btn-lateral"><i className="fa fa-trash"></i></button>
            </div>
          <Row>
            <Col sm='2'>
              <DisciplineList list={question.disciplines} />
            </Col>
            <Col sm='2'>
              <QuestionSourceYear styleTag="top-label-question source-name" source={question.source} year={question.year}/>
            </Col>
          </Row>
          <Row>
            <div className="question-content-in-doc">
              <span className="question-position">{i+1})</span> <QuestionContent question={question.question} />
            </div>
          </Row>
          <Row>
            <div className="auto-margin-left-element">
              <Button onClick={()=>this.toggle(question)}><i className="fa fa-search"></i> <span className="button-text">Ver mais</span></Button>
            </div>
          </Row>

        </div>
      );
    }

  return(
             <Container>
              <div >
                <div className="btn-float">
                        <button title="Adicionar questões" type="button" className="btn btn-default btn-circle btn-xl btn-lateral"><i className="fa fa-plus"></i></button>
                </div>
                <Row className="btn-preview-document">
                  <div className="auto-margin-left-element">
                    <Button title="Adicionar questões" className="btn-success btn-margin-right"> <i className="fa fa-plus"></i><span className="button-text">Adicionar questões</span></Button>
                  </div>
                  <div>
                    <Button title="Salvar documento" className="btn-success"> <i className="fa fa-save"></i><span className="button-text">Salvar</span></Button>
                  </div>
                </Row>
              <Container>
                <Row className="question-section-border document-header">
                  <Col xs='2'>
                    <Label for="upload-avatar" className="upload-avatar">

                            <div className="thumbnail">
                              <img src={props.data.logo? props.data.logo : "http://via.placeholder.com/100x100"}/>
                            </div>
                    </Label>
                  </Col>
                  <Col>
                    <Label>{props.data.schoolName ? props.data.schoolName: 'Nome da instituição'}</Label><br/>
                    <Label>Curso/Disciplina: {props.data.course ? props.data.course : ""}</Label><br/>
                    <Label>Professor(a): {props.data.teacherName ? props.data.teacherName : ""}</Label><br/>
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
                <ModalBody className="question-modal">
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

              </Container>);
  }
}

export default DocumentPreview;
