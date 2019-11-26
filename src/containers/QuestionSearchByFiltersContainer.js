import { connect } from 'react-redux';
import QuestionSearchByFilters from 'components/question/QuestionSearchByFilters';
import {
  addMyQuestionsFilter, listDisciplineFilters, listSourceFilters, listYearFilters, listTeachingLevelFilters,
  addSelectedDisciplineFilter, addSelectedTopicFilter,
  resetTopicListSelected,
  addSelectedSourceFilter,
  addSelectedYearFilter,
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
  disciplineFilters: state.filter.disciplineFiltersJoined,
  topicFilters: state.filter.topicFilters,
  moreTopicFilters: state.filter.moreTopicFilters,
  topicsSelected: state.filter.topicsSelected,
  filter: state.filter,
  sourceIdSelected: state.filter.sourcesSelected && state.filter.sourcesSelected.length > 0 ? state.filter.sourcesSelected[0].id : -1,
  yearIdSelected: state.filter.yearsSelected && state.filter.yearsSelected.length > 0 ? state.filter.yearsSelected[0].id : -1,


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
  listSourceFilters: param => dispatch(listSourceFilters(param)),
  listYearFilters: param => dispatch(listYearFilters(param)),
  listTeachingLevelFilters: param => dispatch(listTeachingLevelFilters(param)),

  addSelectedDisciplineFilter: idDiscipline => dispatch(addSelectedDisciplineFilter(idDiscipline)),
  addSelectedTopicFilter: topic => dispatch(addSelectedTopicFilter(topic)),
  resetTopicListSelected: () => dispatch(resetTopicListSelected()),
  listTopicSuggestions: (param, filter) => dispatch(listTopicSuggestions(param, filter)),

  addSelectedSourceFilter: idSource => dispatch(addSelectedSourceFilter(idSource)),
  addSelectedYearFilter: idDiscipline => dispatch(addSelectedYearFilter(idDiscipline)),

});

const QuestionSearchByFiltersContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionSearchByFilters);


export default QuestionSearchByFiltersContainer;
