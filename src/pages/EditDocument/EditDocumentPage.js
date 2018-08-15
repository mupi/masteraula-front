import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DocumentHeader from 'components/document/DocumentHeader';
import DocumentQuestions from 'components/document/DocumentQuestions';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';

class EditDocumentPage extends Component {

  render() {
    const { activeDocument, removeSelectedQuestion } = this.props;

    return (
      <HomeUserPage>
        <div className="c-document">
          <DocumentHeader data={this.props.activeDocument} setFields={this.setFields} />
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
};

export default EditDocumentPage;
