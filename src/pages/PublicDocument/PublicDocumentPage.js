import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert, Row, Col, Button,
} from 'reactstrap';

import DocumentQuestions from 'components/document/DocumentQuestions';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import HomeUserNotLoggedPage from 'pages/Home/HomeUserNotLoggedPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ShareButton extends React.PureComponent {
  static FBParse() {
    // /* global FB */
    if (window.FB) {
      window.FB.XFBML.parse();
    } else {
      window.fbAsyncInit = () => {
        window.FB.init({
          appId: '445706276263617',
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v4.0',
        });
        window.FB.XFBML.parse();
      };
      ((d, s, id) => {
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        const js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/pt_BR/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    }
  }

  render() {
    const { slug } = this.props;
    return (
      <div
        id="fb-share-button"
        className="fb-share-button"
        data-href={`https://api.masteraula.com.br/document_publication/${slug}/share`}
        data-layout="button"
        data-size="small"
      >
        Compartilhar
      </div>
    );
  }
}


class InnerPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.shareRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.shareRef.current) {
      this.shareRef.current.constructor.FBParse();
    }
  }

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
            <ShareButton ref={this.shareRef} slug={match.params.id} />
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
