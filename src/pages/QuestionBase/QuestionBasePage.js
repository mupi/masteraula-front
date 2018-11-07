import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Alert, Col, Button,
} from 'reactstrap';
import QuestionList from 'components/question/QuestionList';

import CustomPagination from 'components/pagination/CustomPagination';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import QuestionSearchFormContainer from 'containers/QuestionSearchFormContainer';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-toastify/dist/ReactToastify.css';

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
      questionPage, isFetching, error, filter, toggleSelectedDisciplineFilter, toggleSelectedDifficultyFilter,
      toggleSelectedTeachingLevelFilter,
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

    function clearDisciplines(event) {
      toggleSelectedDisciplineFilter(event.target.id, false);
    }

    function clearDifficulties(event) {
      toggleSelectedDifficultyFilter(event.target.id, false);
    }

    function clearTeachingLevel(event) {
      toggleSelectedTeachingLevelFilter(event.target.id, false);
    }

    return (
      <HomeUserPage showFilters>
        <ToastContainer hideProgressBar position="bottom-right" />
        <div className="c-question-base">
          <QuestionSearchFormContainer />
          {(filter.disciplinesSelected.length > 0) || (filter.difficultiesSelected.length > 0) || (filter.teachingLevelsSelected.length > 0) ? (
            <Row>
              <Col sm="12">
                <p className="c-question-base__keywords-title">
                  <span className="btn__icon">
                    Filtros selecionados:
                  </span>
                  {filter.disciplinesSelected.map(item => (
                    <Button key={item.id} id={item.id} onClick={clearDisciplines} className="c-question-base__filter-selected">
                      <span> {item.name} x</span>
                    </Button>
                  )).concat(
                    filter.difficultiesSelected.map(item => (
                      <Button key={item.id} id={item.id} onClick={clearDifficulties} className="c-question-base__filter-selected">
                        {item.name} x
                      </Button>
                    )),
                    filter.teachingLevelsSelected.map(item => (
                      <Button key={item.id} id={item.id} onClick={clearTeachingLevel} className="c-question-base__filter-selected">
                        {item.name} x
                      </Button>
                    )),
                  )}
                </p>
              </Col>
            </Row>) : ''
      }


          <Row className="pagination-questions" style={{ marginLeft: '80%' }}>
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
          <Row className="pagination-questions" style={{ marginLeft: '80%' }}>
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
