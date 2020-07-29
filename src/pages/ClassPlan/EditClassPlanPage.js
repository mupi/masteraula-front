
import React, { Component } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import {
  Alert,
} from 'reactstrap';
import ClassPlanStationsForm from 'components/classplan/ClassPlanStationsForm';
import ClassPlanForm from 'components/classplan/ClassPlanForm';

class EditClassPlanPage extends Component {
  componentDidMount() {
    const {
      listDisciplineFilters, listTeachingLevelFilters, listTeachingYearFilters,
    } = this.props;
    listDisciplineFilters();
    listTeachingLevelFilters();
    listTeachingYearFilters();
    const { fetchClassPlan, match } = this.props;
    fetchClassPlan(match.params.id);
  }

  componentDidUpdate(prevProps) {
    const { fetchClassPlan, match: { params: { id } } } = this.props;
    if (prevProps.match.params.id !== id) {
      const {
        listDisciplineFilters, listTeachingLevelFilters, listSourceFilters,
      } = this.props;
      listDisciplineFilters();
      listTeachingLevelFilters();
      listSourceFilters();
      fetchClassPlan(id);
    }
  }

    listTopicSuggestions = (param) => {
      if (param && param.length === 3) {
        const { listTopicSuggestions } = this.props;
        listTopicSuggestions(param);
      }
    }

    listBnccSuggestions = (param) => {
      if (param && param.length === 3) {
        const { listBnccSuggestions } = this.props;
        listBnccSuggestions(param);
      }
    }

    render() {
      const {
        isFetching, error, activeClassPlan, userId,
        // selectedPdf,
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
              Você não tem permissão para editar este plano de aula.
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


      return (
        <HomeUserPage>
          { activeClassPlan && activeClassPlan.plan_type !== 'S' ? (<ClassPlanForm {...this.props} actionName="Editar" />) : (
            <ClassPlanStationsForm {...this.props} actionName="Editar" />
          )}
        </HomeUserPage>
      );
    }
}
export default EditClassPlanPage;
