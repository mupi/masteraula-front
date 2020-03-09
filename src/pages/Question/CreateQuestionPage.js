import {
  Alert,
} from 'reactstrap';
import React, { Component } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import QuestionForm from 'components/question/QuestionForm';

class CreateQuestionPage extends Component {
  componentDidMount() {
    const {
      listDisciplineFilters, listTeachingLevelFilters, listSourceFilters, prepareForm, resetSelectedObjects,
    } = this.props;
    listDisciplineFilters();
    listTeachingLevelFilters();
    listSourceFilters();
    prepareForm();
    resetSelectedObjects();
  }

  listTopicSuggestions = (param) => {
    if (param && param.length === 3) {
      const { listTopicSuggestions } = this.props;
      listTopicSuggestions(param);
    }
  }

  render() {
    const {
      isCreating, error,
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
              Erro na questão
          </Alert>
        </HomeUserPage>
      );
    }

    return (
      <HomeUserPage>
        <QuestionForm {...this.props} />
      </HomeUserPage>
    );
  }
}
export default CreateQuestionPage;
