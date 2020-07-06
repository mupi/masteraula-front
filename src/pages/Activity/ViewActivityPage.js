import React, { useEffect } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import {
  Alert, Row, Col, Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import BackUsingHistory from 'components/question/BackUsingHistory';
import LearningObjectList from 'components/learningObject/LearningObjectList';
import ActivityInfo from 'components/activity/ActivityInfo';
import ActivityTasks from 'components/activity/ActivityTasks';

// Learning object's options available for LearnningObjectContent
const options = {
  showOperations: true,
  showViewButton: true,
  showCreateQuestionButton: true,
  showCreateActivityButton: true,
  removeOption: false,
  showTitle: false,
};

const ViewActivityPage = (props) => {
  const {
    isFetching, fetchActivity, match, activeActivity, showDeleteModal, userId,
  } = props;


  useEffect(() => {
    fetchActivity(match.params.id);
  }, []);

  if (isFetching) {
    return (
      <HomeUserPage>
        <Alert className="alert--warning" color="warning">
            Carregando ...
        </Alert>
      </HomeUserPage>
    );
  }

  if (!activeActivity || activeActivity.disabled) {
    return (
      <HomeUserPage>
        <Alert color="danger">
            A atividade não existe ou não está mais disponível
        </Alert>
      </HomeUserPage>
    );
  }

  const authorPK = (activeActivity && activeActivity.owner) ? activeActivity.owner.pk : 'Anônimo';

  const isOwner = authorPK === userId;

  return (
    <HomeUserPage>
      <div className="c-online">
        <Row className="c-online__row-header-options c-online__row-header-options--fixed">
          <Col className="c-online__col-header-options">
            <BackUsingHistory />
            { (isOwner)
              ? (
                <Button
                  className="c-question__btn-remove-question"
                  color="danger"
                  onClick={() => showDeleteModal(activeActivity.id)}
                  title="Apagar atividade"
                >
                  <FontAwesomeIcon icon="trash-alt" />
                  {' '}
                  Apagar
                </Button>
              ) : ''}
            {(isOwner)
              ? (
                <Link
                  className="btn btn-secondary c-question__btn-back"
                  to={`/edit-online/${activeActivity.id}`}
                >
                  <FontAwesomeIcon icon="pencil-alt" />
                  {' '}
                  Editar
                </Link>
              ) : ''}
          </Col>
        </Row>
        <Row className="c-question__tittle-section c-question--space-for-titlequestion mb-4">
          <Col>
            <h4>
              <FontAwesomeIcon icon="book-reader" />
              {' '}
              Atividade N°
              {' '}
              {activeActivity.id}
            </h4>
          </Col>
        </Row>
        {activeActivity.disabled ? (
          <Row>
            <Col className="c-question__col-full-section-details">
              <Alert color="danger" className="c-question-edit__warning-message">
                  A atividade
                {' '}
                  N°
                <strong>{activeActivity.id}</strong>
                {' '}
                  foi removida pelo autor(a) e não está mais disponível
              </Alert>
            </Col>
          </Row>
        ) : ''}
        <Row className="justify-content-center">
          <Col className="c-question__col-full-section-details" sm="12" md="12" xs="12">
            {(activeActivity.learning_objects && activeActivity.learning_objects.length > 0)
              ? (
                <LearningObjectList
                  learningObjects={activeActivity.learning_objects}
                  options={options}
                />
              ) : ''}
            {activeActivity && (
            <ActivityTasks
              tasks={activeActivity.tasks}
            />
            )}
            <div className="c-question__section-add-question">
              <Row>
                {!activeActivity.disabled && (
                  <Col className="c-question__add-question-rectangle">
                    <h6 className="c-question__add-question-title">
                      Gostou da atividade? Adicione a um plano de aula
                    </h6>
                    <Button
                      value={activeActivity.id}
                      title="Adicionar atividade à plano de aula"
                      className="question-card__btn"
                    >
                      <FontAwesomeIcon
                        icon="plus"
                      />
                      {' '}
                      Adicionar
                    </Button>
                  </Col>
                )}
              </Row>
            </div>
            <ActivityInfo activity={activeActivity} />
          </Col>
        </Row>
      </div>
    </HomeUserPage>
  );
};

export default ViewActivityPage;
