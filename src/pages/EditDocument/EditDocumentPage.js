import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DocumentHeader from 'components/document/DocumentHeader';
import DocumentQuestions from 'components/document/DocumentQuestions';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';

class EditDocumentPage extends Component {

  render() {
    const { activeDocument, removeSelectedQuestion, submit } = this.props;

    return (
      <HomeUserPage>
        <div className="c-document">
          <DocumentHeader data={activeDocument} onSubmit={submit}/>
          <DocumentQuestions
            activeDocument={activeDocument}
            removeSelectedQuestion={removeSelectedQuestion}
          />
        </div>
      </HomeUserPage>);
  }
}

EditDocumentPage.propTypes = {
  activeDocument: PropTypes.object,
  removeSelectedQuestion: PropTypes.func,
};

EditDocumentPage.defaultProps = {
  activeDocument: null,
  removeSelectedQuestion: f => f,
  submit: f => f,
};

export default EditDocumentPage;
