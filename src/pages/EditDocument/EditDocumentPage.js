import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { history } from 'helpers/history';

import { UncontrolledAlert } from 'reactstrap';
import DocumentHeader from 'components/document/DocumentHeader';
import DocumentQuestions from 'components/document/DocumentQuestions';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';

class EditDocumentPage extends Component {

  componentDidMount() {
    const { fetchDocument, activeDocument } = this.props;
    if (!activeDocument) {
      history.push('/documents/1');
    } else {
      fetchDocument(parseInt(activeDocument.id, 10));
    }
  }

  render() {
    const { activeDocument, removeSelectedQuestion, submit, isUpdated, error, isRemoved } = this.props;

    return (
      <HomeUserPage>
        <div className="c-document">
          { isUpdated ? (
            <UncontrolledAlert className="alert--success" color="success">
              Documento editado com sucesso
            </UncontrolledAlert>
          ) : ''
          }
          { error ? (
            <UncontrolledAlert className="alert--danger" color="danger">
                Ocorreu algum erro com sua solicitação, tente novamente.
            </UncontrolledAlert>
          ) : ''
          }
          { isRemoved ? (
            <UncontrolledAlert className="alert--success" color="success">
                Questão removida com sucesso
            </UncontrolledAlert>
          ) : ''
          }
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
  submit: PropTypes.func,
};

EditDocumentPage.defaultProps = {
  removeSelectedQuestion: f => f,
  submit: f => f,
};

export default EditDocumentPage;
