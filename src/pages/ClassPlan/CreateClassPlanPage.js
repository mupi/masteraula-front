
import React, { Component } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import {
  Alert,
} from 'reactstrap';
import { history } from 'helpers';

import ClassPlanForm from '../../components/classplan/ClassPlanForm';


class CreateClassPlanPage extends Component {
  componentDidMount() {
    const {
      listDisciplineFilters, listTeachingLevelFilters, listTeachingYearFilters, prepareForm,
      resetSelectedObjects, resetSelectedDocuments, match,
    } = this.props;

    if (match.params.type !== 'T' && match.params.type !== 'S') {
      history.push('/my-dashboard/');
    } else {
      listDisciplineFilters();
      listTeachingLevelFilters();
      listTeachingYearFilters();
      prepareForm();
      resetSelectedObjects();
      resetSelectedDocuments();
    }
  }

    listTopicSuggestions = (param) => {
      if (param && param.length === 3) {
        const { listTopicSuggestions } = this.props;
        listTopicSuggestions(param);
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
            <Alert className="alert--warning" color="warning">
                Em desenvolvimento a tela de Plano de Rotação por estações
            </Alert>
          )}
        </HomeUserPage>
      );
    }
}
export default CreateClassPlanPage;
