import React from 'react';
import {
  Row, Container, Col, Button, Input, InputGroup, InputGroupAddon, Alert,
} from 'reactstrap';
import DocumentList from 'components/document/DocumentList';
import HomeUserPage from '../HomeUser/HomeUserPage';

class ViewDocumentPage extends React.Component {
  componentDidMount() {
    const { match, listMyDocuments } = this.props;
    listMyDocuments(parseInt(match.params.page, 10));
  }

  componentDidUpdate(prevProps) {
    const { match, listMyDocuments } = this.props;
    if ((match.params.page !== prevProps.match.params.page)) {
      listMyDocuments(parseInt(match.params.page, 10));
    }
  }

  render() {
    const { myDocumentsList, isFetching } = this.props;
    return (
      <HomeUserPage>
        <Container>
          <Row>
            <InputGroup>
              <Input placeholder="Pesquisar em Meus Documentos" />
              <InputGroupAddon addonType="prepend">
                <Button>
                  Pesquisar
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Row>
          {isFetching
            ? (
              <Alert className="c-question-base__alert--warning" color="warning">
                Carregando ...
              </Alert>
            ) : (
              <Row style={{ marginTop: '1em' }}>
                <Col sm="12">
                  {myDocumentsList ? (myDocumentsList.count) : 0}
                  {' '}
                  documentos encontrados
                </Col>
                {myDocumentsList
                  && <DocumentList documents={myDocumentsList.results} />
                }
              </Row>
            )}
        </Container>
      </HomeUserPage>);
  }
}

export default ViewDocumentPage;
