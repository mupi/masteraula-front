import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
} from 'reactstrap';

import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import HomeUserNotLoggedPage from 'pages/Home/HomeUserNotLoggedPage';
import PublicDocumentPageLogged from 'components/document/PublicDocumentPageLogged';
import PublicDocumentPageNotLogged from 'components/document/PublicDocumentPageNotLogged';


class PublicDocumentPage extends Component {
  componentDidMount() {
    const { match, fetchPublicDocument } = this.props;
    fetchPublicDocument(match.params.id);
  }

  render() {
    const {
      isLoggedIn, isFetchingPublicDocument, errorFetchingPublicDocument,
    } = this.props;

    if (isLoggedIn) {
      const innerPage = () => {
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
        return <PublicDocumentPageLogged {...this.props} />;
      };

      return (
        <HomeUserPage>
          {innerPage()}
        </HomeUserPage>
      );
    }

    const innerPage = () => {
      if (isFetchingPublicDocument) {
        return (
          <div className="c-public-document__section">
            <Alert className="alert--warning" color="warning">
              Carregando ...
            </Alert>
          </div>
        );
      }
      if (errorFetchingPublicDocument) {
        return (
          <div className="c-public-document__section">
            <Alert color="danger">
              A lista de questões não existe ou seu usuário não tem acesso permitido
            </Alert>
          </div>
        );
      }
      return <PublicDocumentPageNotLogged {...this.props} />;
    };
    return (
      <HomeUserNotLoggedPage>
        {innerPage()}
      </HomeUserNotLoggedPage>
    );
  }
}

PublicDocumentPage.propTypes = {
  activeDocument: PropTypes.shape({}),
  removeSelectedQuestion: PropTypes.func,
};

export default PublicDocumentPage;
