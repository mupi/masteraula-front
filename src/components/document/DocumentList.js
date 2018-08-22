import React from 'react';
import {
  Row, Col, Table, Button,
} from 'reactstrap';
import { history } from 'helpers/history';


class DocumentList extends React.Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.openDocumentModal = this.openDocumentModal.bind(this);
    this.editDocument = this.editDocument.bind(this);

  }

  closeModal(event) {
    const { hideModal } = this.props;
    hideModal();
  }

  openDocumentModal(event, id) {
    const { showModal, fetchPreviewDocument, isFetchingPreviewDocument } = this.props;
    fetchPreviewDocument(parseInt(id, 10));

      showModal({
        open: true,
        document: { 
          id:308,
          name:'PROVA DE BIOLOGIA',
          questions :[
            {id:648,
            question: {
              disciplines: [
                { name: 'Química' },
                { name: 'Física' },
              ],
              source: 'ENEM',
              year: '2010',
              teaching_levels: [
                {
                  id: 1,
                  name: 'Ensino Médio',
                },
                {
                  id: 2,
                  name: 'Ensino Fundamental',
                },
              ],
              author: {
                id: 8,
                username: 'cp.rosaless@gmail.com',
                name: 'Carmen Pamela Rosales Sedano',
                email: 'cp.rosaless@gmail.com',
              },
              statement: 'Assinale a alternativa : a) O discurso feminista de Susanitar denota certo machismo ...',
            },}
          ],
           create_date:"2018/08/21",
           secret:true,
           institution_name:null,
           discipline_name:null,
           professor_name:null,
           student_indicator:false,
           class_indicator:false,
           score_indicator:false,
           date_indicator:false
          },
        closeModal: this.closeModal,
        editDocument: this.editDocument,
      }, 'document');
  }
  

  editDocument(e, document) {
    const { switchActiveDocument } = this.props;
    switchActiveDocument(document);
    history.push('/edit-document');
  }

  render() {
    const { documents } = this.props;
    return (
      <Row className="l-my-documents-list">
      <Col xs="12">
      <div>
        
        <Table responsive>
          <thead align="center">
            <tr>
              <th>
                Nome
              </th>
              <th>
                  Data de criação
              </th>
              <th>
                  Nº de questões
              </th>
              <th>
                  Apagar
              </th>
            </tr>
          </thead>
          <tbody align="center">
            {documents.map((document, i) => (
              <tr key={i} role={i} className={ ((i%2)=== 0)? 'even' : 'odd' }>
                <th scope="row"  onClick={e => this.openDocumentModal(e, document.id)}>
                  {document.name}
                </th>
                <td>
                  {document.create_date}
                </td>
                <td>
                  {document.questions.length}
                </td>
                <td>
                  <Button color="danger">
                    <i className="fa fa-trash" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      </Col>
      </Row>
    );
  }
}

export default DocumentList;
