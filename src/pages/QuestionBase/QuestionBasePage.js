import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Alert,
} from 'reactstrap';
import QuestionList from 'components/question/QuestionList';

import CustomPagination from 'components/pagination/CustomPagination';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import QuestionSearchForm from '../../components/question/QuestionSearchForm';

class QuestionBasePage extends React.Component {
  componentDidMount() {
    const { match, filter, listQuestions } = this.props;
    listQuestions(parseInt(match.params.page, 10), filter);
  }

  componentDidUpdate(prevProps) {
    const { match, filter, listQuestions } = this.props;
    if ((match.params.page !== prevProps.match.params.page)
    || (filter !== prevProps.filter)) {
      listQuestions(parseInt(match.params.page, 10), filter);
    }
  }

  render() {
    const {
      questionPage, isFetching, error, handleSubmitQuestionSearch,
    } = this.props;
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
          <QuestionSearchForm onSubmit={handleSubmitQuestionSearch} />
          <Row className="pagination-questions">
            <CustomPagination {...this.props} {...questionPage} itensPerPage={16} />
          </Row>
          <div className="c-question-base__results">
            { isFetching ? (
              <Alert className="c-question-base__alert--warning" color="warning" fade={false}>
                  Carregando ...
              </Alert>
            ) : (
              <QuestionList sm="3" {...this.props} questions={questionPage.results} count={questionPage.count} />
            )
            }
          </div>
          <Row className="pagination-questions">
            <CustomPagination {...this.props} {...questionPage} itensPerPage={16} />
          </Row>
        </div>
      </HomeUserPage>
    );
  }
}

QuestionBasePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string.isRequired,
    }),
  }).isRequired,
  filter: PropTypes.shape({}).isRequired,
  listQuestions: PropTypes.func.isRequired,
  questionPage: PropTypes.shape({}),
  isFetching: PropTypes.bool,
  error: PropTypes.string,
};

QuestionBasePage.defaultProps = {
  questionPage: null,
  isFetching: false,
  error: null,
};

export default QuestionBasePage;
