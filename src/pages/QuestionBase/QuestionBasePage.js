import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Alert, Col, Button,
} from 'reactstrap';
import QuestionList from 'components/question/QuestionList';

import CustomPagination from 'components/pagination/CustomPagination';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import QuestionSearchByFiltersContainer from 'containers/QuestionSearchByFiltersContainer';
/* import QuestionSearchFormContainer from 'containers/QuestionSearchFormContainer'; */

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
    || (filter.disciplinesSelected !== prevProps.filter.disciplinesSelected)
    || (filter.teachingLevelsSelected !== prevProps.filter.teachingLevelsSelected)
    || (filter.sourcesSelected !== prevProps.filter.sourcesSelected)
    || (filter.yearsSelected !== prevProps.filter.yearsSelected)
    || (filter.topicsSelected !== prevProps.filter.topicsSelected)
    || (filter.difficultiesSelected !== prevProps.filter.difficultiesSelected)
    || (filter.myQuestionlabelsSelected !== prevProps.filter.myQuestionlabelsSelected)
    || (filter.onlyMyQuestions !== prevProps.filter.onlyMyQuestions)
    || (filter.searchText !== prevProps.filter.searchText)) {
      listQuestions(parseInt(match.params.page, 10), filter, user.id);
    }
  }

  render() {
    const {
      questionPage, isFetching, error, filter, toggleSelectedDifficultyFilter,
      toggleSelectedTeachingLevelFilter, toggleSelectedSourceFilter, toggleSelectedYearFilter, toggleSelectedDisciplineFilter,
      removeSelectedTopicFilter, removeSelectedMyQuestionLabelFilter,
      search,
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
      removeSelectedTopicFilter(event.target.id);
    }

    function clearMyQuestionLabel(event) {
      removeSelectedMyQuestionLabelFilter(event.target.id);
    }

    function clearDifficulties(event) {
      toggleSelectedDifficultyFilter(event.target.id, false);
    }

    function clearDisciplines(event) {
      toggleSelectedDisciplineFilter(event.target.id, false);
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
          <QuestionSearchByFiltersContainer />
          { (filter.disciplinesSelected.length > 0)
          || (filter.difficultiesSelected.length > 0)
          || (filter.teachingLevelsSelected.length > 0)
          || (filter.sourcesSelected.length > 0)
          || (filter.yearsSelected.length > 0)
          || (filter.myQuestionlabelsSelected.length > 0)
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
                  filter.disciplinesSelected.map(item => (
                    <Button
                      disabled={isFetching}
                      key={`D${item.id}`}
                      id={item.id}
                      onClick={clearDisciplines}
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
                  )),
                  filter.myQuestionlabelsSelected.map(item => (
                    <Button
                      disabled={isFetching}
                      key={`L${item.id}`}
                      id={item.id}
                      onClick={clearMyQuestionLabel}
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
          { !isFetching ? (
            <Row>
              <Col sm="12" className="c-question-base__total-results">
                {`${questionPage.count} questões encontradas`}
                {search
                  ? (
                    <>
                      {' para '}
                      <span className="c-question-base__search-term">
                        {search}
                      </span>
                    </>
                  ) : ''
                }
                <a
                  className="c-question-base__link-askquestion"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://forms.gle/A1T4TPAMbrRA33hJA"
                >
                  (Não encontrou o que queria? Clique aqui)
                </a>
              </Col>
            </Row>
          ) : ''}
          <Row className="pagination-questions" style={{ marginLeft: '80%' }}>
            <CustomPagination {...this.props} {...questionPage} disabled={isFetching} itensPerPage={16} />
          </Row>
          <div className="c-question-base__results">
            { isFetching ? (
              <Alert className="c-question-base__alert--warning" color="warning" fade={false}>
                  Carregando ...
              </Alert>
            ) : (
              <QuestionList sm="4" {...this.props} questions={questionPage.results} count={questionPage.count} showQuantity={false} />
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
