import React, { useEffect } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import {
  Alert, Row, Col, Button, Badge,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import BackUsingHistory from 'components/question/BackUsingHistory';
import LearningObjectList from 'components/learningObject/LearningObjectList';
import ActivityInfo from 'components/activity/ActivityInfo';
import ActivityTasks from 'components/activity/ActivityTasks';
import RelatedQuestions from 'components/question/RelatedQuestions';

// Learning object's options available for LearnningObjectContent
const options = {
  showOperations: true,
  showViewButton: true,
  showCreateQuestionButton: true,
  showCreateActivityButton: true,
  removeOption: false,
  showTitle: false,
};

const ActivityListClassPlans = (props) => {
  const { activeActivity } = props;
  const listClassPlansFilter = ((activeActivity.class_plans)
    ? activeActivity.class_plans.filter(item => item.id !== activeActivity.id) : activeActivity.class_plans);

  return (
    activeActivity.class_plans && listClassPlansFilter.length > 0
      ? (
        <Row className="c-question__list-documents">
          <Col className="c-question__add-question-rectangle">
            <p>
              Essa atividade também está em planos de aula:
              {' '}
              <strong>
                {listClassPlansFilter.map(item => item.name).join(', ')}
              </strong>
            </p>
          </Col>
        </Row>
      ) : ''
  );
};

const ViewActivityPage = (props) => {
  const {
    isFetching, fetchActivity, match, activeActivity, showDeleteModal, userId,
    showCreateClassPlanModal, selectedClassPlanType,
  } = props;

  const authorPk = (activeActivity && activeActivity.owner) ? activeActivity.owner.pk : 'Anônimo';
  const isOwner = (authorPk === userId);

  useEffect(() => {
    fetchActivity(match.params.id);
  }, [match.params.id]);

  if (isFetching) {
    return (
      <HomeUserPage>
        <Alert className="alert--warning" color="warning">
            Carregando ...
        </Alert>
      </HomeUserPage>
    );
  }

  if (!activeActivity) {
    return (
      <HomeUserPage>
        <Alert color="danger">
            A atividade não existe ou não está disponível
        </Alert>
      </HomeUserPage>
    );
  }

  if (activeActivity && activeActivity.secret && !isOwner) {
    return (
      <HomeUserPage>
        <Alert color="danger">
          Você não tem autorização para ver a atividade
        </Alert>
      </HomeUserPage>
    );
  }

  return (
    <HomeUserPage>
      <div className="c-online">
        <Row className="c-online__row-header-options c-online__row-header-options--fixed">
          <Col className="c-online__col-header-options">
            <BackUsingHistory />
            { (isOwner && !activeActivity.disabled)
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
            {(isOwner && !activeActivity.disabled)
              ? (
                <Link
                  className="btn btn-secondary c-question__btn-back"
                  to={`/edit-activity/${activeActivity.id}`}
                >
                  <FontAwesomeIcon icon="pencil-alt" />
                  {' '}
                  Editar
                </Link>
              ) : ''}
          </Col>
        </Row>
        <Row className="c-question--space-for-titlequestion">
          <Col className="d-flex  justify-content-end">
            {activeActivity.secret
              ? <Badge className="c-question__badge-privacity" color="info">PRIVADA</Badge> : <Badge className="c-question__badge-privacity" color="success">PÚBLICA</Badge>}
          </Col>
        </Row>
        <Row className="c-question__tittle-section mb-4">
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
            <Col>
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
          <Col sm="12" md="12" xs="12">
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
                      onClick={() => showCreateClassPlanModal(selectedClassPlanType, activeActivity)}
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
              <ActivityListClassPlans activeActivity={activeActivity} />
            </div>
            <ActivityInfo activity={activeActivity} />
            {activeActivity.related_questions && activeActivity.related_questions.length > 0 ? (
              <RelatedQuestions ractivities={activeActivity.related_activities} rquestions={activeActivity.related_questions} {...props} />) : ''}
          </Col>
        </Row>
      </div>
    </HomeUserPage>
  );
};

export default ViewActivityPage;
