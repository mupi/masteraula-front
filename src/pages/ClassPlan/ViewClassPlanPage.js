
import React, { Component } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert, Row, Col, Button,
} from 'reactstrap';
import BackUsingHistory from 'components/question/BackUsingHistory';
import ClassPlanMainResources from 'components/classplan/ClassPlanMainResources';
import ClassPlanExtraResources from 'components/classplan/ClassPlanExtraResources';
import ClassPlanComments from 'components/classplan/ClassPlanComments';
import ClassPlanBasicInfo from 'components/classplan/ClassPlanBasicInfo';
import ClassPlanStations from 'components/classplan/ClassPlanStations';

import { Link } from 'react-router-dom';

// Learning object's options available for LearnningObjectContent in ClassPlan
const optionsObject = {
  showOperations: true,
  showViewButton: true,
  showCreateQuestionButton: false,
  removeOption: false,
  showTitle: false,
};

// Document's options available for View ClassPlan
const optionsDocument = {
  showViewButton: true,
  removeButton: false,
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
      userId, activeClassPlan, isFetching, user, error, showDeleteModal, showDocumentModal,
    } = this.props;

    const authorPK = (activeClassPlan && activeClassPlan.owner) ? activeClassPlan.owner.pk : 'Anônimo';
    const isOwner = (authorPK === userId);

    if (isFetching) {
      return (
        <HomeUserPage>
          <Alert className="alert--warning" color="warning">
                Carregando ...
          </Alert>
        </HomeUserPage>
      );
    }

    if (!isOwner) {
      return (
        <HomeUserPage>
          <Alert color="danger">
            Você não tem permissão para ver este plano de aula.
          </Alert>
        </HomeUserPage>
      );
    }

    if (error || !activeClassPlan) {
      return (
        <HomeUserPage>
          <Alert color="danger">
            Erro no plano de aula
          </Alert>
        </HomeUserPage>
      );
    }

    const typeClassPlanName = (activeClassPlan.plan_type === 'T') ? 'Tradicional' : 'Rotação por Estações';

    return (
      <HomeUserPage>
        <div className="c-question c-create-question">
          <Row className="c-question__row-header-options c-question__row-header-options--fixed">
            <Col className="c-question__col-header-options">
              <BackUsingHistory />
              { (isOwner)
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
              {(isOwner)
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
            </Col>
          </Row>
          <Row className="c-question__tittle-section c-question--space-for-titlequestion">
            <Col>
              <h4>
                <FontAwesomeIcon icon="book" />
                {' '}
                {`Plano de Aula - ${typeClassPlanName}`}
              </h4>
            </Col>
          </Row>
          <ClassPlanBasicInfo classPlan={activeClassPlan} user={user} />
          {activeClassPlan && activeClassPlan.plan_type === 'S' ? (
            <ClassPlanStations
              stations={activeClassPlan.stations}
              showDocumentModal={showDocumentModal}
            />
          ) : (
            <ClassPlanMainResources
              classPlan={activeClassPlan}
              optionsDocument={optionsDocument}
              optionsObject={optionsObject}
              showDocumentModal={showDocumentModal}
            />
          )}
          <ClassPlanExtraResources classPlan={activeClassPlan} />
          <ClassPlanComments classPlan={activeClassPlan} />
        </div>
      </HomeUserPage>
    );
  }
}
export default ViewClassPlanPage;
