import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Container, Col, Button, Input, InputGroup, InputGroupAddon, Alert,
} from 'reactstrap';
import DocumentList from 'components/document/DocumentList';
import CustomPagination from 'components/pagination/CustomPagination';
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
    const { myDocumentsList, isFetching, switchActiveDocument } = this.props;
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
              <Row className="pagination-my-documents" style={{ marginTop: '1em' }}>
                <CustomPagination {...this.props} {...myDocumentsList} itensPerPage={10} />
                <Col sm="12" className="my-documents__total-results">
                  
                  
                  Documentos encontrados : {myDocumentsList ? (myDocumentsList.count) : 0}
                </Col>
                {myDocumentsList
                  && <DocumentList documents={myDocumentsList.results} switchActiveDocument={switchActiveDocument}/>
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
      page: PropTypes.string.isRequired,
    }),
  }).isRequired,
  listMyDocuments: PropTypes.func.isRequired,
  myDocumentsList: PropTypes.shape(),
  isFetching: PropTypes.bool.isRequired,
};

ViewDocumentPage.defaultProps = {
  myDocumentsList: null,
};

export default ViewDocumentPage;
