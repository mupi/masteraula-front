import React, { Component } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import {
  Alert,
  Row,
  Col,
  Button,
} from 'reactstrap';
import LearningObjectContent from 'components/learningObject/LearningObjectContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MaterialList from 'components/material/MaterialList';
import BackUsingHistory from 'components/question/BackUsingHistory';
import { Link } from 'react-router-dom';

// Learning object's options available for LearnningObjectContent
const options = {
  showOperations: true,
  showViewButton: false,
  showCreateQuestionButton: true,
  removeOption: false,
  showTitle: false,
  fromView:true
};

class ViewLearningObjectPage extends Component {
  componentDidMount() {
    const { fetchLearningObject, match } = this.props;
    fetchLearningObject(match.params.id);
  }

  componentDidUpdate(prevProps) {
    const { fetchLearningObject, match: { params: { id } } } = this.props;
    if (prevProps.match.params.id !== id) {
      fetchLearningObject(id);
    }
  }

  render() {
    const {
      activeLearningObject, isFetchingLearningObject, error, userId,
      showDeleteModal,
    } = this.props;

    if (isFetchingLearningObject) {
      return (
        <HomeUserPage>
          <Alert className="alert--warning" color="warning">
            Carregando ...
          </Alert>
        </HomeUserPage>
      );
    }

    if (error || !activeLearningObject) {
      return (
        <HomeUserPage>
          <Alert color="danger">
            Erro no objeto de aprendizagem
          </Alert>
        </HomeUserPage>
      );
    }

    const isOwner = activeLearningObject.owner === userId;

    return (
      <HomeUserPage>
        <Row className="c-question__row-header-options c-question__row-header-options--fixed">
          <Col className="c-question__col-header-options">
            <BackUsingHistory />
            { (isOwner && !activeLearningObject.disabled)
              ? (
                <Button
                  className="c-question__btn-remove-question"
                  color="danger"
                  onClick={() => showDeleteModal(activeLearningObject.id)}
                  title="Apagar objeto"
                >
                  <FontAwesomeIcon icon="trash-alt" />
                  {' '}
                  Apagar
                </Button>
              ) : ''}
            {(isOwner && !activeLearningObject.disabled)
              ? (
                <Link
                  className="btn btn-secondary c-question__btn-back"
                  to={`/edit-object/${activeLearningObject.id}`}
                >
                  <FontAwesomeIcon icon="pencil-alt" />
                  {' '}
                  Editar
                </Link>
              ) : ''}
          </Col>
        </Row>
        <Row className="l-learning-object__tittle-section">
          <Col>
            <h4>
              <FontAwesomeIcon icon="image" />
              {' '}
              Objeto de aprendizagem N°
              {' '}
              { activeLearningObject ? activeLearningObject.id : ''}
            </h4>
          </Col>
        </Row>
        {activeLearningObject.disabled ? (
            <Row>
              <Col className="c-question__col-full-section-details">
                <Alert color="danger" className="c-question-edit__warning-message">
                    O Objeto de aprendizagem
                  {' '}
                    N°
                  <strong>{activeLearningObject.id}</strong>
                  {' '}
                    foi removido pelo autor(a) e não está mais disponível
                </Alert>
              </Col>
            </Row>
          ) : ''}
        <Row>
          <Col sm="12">
            <div className="l-learning-object">
              { activeLearningObject ? <LearningObjectContent learningObject={activeLearningObject} options={options} {...this.props} /> : ''}
            </div>
          </Col>
        </Row>
        <Row className="pagination-questions" style={{ marginLeft: '80%' }} />
        {(activeLearningObject.questions && activeLearningObject.questions.length > 0)
         || (activeLearningObject.activities && activeLearningObject.activities.length > 0) ? (
           <div className="c-question-base__results">
             <MaterialList
               sm="4"
               questions={activeLearningObject.questions}
               count={activeLearningObject.questions.length + activeLearningObject.activities.length}
               textResult="Materiais associados a este objeto"
               activities={activeLearningObject.activities}
               showQuantity
               {...this.props}
             />
           </div>
          ) : (
            <Row>
              <Col sm="12" className="c-question-base__total-results">Sem materiais associados</Col>
            </Row>
          )}


      </HomeUserPage>
    );
  }
}
export default ViewLearningObjectPage;
