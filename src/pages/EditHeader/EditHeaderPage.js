import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentHeaderContainer from 'containers/DocumentHeaderContainer';

import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class EditHeaderPage extends Component {
  componentDidMount() {
    const { fetchHeader, match } = this.props;
    if (match.params.id) {
      console.log("EDITAR CABEÇALHO");
      fetchHeader(match.params.id);
    } else {
      console.log("NOVO CABEÇALHO");
    }
  }

  render() {
    const { activeHeader } = this.props;
    console.log(activeHeader);

    return (
      <HomeUserPage>
        <div className="c-header">
          <DocumentHeaderContainer />
        </div>
        <ToastContainer hideProgressBar position="bottom-right" />
      </HomeUserPage>);
  }
}

EditHeaderPage.propTypes = {
  activeHeader: PropTypes.shape({}),
 // submit: PropTypes.func,
};

EditHeaderPage.defaultProps = {
//  submit: f => f,
};

export default EditHeaderPage;
