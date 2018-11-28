import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { history } from 'helpers/history';

import DocumentQuestions from 'components/document/DocumentQuestions';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

class EditDocumentPage extends Component {
  componentDidMount() {
    const { fetchDocument, activeDocument } = this.props;
    if (!activeDocument) {
      history.replace('/documents/1');
    } else {
      fetchDocument(parseInt(activeDocument.id, 10));
    }
  }

  render() {
    const {
      activeDocument, removeSelectedQuestion,
    } = this.props;

    return (
      <HomeUserPage>
        <div className="c-document">
          <DocumentQuestions
            activeDocument={activeDocument}
            removeSelectedQuestion={removeSelectedQuestion}
          />
        </div>
        <ToastContainer hideProgressBar position="bottom-right" />
      </HomeUserPage>);
  }
}

EditDocumentPage.propTypes = {
  activeDocument: PropTypes.shape({}),
  removeSelectedQuestion: PropTypes.func,
};

EditDocumentPage.defaultProps = {
  removeSelectedQuestion: f => f,
};

export default EditDocumentPage;
