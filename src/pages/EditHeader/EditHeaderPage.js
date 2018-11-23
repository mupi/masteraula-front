import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentHeader from 'components/document/DocumentHeader';

import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class EditHeaderPage extends Component {
  componentDidMount() {
    /*const { fetchDocument, activeDocument } = this.props;
    if (!activeDocument) {
      fetchDocument(parseInt(activeDocument.id, 10));
    }*/
  }

  render() {
   /* const {
     activeHeader, submit,
    } = this.props;*/ /*data={activeHeader} onSubmit={submit}*/

    return (
      <HomeUserPage>
        <div className="c-header">
          <DocumentHeader  />
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
