import {
  Alert,
} from 'reactstrap';
import React, { Component } from 'react';
import QuestionForm from 'components/question/QuestionForm';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';

class MyQuestionEditPage extends Component {
  componentDidMount() {
    const {
      listDisciplineFilters, listTeachingLevelFilters, listSourceFilters,
    } = this.props;
    listDisciplineFilters();
    listTeachingLevelFilters();
    listSourceFilters();
    const { fetchQuestion, match } = this.props;
    fetchQuestion(match.params.id);
    // prepareForm();
  }

  componentDidUpdate(prevProps) {
    const { fetchQuestion, match: { params: { id } } } = this.props;
    if (prevProps.match.params.id !== id) {
      const {
        listDisciplineFilters, listTeachingLevelFilters, listSourceFilters,
      } = this.props;
      listDisciplineFilters();
      listTeachingLevelFilters();
      listSourceFilters();
      fetchQuestion(id);
    }
  }

  render() {
    const {
      activeQuestion, userId, isFetching, error,
    } = this.props;
    const authorPK = activeQuestion && activeQuestion.author ? activeQuestion.author.pk : 'Anônimo';

    if (isFetching) {
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

    if (activeQuestion && activeQuestion.disabled) {
      return (
        <HomeUserPage>
          <Alert color="danger">
              Questão não disponível para edição
          </Alert>
        </HomeUserPage>
      );
    }


    if (authorPK !== userId) {
      return (
        <HomeUserPage>
          <Alert color="danger">
                Você não tem permissão para editar esta questão.
          </Alert>
        </HomeUserPage>
      );
    }

    return (
      <HomeUserPage>
        <QuestionForm {...this.props} actionName="Editar" />
      </HomeUserPage>
    );
  }
}
export default MyQuestionEditPage;
