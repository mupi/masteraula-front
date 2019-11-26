import { connect } from 'react-redux';
import QuestionSearchByTopics from 'components/question/QuestionSearchByTopics';
import {
  addMyQuestionsFilter, listDisciplineFilters, addSelectedDisciplineFilter, addSelectedTopicFilter,
  resetTopicListSelected,
} from 'actions/filterAction';
import { history } from 'helpers';
import { listTopicSuggestions } from 'actions/suggestionAction';

/*  Português : 2
    Literatura: 3

    Sociologia: 11
    Filosofia: 12
*/

const mapStateToProps = state => ({
  initialValues: {
    // onlyMyQuestions: state.filter.onlyMyQuestions,
    // discipline: state.filter.disciplinesSelected && state.filter.disciplinesSelected.length > 0 ? state.filter.disciplinesSelected[0].id : -1,
  },
  // search: state.filter.searchText,
  onlyMyQuestions: state.filter.onlyMyQuestions,
  disciplineIdSelected: state.filter.disciplinesSelected && state.filter.disciplinesSelected.length > 0 ? state.filter.disciplinesSelected[0].id : -1,
  disciplinesSelected: state.filter.disciplinesSelected,
  author: state.session.session.user.id,
  isFetchingQuestions: state.question.isFetching,
  disciplineFilters: state.filter.disciplineFilters,
  topicFilters: state.filter.topicFilters,
  moreTopicFilters: state.filter.moreTopicFilters,
  topicsSelected: state.filter.topicsSelected,
  filter: state.filter,

  /* autocomplete */
  isFetchingTopicSuggestions: state.suggestion.isFetchingSuggestions,
  topicSuggestions: state.suggestion.topicSuggestions,
});

const mapDispatchToProps = dispatch => ({
  addMyQuestionsFilter: (author, value) => {
    history.replace('/question-base/1');
    dispatch(addMyQuestionsFilter(author, value));
  },
  listDisciplineFilters: param => dispatch(listDisciplineFilters(param)),
  addSelectedDisciplineFilter: idDiscipline => dispatch(addSelectedDisciplineFilter(idDiscipline)),
  addSelectedTopicFilter: topic => dispatch(addSelectedTopicFilter(topic)),
  resetTopicListSelected: () => dispatch(resetTopicListSelected()),
  listTopicSuggestions: (param, filter) => dispatch(listTopicSuggestions(param, filter)),
});

const QuestionSearchByTopicsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionSearchByTopics);


export default QuestionSearchByTopicsContainer;
