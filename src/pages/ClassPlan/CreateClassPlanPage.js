
import React, { Component } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import {
  Alert,
} from 'reactstrap';
import { history } from 'helpers';

import ClassPlanForm from 'components/classplan/ClassPlanForm';
import ClassPlanStationsForm from 'components/classplan/ClassPlanStationsForm';


class CreateClassPlanPage extends Component {
  componentDidMount() {
    const {
      listDisciplineFilters, listTeachingLevelFilters, listTeachingYearFilters, prepareForm,
      resetSelectedActivities, resetSelectedDocuments, match, resetStationsClassPlan,
    } = this.props;

    if (match.params.type !== 'T' && match.params.type !== 'S') {
      history.push('/my-dashboard/');
    } else {
      listDisciplineFilters();
      listTeachingLevelFilters();
      listTeachingYearFilters();
      prepareForm();
      resetSelectedActivities();
      resetSelectedDocuments();
      resetStationsClassPlan();
    }
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { type } } } = this.props;
    const {
      listDisciplineFilters, listTeachingLevelFilters, listTeachingYearFilters, prepareForm,
      resetSelectedObjects, resetSelectedDocuments, resetStationsClassPlan, resetSelectedOnlineTests,
    } = this.props;
    if (prevProps.match.params.type !== type) {
      listDisciplineFilters();
      listTeachingLevelFilters();
      listTeachingYearFilters();
      prepareForm();
      resetSelectedObjects();
      resetSelectedDocuments();
      resetStationsClassPlan();
      resetSelectedOnlineTests();
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
        isCreating, error, match,
      } = this.props;

      if (isCreating) {
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
                Erro no plano de aula
            </Alert>
          </HomeUserPage>
        );
      }


      const { type } = match.params;

      return (
        <HomeUserPage>
          { type === 'T' ? (<ClassPlanForm {...this.props} actionName="Criar" />) : (
            <ClassPlanStationsForm {...this.props} actionName="Criar" />
          )}
        </HomeUserPage>
      );
    }
}
export default CreateClassPlanPage;
