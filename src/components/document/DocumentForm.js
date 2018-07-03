import React, { Component } from 'react';
import { Row, Input, Container, Col, Label, Button } from 'reactstrap';
import QuestionContent from "../../components/question/QuestionContent.js";

class DocumentForm extends Component {

  constructor(props) {
    super(props);
   }

  render(){
    return(
      <Container className="create-document-header">
       Nome: <Input placeholder="Nome do documento" id='name' className="form-group" onChange={(event)=>this.props.setFields('name',event)}/><br/>
       <Container>
         <Row>
         Cabeçalho:
        </Row>
         <Row>
              <Col md="2" xs='12' className="text-center">
                 <Label for="upload-logo" className="upload-logo">
                         <span><i className="fa fa-picture-o"></i>Enviar logo</span>
                         <div className="thumbnail">
                           <img src="http://via.placeholder.com/100x100"/>
                         </div>
                 </Label>
                 <div className="small-text">Tamano máximo 1 MB. JPG, GIF ou PNG</div>
                 <Input type="file" name="picture" id="upload-logo" className="hidden"/>
              </Col>
              <Col>
                <Input placeholder="Nome da instituição" id='schoolName' className="form-group" onChange={(event)=>this.props.setFields('schoolName',event)}/>
                <Input placeholder="Curso/Disciplina" id='course' className="form-group" onChange={(event)=>this.props.setFields('course',event)}/>
                <Input placeholder="Professor(a)" id='teacherName' className="form-group" onChange={(event)=>this.props.setFields('teacherName',event)}/><br/>
                Mostrar os seguintes campos em branco:<br/>
                <Row>
                  <Col><Input addon type="checkbox"  id='allFields' onChange={(event)=>this.props.setFields('allFields',event)}/> Todos<br/></Col>
                </Row>
                <Row>

                  <Col>
                    <Input addon type="checkbox"  checked={this.props.allFields} id='studentName' onChange={(event)=>this.props.setFields('studentName',event)}/> Aluno<br/>
                    <Input addon type="checkbox" checked={this.props.allFields} id='class' onChange={(event)=>this.props.setFields('class',event)}/> Turma<br/>
                  </Col>
                  <Col>
                    <Input addon type="checkbox" checked={this.props.allFields} id='grade' onChange={(event)=>this.props.setFields('grade',event)}/> Nota da avaliação<br/>
                    <Input addon type="checkbox" checked={this.props.allFields} id='date' onChange={(event)=>this.props.setFields('date',event)}/> Data
                  </Col>
                </Row>
              </Col>
         </Row>
       </Container>
       </Container>
              )}
    }

export default DocumentForm;
