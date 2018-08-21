import React, { Component } from 'react';
import PropTypes from 'prop-types';
 import { Alert } from 'reactstrap';
import DocumentHeader from 'components/document/DocumentHeader';
import DocumentQuestions from 'components/document/DocumentQuestions';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';

class EditDocumentPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    const { activeDocument, removeSelectedQuestion, submit, isUpdated, error, isRemoved } = this.props;
    

    return (
      <HomeUserPage>
        <div className="c-document">
        {isUpdated ? (  
              <Alert className="alert--success" color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                  Documento editado com sucesso
              </Alert>
          ):''
        }
        {error ? (  
              <Alert className="alert--danger" color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                  Ocorreu algum erro com sua solicitação, tente novamente.
              </Alert>
          ):''
        }
        {isRemoved ? (  
              <Alert className="alert--success" color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                  Questão removida com sucesso
              </Alert>
          ):''
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
  activeDocument: null,
  removeSelectedQuestion: f => f,
  submit: f => f,
};

export default EditDocumentPage;
