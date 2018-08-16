import React from 'react';
import {
  Row, Col, Table, Modal, ModalHeader, ModalBody, Container, Label, Button, ModalFooter,
} from 'reactstrap';
import DisciplineList from 'components/disciplines/DisciplineList';
import QuestionSourceYear from 'components/question/QuestionSourceYear';
import ExportDocumentButton from 'components/buttons/ExportDocumentButton';
import QuestionContent from 'components/question/QuestionContent';
import { history } from 'helpers/history';

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

  editDocument(document){
    this.props.switchActiveDocument(document)
    history.push('/edit-document')
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
                    {document.create_date}
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
            <Modal className="c-document-modal" isOpen={!!this.state.document} toggle={() => this.toggle()} size="lg">
              <ModalHeader toggle={() => this.toggle()}>
                <div>
                  {this.state.document.name}
                </div>
              </ModalHeader>
              <ModalBody className="c-document-modal__body">
                <Row>
                  <div className="auto-margin-left-element btn-margin-right">
                    <ExportDocumentButton color="success" />
                  </div>
                  <div>
                    <Button title="Editar documento" className="btn-success" onClick={()=>this.editDocument(this.state.document)}>
                      <i className="fa fa-pencil btn__icon" />
                      <span className="button-text">Editar</span>
                    </Button>
                  </div>
                </Row>
                <Row className="c-document-modal__header-info">
                  <Col xs="2">
                    <Label for="upload-avatar" className="upload-avatar">
                      <div className="thumbnail">
                        <img src={this.state.document.logo ? this.state.document.logo : 'http://via.placeholder.com/100x100'} alt="logo-documento" />
                      </div>
                    </Label>
                  </Col>
                  <Col>
                    <Label>
                      {this.state.document.institution_name ? this.state.document.institution_name : 'Nome da instituição'}
                    </Label>
                    <br />
                    <Label>
                        {this.state.document.discipline_name ? this.state.document.discipline_name : 'Curso/Disciplina'}
                    </Label>
                    {' | '}
                    <Label>
                      {this.state.document.professor_name ?
                          this.state.document.professor_name : 'Professor(a)'}
                    </Label>
                      <br />
                    {this.state.document.student_indicator ? (
                        <p>Nome:</p>
                    ) : ''}
                    {this.state.document.class_indicator ? 'Turma: _________  ' : ''}
                    {this.state.document.date_indicator ? 'Data: ___/___/___  ' : ''}
                    {this.state.document.score_indicator ? 'Nota: _______  ' : ''}
                    </Col>
                  </Row>
                {this.state.document.questions.map((question, i) => (
                  <div key={i} className="c-document-modal__question">
                    <Row>
                      <Col sm="12">
                        <DisciplineList list={question.disciplines} />
                        <QuestionSourceYear source={question.source} year={question.year} />
                      </Col>
                    </Row>
                    <Row>
                      <div className="c-document-modal__question-content">
                        <b className="c-document-modal__question-number">
                          {i + 1}
                          {')'}
                        </b>
                        {' '}
                        <QuestionContent statement={question.question} />
                      </div>
                    </Row>
                  </div>
                ))}
              </ModalBody>
              <ModalFooter className="c-document-modal__footer">
                <Button color="primary" onClick={() => this.toggle()}>
                  <i className="fa fa-sign-out btn__icon" />
                  Fechar
                </Button>
                <Button color="danger" onClick={() => this.toggle()}>
                  <i className="fa fa-trash btn__icon" />
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
