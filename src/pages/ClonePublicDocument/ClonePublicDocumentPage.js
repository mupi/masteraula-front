import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
} from 'reactstrap';

import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import HomeUserNotLoggedPage from 'pages/Home/HomeUserNotLoggedPage';
import PublicDocumentPageLogged from 'components/document/PublicDocumentPageLogged';
import PublicDocumentPageNotLogged from 'components/document/PublicDocumentPageNotLogged';


class ClonePublicDocumentPage extends Component {
  componentDidMount() {
    /* test : 1042 */
    const { match, fetchPublicDocument, isLoggedIn } = this.props;

    if (isLoggedIn) fetchPublicDocument(parseInt(match.params.id, 10));
  }


  render() {
    const {
      isLoggedIn, isFetchingPublicDocument, errorFetchingPublicDocument,
    } = this.props;


    if (isFetchingPublicDocument && isLoggedIn) {
      return (
        <HomeUserPage>
          <Alert className="alert--warning" color="warning">
              Carregando ...
          </Alert>
        </HomeUserPage>
      );
    }

    if (isFetchingPublicDocument && !isLoggedIn) {
      return (
        <HomeUserNotLoggedPage>
          <div className="c-public-document__section">
            <Alert className="alert--warning" color="warning">
              Carregando ...
            </Alert>
          </div>
        </HomeUserNotLoggedPage>
      );
    }

    if (errorFetchingPublicDocument && isLoggedIn) {
      return (
        <HomeUserPage>
          <Alert color="danger">
            A lista de questões não existe ou seu usuário não tem acesso permitido
          </Alert>
        </HomeUserPage>
      );
    }

    if (errorFetchingPublicDocument && !isLoggedIn) {
      return (
        <HomeUserNotLoggedPage>
          <div className="c-public-document__section">
            <Alert color="danger">
              A lista de questões não existe ou seu usuário não tem acesso permitido
            </Alert>
          </div>
        </HomeUserNotLoggedPage>
      );
    }

    if (isLoggedIn) {
      return (
        <HomeUserPage>
          <PublicDocumentPageLogged {...this.props} />
        </HomeUserPage>
      );
    }
    return (
      <HomeUserNotLoggedPage>
        <PublicDocumentPageNotLogged {...this.props} />
      </HomeUserNotLoggedPage>
    );
  }
}

ClonePublicDocumentPage.propTypes = {
  activeDocument: PropTypes.shape({}),
  removeSelectedQuestion: PropTypes.func,
};

export default ClonePublicDocumentPage;
