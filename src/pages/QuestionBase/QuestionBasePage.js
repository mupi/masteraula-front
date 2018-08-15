import React from 'react';
import {
  Row, Col, Input, InputGroup, InputGroupAddon, Button, Alert,
} from 'reactstrap';
import QuestionList from 'components/question/QuestionList';

import CustomPagination from 'components/pagination/CustomPagination';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';

const getResults = (isFetching, results, count, toggleModal, modal, activeDocument, addSelectedQuestion) => {
  if (!isFetching) {
    return (
      <QuestionList
        questions={results}
        sm="3"
        count={count}
        toggleModal={toggleModal}
        modal={modal}
        activeDocument={activeDocument}
        addSelectedQuestion={addSelectedQuestion}
      />
    );
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
    const { questionPage, isFetching, error, toggleModal, modal, activeDocument, addSelectedQuestion } = this.props;
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
            <CustomPagination {...this.props} {...questionPage} itensPerPage={8} />
          </Row>
          <div className="c-question-base__results">
            {getResults(isFetching, questionPage.results, questionPage.count, toggleModal, modal, activeDocument, addSelectedQuestion)}
          </div>
          <Row className="pagination-questions">
            <CustomPagination {...this.props} {...questionPage} itensPerPage={8} />
          </Row>
        </div>
      </HomeUserPage>
    );
  }
}

export default QuestionBasePage;
