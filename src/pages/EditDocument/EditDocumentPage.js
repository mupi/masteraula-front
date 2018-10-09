import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { history } from 'helpers/history';

import DocumentHeader from 'components/document/DocumentHeader';
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
      activeDocument, removeSelectedQuestion, submit,
    } = this.props;

    return (
      <HomeUserPage>
        <div className="c-document">
          <DocumentHeader data={activeDocument} onSubmit={submit} />
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
  // activeDocument: PropTypes.object,
  removeSelectedQuestion: PropTypes.func,
  submit: PropTypes.func,
};

EditDocumentPage.defaultProps = {
  removeSelectedQuestion: f => f,
  submit: f => f,
};

export default EditDocumentPage;
