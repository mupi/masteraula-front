import QuestionContent from 'components/question/QuestionContent';
import QuestionInfo from 'components/question/QuestionInfo';
import AddQuestionButton from 'components/buttons/AddQuestionButton';
import RemoveQuestionButton from 'components/buttons/RemoveQuestionButton';
import {
  Alert, Row, Col,
} from 'reactstrap';
import { isQuestionAdded } from 'helpers/question';
import React, { Component } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Back from 'components/question/Back';
import { history } from 'helpers/history';
import QuestionTextRichEditor from 'components/textricheditor/QuestionTextRichEditor';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class CreateQuestionPage extends Component {
 
  render() {
    const {
      activeQuestion, isFetching, rating, error, onRate, activeDocument, addSelectedQuestion,
      removeSelectedQuestion, role, setQuestionIdToNewDocument, showModal, hideModal, location,
    } = this.props;
  
    if (isFetching) {
      return (
        <HomeUserPage>
          <Alert className="alert--warning" color="warning">
              Carregando ...
          </Alert>
        </HomeUserPage>
      );
    }

    if (error) {
      return (
        <HomeUserPage>
          <Alert color="danger">
              Erro na questão
          </Alert>
        </HomeUserPage>
      );
    }

    return (
      <HomeUserPage>
        <ToastContainer hideProgressBar position="bottom-right" />
        <div className="c-question">
          <Row className="c-question__tittle-section">
            <Col>
              <h4>
                <FontAwesomeIcon icon="book" />
                {' '}
                Criar Questão
              </h4>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col sm="12" md="12" xs="12">
              <QuestionTextRichEditor />
            
            </Col>
          </Row>
        </div>
      </HomeUserPage>
    );
  }
}
export default CreateQuestionPage;
