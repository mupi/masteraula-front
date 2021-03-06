import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { history } from 'helpers';
import {
  Row,
} from 'reactstrap';
import GoToQuestionBaseButton from 'components/buttons/GoToQuestionBaseButton';

import DocumentBasicHeader from 'components/document/DocumentBasicHeader';
import DocumentQuestions from 'components/document/DocumentQuestions';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';


const options = {
  showViewButton: true,
  removeOption: true,
  showTags: true,
  showLoginModal: false,
};


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
          <Row className="c-document__main-buttons">
            <div className="auto-margin-left-element">
              <GoToQuestionBaseButton
                customClass="btn-success"
                nameButton="Adicionar questões"
              />
            </div>
          </Row>
          <DocumentBasicHeader data={activeDocument} onSubmit={submit} />
          <DocumentQuestions
            activeDocument={activeDocument}
            removeSelectedQuestion={removeSelectedQuestion}
            options={options}
            {...this.props}
          />
        </div>
      </HomeUserPage>
    );
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
