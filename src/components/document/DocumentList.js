import React from 'react';
import {
  Row, Col, Table, Modal, ModalHeader, ModalBody, Container, Label, Button, ModalFooter,
} from 'reactstrap';
import DisciplineList from 'components/disciplines/DisciplineList';
import QuestionSourceYear from 'components/question/QuestionSourceYear';
import ExportDocumentButton from 'components/buttons/ExportDocumentButton';
import QuestionContent from '../question/QuestionContent.js';

class DocumentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      document: '',
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(document) {
    if (document) {
      this.setState({
        document,
      });
    } else {
      this.setState({
        document: '',
      });
    }
  }

  render() {
    return (
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>
                <center>
Nome
                </center>
              </th>
              <th>
                <center>
Data de criação
                </center>
              </th>
              <th>
                <center>
Nº de questões
                </center>
              </th>
              <th>
                <center>
Apagar
                </center>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.documents.map((document, i) => (
              <tr key={i}>
                <th scope="row" onClick={() => this.toggle(document)}>
                  <center>
                    {document.name}
                  </center>
                </th>
                <td>
                  <center>
                    {document.createdAt}
                  </center>
                </td>
                <td>
                  <center>
                    {document.questions.length}
                  </center>
                </td>
                <td>
                  <center>
                    <Button color="danger">
                      <i className="fa fa-trash" />
                    </Button>
                  </center>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {this.state.document
          ? (
            <Modal isOpen={!!this.state.document} toggle={() => this.toggle()} size="lg">
              <ModalHeader toggle={() => this.toggle()}>
                <div>
                  {this.state.document.name}
                </div>
              </ModalHeader>
              <ModalBody className="question-modal">
                <Row>
                  <div className="auto-margin-left-element">
                    <ExportDocumentButton color="success" />
                  </div>
                  <div>
                    <Button title="Editar documento" className="btn-success btn btn-secondary">
                      <i className="fa fa-pencil" />
                      <span className="button-text">
Editar
                      </span>
                    </Button>
                  </div>
                </Row>
                <Container>


                  <Row className="question-section-border document-header">
                    <Col xs="2">
                      <Label for="upload-avatar" className="upload-avatar">
                        <div className="thumbnail">
                          <img src={this.state.document.logo ? this.state.document.logo : 'http://via.placeholder.com/100x100'} alt="logo-documento" />
                        </div>
                      </Label>
                    </Col>
                    <Col>
                      <Label>
                        {this.state.document.schoolName ? this.state.document.schoolName : 'Nome da instituição'}
                      </Label>
                      <br />
                      <Label>
                        {this.state.document.course ? this.state.document.course : 'Curso/Disciplina'}
                      </Label>
                      {' | '}
                      <Label>
                        {this.state.document.teacherName ? this.state.document.teacherName : 'Professor(a)'}
                      </Label>
                      <br />
                      {this.state.document.studentName ? (
                        <p>
Nome: ________________________________________________________
                        </p>
                      ) : ''}
                      {this.state.document.class ? 'Turma: _________  ' : ''}
                      {this.state.document.date ? 'Data: ___/___/___  ' : ''}
                      {this.state.document.grade ? 'Nota: _______  ' : ''}
                    </Col>
                  </Row>
                </Container>
                {this.state.document.questions.map((question, i) => (
                  <div key={i} className="question-section-border question-in-doc">
                    <Row>
                      <Col sm="4">
                        <DisciplineList list={question.disciplines} />
                      </Col>
                      <Col sm="4">
                        <QuestionSourceYear styleTag="top-label-question source-name" source={question.source} year={question.year} />
                      </Col>
                    </Row>
                    <Row>
                      <div className="question-content-in-doc">
                        <b className="question-position">
                          {i + 1}
)
                        </b>
                        {' '}
                        <QuestionContent question={question.question} />
                      </div>
                    </Row>
                  </div>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => this.toggle()}>
Fechar
                </Button>
                <Button color="danger" onClick={() => this.toggle()}>
Apagar
                </Button>
              </ModalFooter>
            </Modal>
          ) : ''}
      </div>
    );
  }
}

export default DocumentList;
