
import React, { Component } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  Alert, Row, Col, Button, Badge,
} from 'reactstrap';
import BackUsingHistory from 'components/question/BackUsingHistory';
import ClassPlanMainResources from 'components/classplan/ClassPlanMainResources';
import ClassPlanStudentArea from 'components/classplan/ClassPlanStudentArea';
import ClassPlanTeacherArea from 'components/classplan/ClassPlanTeacherArea';
import ClassPlanBasicInfo from 'components/classplan/ClassPlanBasicInfo';
import ClassPlanStations from 'components/classplan/ClassPlanStations';

export const BUTTON_TYPE = {
  ACTIVITYCARD_BASE: 1,
  ACTIVITYCARD_MODAL_VIEW: 2,
  ACTIVITYCARD_SELECT: 3,
};

// Document's options available for View ClassPlan
const optionsDocument = {
  showViewButton: true,
  removeButton: false,
};

// Document's options available for View ClassPlan
const optionsOnlineTest = {
  showViewButton: true,
  removeButton: false,
};

// Activity's options available for View ClassPlan
const optionsActivity = {
  showViewButton: true,
  buttonType: BUTTON_TYPE.ACTIVITYCARD_MODAL_VIEW,
};

/* CLASS PLAN TYPE */
const CLASSPLAN_TYPE = {
  STATIONS: 'S',
  OPEN: 'T',
};

class ViewClassPlanPage extends Component {
  componentDidMount() {
    const { fetchClassPlan, match } = this.props;
    fetchClassPlan(match.params.id);
  }

  componentDidUpdate(prevProps) {
    const { fetchClassPlan, match: { params: { id } } } = this.props;
    if (prevProps.match.params.id !== id) {
      fetchClassPlan(id);
    }
  }

  render() {
    const {
      userId, activeClassPlan, isFetching, user, error,
      showDeleteModal, showDocumentModal, showActivityModal, showOnlineTestModal,
      generatePublicLink, publicLink, showAlertModal, copyClassPlanView,
      quantityUsedPublicLinks, isPremium,
    } = this.props;

    const authorPK = (activeClassPlan && activeClassPlan.owner) ? activeClassPlan.owner.pk : 'Anônimo';
    const isOwner = (authorPK === userId);
    const hasGuidelines = activeClassPlan && activeClassPlan.guidelines && activeClassPlan.guidelines.trim() !== '<p></p>' && activeClassPlan.guidelines.trim() !== '';

    if (isFetching) {
      return (
        <HomeUserPage>
          <Alert className="alert--warning" color="warning">
                Carregando ...
          </Alert>
        </HomeUserPage>
      );
    }

    if (error || !activeClassPlan) {
      return (
        <HomeUserPage>
          <Alert color="danger">
            Você não tem permissão para ver este plano de aula ou foi apagado.
          </Alert>
        </HomeUserPage>
      );
    }

    // if (!isOwner) {
    //   return (
    //     <HomeUserPage>
    //       <Alert color="danger">
    //         Você não tem permissão para ver este plano de aula ou foi apagado.
    //       </Alert>
    //     </HomeUserPage>
    //   );
    // }

    if (error || !activeClassPlan) {
      return (
        <HomeUserPage>
          <Alert color="danger">
            Erro no plano de aula
          </Alert>
        </HomeUserPage>
      );
    }

    const typeClassPlanName = (activeClassPlan.plan_type === CLASSPLAN_TYPE.OPEN) ? 'Aberto' : 'Rotação por Estações';

    return (
      <HomeUserPage>
        <div className="c-question c-create-question">
          <Row className="c-question__row-header-options c-question__row-header-options--fixed">
            <Col className="c-question__col-header-options">
              <BackUsingHistory />
              { (isOwner && !activeClassPlan.disabled)
                ? (
                  <Button
                    className="c-question__btn-remove-question"
                    color="danger"
                    onClick={() => showDeleteModal(activeClassPlan.id, activeClassPlan.name)}
                    title="Apagar plano de aula"
                  >
                    <FontAwesomeIcon icon="trash-alt" />
                    {' '}
                    Apagar
                  </Button>
                ) : ''}
              {(isOwner && !activeClassPlan.disabled)
                ? (
                  <Link
                    className="btn btn-secondary c-question__btn-back"
                    to={`/edit-classplan/${activeClassPlan.id}`}
                  >
                    <FontAwesomeIcon icon="pencil-alt" className="btn__icon" />
                    {' '}
                    Editar
                  </Link>
                ) : ''}
                <Button
                  className="btn btn-secondary c-question__btn-back"
                  onClick={() => copyClassPlanView(activeClassPlan.id)}
                  title="Duplicar plano de aula"
                >
                  <FontAwesomeIcon icon="copy" className="btn__icon" />
                  {' '}
                  Duplicar
                </Button>
            </Col>
          </Row>
          <Row className="c-question--space-for-titlequestion">
            <Col className="d-flex  justify-content-end">
              {activeClassPlan.secret
                ? <Badge className="c-question__badge-privacity" color="info">PRIVADO</Badge> : <Badge className="c-question__badge-privacity" color="success">PÚBLICO</Badge>}
            </Col>
          </Row>
          <Row className="c-question__tittle-section">
            <Col>
              <h4>
                <FontAwesomeIcon icon="book" />
                {' '}
                {`Plano de Aula - ${typeClassPlanName}`}
              </h4>
            </Col>
          </Row>

          {activeClassPlan.disabled ? (
            <Row>
              <Col className="c-question__col-full-section-details">
                <Alert color="danger" className="c-question-edit__warning-message">
                  O plano de aula
                  {' '}
                  N°
                  <strong>{activeClassPlan.id}</strong>
                  {' '}
                  foi removido pelo autor(a) e não está mais disponível
                </Alert>
              </Col>
            </Row>
          ) : ''}
          <ClassPlanBasicInfo
            classPlan={activeClassPlan}
            user={user}
            generatePublicLink={generatePublicLink}
            publicLink={publicLink}
            showAlertModal={showAlertModal}
            quantityUsedPublicLinks={quantityUsedPublicLinks}
            isPremium={isPremium}
            isOwner={isOwner}
          />
          <ClassPlanTeacherArea classPlan={activeClassPlan} />
          {hasGuidelines && (
            <ClassPlanStudentArea classPlan={activeClassPlan} />
          )}
          {activeClassPlan && activeClassPlan.plan_type === CLASSPLAN_TYPE.STATIONS ? (
            <ClassPlanStations
              stations={activeClassPlan.stations}
              showDocumentModal={showDocumentModal}
              showActivityModal={showActivityModal}
              showOnlineTestModal={showOnlineTestModal}
            />
          ) : (
            <ClassPlanMainResources
              classPlan={activeClassPlan}
              optionsActivity={optionsActivity}
              optionsDocument={optionsDocument}
              optionsOnlineTest={optionsOnlineTest}
              showDocumentModal={showDocumentModal}
              showActivityModal={showActivityModal}
              showOnlineTestModal={showOnlineTestModal}
            />
          )}
        </div>
      </HomeUserPage>
    );
  }
}
export default ViewClassPlanPage;
