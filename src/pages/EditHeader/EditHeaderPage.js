import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentHeaderContainer from 'containers/DocumentHeaderContainer';
import HeaderOptions from 'components/headers/HeaderOptions';

import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class EditHeaderPage extends Component {
  componentDidMount() {
    const { fetchHeader, resetNewHeader, match } = this.props;
    if (match.params.id) {
      fetchHeader(match.params.id);
    } else {
      resetNewHeader();
    }
  }

  render() {
    return (
      <HomeUserPage>
        <div className="c-edit-header__options">
          <HeaderOptions />
        </div>
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
