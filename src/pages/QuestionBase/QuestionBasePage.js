import React from 'react';
import {
  Row, Col, Input, InputGroup, InputGroupAddon, Button, Alert,
} from 'reactstrap';
import QuestionList from 'components/question/QuestionList';
import SuccessMessage from 'components/messages/SuccessMessage';
import FailureMessage from 'components/messages/FailureMessage';

import QuestionPagination from 'components/QuestionPagination/QuestionPagination';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';


const addQuestionMessages = (addQuestionResult = true) => {
  if (addQuestionResult) {
    return <SuccessMessage message="A questão foi adicionada ao documento" />
  }
  return <FailureMessage message="A questão não foi adicionada ao documento" />
}

const removeQuestionMessages = (removeQuestionResult) => {
  if (removeQuestionResult) {
    return <SuccessMessage message="A questão foi adicionada ao documento" />
  }
  return <FailureMessage message="A questão não foi adicionada ao documento" />
}

const createDocumentMessages = (creationDocumentResult) => {
  if (creationDocumentResult) {
    return <SuccessMessage message="A questão foi adicionada ao documento" />
  }
  return <FailureMessage message="A questão não foi adicionada ao documento" />
}


const updateDocumentMessages = (updateDocumentResult) => {
  if (updateDocumentResult) {
    return <SuccessMessage message="A questão foi adicionada ao documento" />
  }
  return <FailureMessage message="A questão não foi adicionada ao documento" />
}



const getResults = (isFetching, results, count, toggleModal, modal) => {
  if (!isFetching) {
    return <QuestionList questions={results}  sm="3" count={count} toggleModal={toggleModal} modal={modal} />;
  }

  return (
    <Alert className="c-question-base__alert--warning" color="warning">
        Carregando ...
    </Alert>
  );
};

class QuestionBasePage extends React.Component {
  componentDidMount() {
    this.props.listQuestions(parseInt(this.props.match.params.page, 10), this.props.filter);
  }

  componentDidUpdate(prevProps) {
    if ((this.props.match.params.page !== prevProps.match.params.page) ||
      (this.props.filter !== prevProps.filter))  {
      this.props.listQuestions(parseInt(this.props.match.params.page, 10), this.props.filter);
    }
  }

  render() {
    const { questionPage, isFetching, error, toggleModal, modal } = this.props;

    if (error) {
      return (
        <HomeUserPage>
          <Alert color="danger">
            {error.message}
          </Alert>
        </HomeUserPage>
      );
    }


    return (
      <HomeUserPage showFilters>
        <div className="c-question-base">
          {addQuestionMessages()}

          <Row className="c-question-base__search-text">
            Digite o termo e encontre soluções relacionadas
            <InputGroup>
              <Input />
              <InputGroupAddon addonType="prepend">
                <Button>
                  Pesquisar
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Row>
          <Row className="pagination-questions">
            <QuestionPagination {...this.props} {...questionPage} />
          </Row>
          <div className="c-question-base__results">
            {getResults(isFetching, questionPage.results, questionPage.count, toggleModal, modal)}
          </div>
          <Row className="pagination-questions">
            <QuestionPagination {...this.props} {...questionPage} />
          </Row>
        </div>
      </HomeUserPage>
    );
  }
}

export default QuestionBasePage;
