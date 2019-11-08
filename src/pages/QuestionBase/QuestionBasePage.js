import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Alert, Col, Button,
} from 'reactstrap';
import QuestionList from 'components/question/QuestionList';

import CustomPagination from 'components/pagination/CustomPagination';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import QuestionSearchByTopicsContainer from 'containers/QuestionSearchByTopicsContainer';

class QuestionBasePage extends React.Component {
  componentDidMount() {
    const {
      match, filter, listQuestions, user,
    } = this.props;
    listQuestions(parseInt(match.params.page, 10), filter, user.id);
  }

  componentDidUpdate(prevProps) {
    const {
      match, filter, listQuestions, user,
    } = this.props;
    if ((match.params.page !== prevProps.match.params.page)
    || (filter !== prevProps.filter)) {
      listQuestions(parseInt(match.params.page, 10), filter, user.id);
    }
  }

  render() {
    const {
      questionPage, isFetching, error, filter, toggleSelectedDifficultyFilter,
      toggleSelectedTeachingLevelFilter, toggleSelectedSourceFilter, toggleSelectedYearFilter,
      removeSelectedTopicFilter, listTopicFilters,
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

    function clearTopic(event) {
      const newTopics = filter.topicsSelected.filter(item => item.id !== parseInt(event.target.id, 10));
      removeSelectedTopicFilter(event.target.id);
      listTopicFilters(filter.disciplinesSelected, [...newTopics]);
    }

    function clearDifficulties(event) {
      toggleSelectedDifficultyFilter(event.target.id, false);
    }

    function clearTeachingLevel(event) {
      toggleSelectedTeachingLevelFilter(event.target.id, false);
    }

    function clearSources(event) {
      toggleSelectedSourceFilter(event.target.id, false);
    }


    function clearYears(event) {
      toggleSelectedYearFilter(event.target.id, false);
    }

    return (
      <HomeUserPage showFilters showFiltersForObjectBase={false}>
        <div className="c-question-base">
          <QuestionSearchByTopicsContainer />
          { /* (filter.disciplinesSelected.length > 0) || */
          (filter.difficultiesSelected.length > 0)
          || (filter.teachingLevelsSelected.length > 0)
          || (filter.sourcesSelected.length > 0)
          || (filter.yearsSelected.length > 0)
          || (filter.topicsSelected.length > 0) ? (
            <Row>
              <Col sm="12">
                <p className="c-question-base__keywords-title">
                  <span className="btn__icon">
                    Filtros selecionados:
                  </span>
                  {filter.topicsSelected.map(item => (
                    <Button
                      disabled={isFetching}
                      key={`${item.id}`}
                      id={item.id}
                      className="c-question-base__filter-selected"
                      onClick={clearTopic}
                    >
                      {item.name}
                      {' '}
                        x
                    </Button>
                  )).concat(filter.difficultiesSelected.map(item => (
                    <Button
                      disabled={isFetching}
                      key={`DF${item.id}`}
                      id={item.id}
                      onClick={clearDifficulties}
                      className="c-question-base__filter-selected"
                    >
                      {item.name}
                      {' '}
                        x
                    </Button>
                  )),
                  filter.teachingLevelsSelected.map(item => (
                    <Button
                      disabled={isFetching}
                      key={`TL${item.id}`}
                      id={item.id}
                      onClick={clearTeachingLevel}
                      className="c-question-base__filter-selected"
                    >
                      {item.name}
                      {' '}
                        x
                    </Button>
                  )),
                  filter.sourcesSelected.map(item => (
                    <Button
                      disabled={isFetching}
                      key={`S${item.id}`}
                      id={item.id}
                      onClick={clearSources}
                      className="c-question-base__filter-selected"
                    >
                      {item.name}
                      {' '}
                        x
                    </Button>
                  )),
                  filter.yearsSelected.map(item => (
                    <Button
                      disabled={isFetching}
                      key={`Y${item.id}`}
                      id={item.id}
                      onClick={clearYears}
                      className="c-question-base__filter-selected"
                    >
                      {item.name}
                      {' '}
                        x
                    </Button>
                  )))}
                </p>
              </Col>
            </Row>
            ) : ''
      }


          <Row className="pagination-questions" style={{ marginLeft: '80%' }}>
            <CustomPagination {...this.props} {...questionPage} disabled={isFetching} itensPerPage={16} />
          </Row>
          <div className="c-question-base__results">
            { isFetching ? (
              <Alert className="c-question-base__alert--warning" color="warning" fade={false}>
                  Carregando ...
              </Alert>
            ) : (
              <QuestionList sm="4" {...this.props} questions={questionPage.results} count={questionPage.count} />
            )
            }
          </div>
          <Row className="pagination-questions" style={{ marginLeft: '80%' }}>
            <CustomPagination {...this.props} {...questionPage} disabled={isFetching} itensPerPage={16} />
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
