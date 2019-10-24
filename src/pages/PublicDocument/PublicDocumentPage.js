import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert, Row, Col, Button,
} from 'reactstrap';

import DocumentQuestions from 'components/document/DocumentQuestions';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import HomeUserNotLoggedPage from 'pages/Home/HomeUserNotLoggedPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class InnerPage extends React.PureComponent {
  render() {
    const {
      activePublicDocument, copyDocument, showLoginModal, isLoggedIn,
      isFetchingPublicDocument, errorFetchingPublicDocument, match,
    } = this.props;

    const name = activePublicDocument ? activePublicDocument.name : '';

    if (isFetchingPublicDocument) {
      return (
        <Alert className="alert--warning" color="warning">
          Carregando ...
        </Alert>
      );
    }
    if (errorFetchingPublicDocument) {
      return (
        <Alert color="danger">
          A lista de questões não existe ou seu usuário não tem acesso permitido
        </Alert>
      );
    }

    const handleClick = () => {
      if (isLoggedIn) {
        copyDocument(activePublicDocument);
      } else {
        showLoginModal(match.url);
      }
    };

    const options = isLoggedIn ? {
      showViewButton: true,
      removeOption: false,
      showTags: false,
      showLoginModal: false,
    } : {
      showViewButton: true,
      removeOption: false,
      showTags: false,
      showLoginModal: true,
      optionalMessage: 'Você precisa estar logado no sistema',
    };

    return (
      <div className="c-document">
        <Row className="c-document__main-buttons align-items-center">
          <Col sm="8" className="c-public-document__name-col">
            <h3 className="c-public-document__name">{`Prova: ${name}`}</h3>
          </Col>
          <Col sm="4" className="c-public-document__name-col text-right">
            <Button className="btn-success btn btn-secondary" onClick={handleClick} size="lg">
              <FontAwesomeIcon icon="copy" className="btn__icon" />
              Copiar prova
            </Button>
          </Col>
        </Row>

        <DocumentQuestions
          activeDocument={activePublicDocument}
          {...this.props}
          options={options}
        />
      </div>
    );
  }
}

class PublicDocumentPage extends Component {
  componentDidMount() {
    const { match, fetchPublicDocument } = this.props;
    fetchPublicDocument(match.params.id);
  }

  render() {
    const { isLoggedIn } = this.props;

    return isLoggedIn ? (
      <HomeUserPage>
        <InnerPage {...this.props} />
      </HomeUserPage>
    ) : (
      <HomeUserNotLoggedPage>
        <InnerPage {...this.props} />
      </HomeUserNotLoggedPage>
    );
  }
}

PublicDocumentPage.propTypes = {
  activeDocument: PropTypes.shape({}),
  removeSelectedQuestion: PropTypes.func,
};

export default PublicDocumentPage;
