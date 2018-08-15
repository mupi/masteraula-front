import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Container, Col, Button, Input, InputGroup, InputGroupAddon, Alert,
} from 'reactstrap';
import DocumentList from 'components/document/DocumentList';
import HomeUserPage from '../HomeUser/HomeUserPage';
import CustomPagination from 'components/pagination/CustomPagination';

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
                <CustomPagination {...this.props} {...myDocumentsList} itensPerPage={10} />
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

ViewDocumentPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.number.isRequired,
    }),
  }).isRequired,
  listMyDocuments: PropTypes.func.isRequired,
  myDocumentsList: PropTypes.shape().isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default ViewDocumentPage;
