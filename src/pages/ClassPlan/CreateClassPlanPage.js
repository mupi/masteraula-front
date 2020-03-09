
import React, { Component } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import {
  Alert,
} from 'reactstrap';
import { Prompt } from 'react-router-dom';

import ClassPlanForm from '../../components/classplan/ClassPlanForm';


class CreateClassPlanPage extends Component {
  componentDidMount() {
    const {
      listDisciplineFilters, listTeachingLevelFilters, listTeachingYearFilters, prepareForm,
      resetSelectedObjects, resetSelectedDocuments,
    } = this.props;
    listDisciplineFilters();
    listTeachingLevelFilters();
    listTeachingYearFilters();
    prepareForm();
    resetSelectedObjects();
    resetSelectedDocuments();
  }

    listTopicSuggestions = (param) => {
      if (param && param.length === 3) {
        const { listTopicSuggestions } = this.props;
        listTopicSuggestions(param);
      }
    }

    render() {
      const {
        isCreating, error, pristine,
        submitting,
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

      return (
        <HomeUserPage>
          <Prompt
            when={!pristine && !submitting}
            message="Tem certeza de sair da tela de Criar Plano de aula?"
          />
          <ClassPlanForm {...this.props} actionName="Criar" />
        </HomeUserPage>
      );
    }
}
export default CreateClassPlanPage;
