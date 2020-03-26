import { connect } from 'react-redux';
import QuestionSearchByFilters from 'components/question/QuestionSearchByFilters';
import {
  addMyQuestionsFilter, listDisciplineFilters, listSourceFilters, listYearFilters, listTeachingLevelFilters,
  addSelectedDisciplineFilter, addSelectedTopicFilter,
  resetTopicListSelected,
  addSelectedSourceFilter,
  addSelectedYearFilter,
  setSearchTextQuestionModal,
} from 'actions/filterAction';
import { history } from 'helpers';
import { change, reduxForm } from 'redux-form';
import { listTopicSuggestions } from 'actions/suggestionAction';
import { setCurrentPageModal } from 'actions/questionAction';

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
  disciplineFilters: state.filter.disciplineFiltersJoined,
  author: state.session.session.user.id,
  isFetchingQuestions: state.question.isFetching,
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

const setDispatchSearchText = searchText => setSearchTextQuestionModal(searchText);

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

  addSelectedSourceFilter: idSource => dispatch(addSelectedSourceFilter(idSource)),
  addSelectedYearFilter: idDiscipline => dispatch(addSelectedYearFilter(idDiscipline)),

  /* filters */
  onSubmit: (values) => {
    dispatch(setCurrentPageModal(1));
    dispatch(setDispatchSearchText(values.searchText));
  },
  search: (searchTextModal) => {
    dispatch(setDispatchSearchText(searchTextModal));
  },
  clearSearchText: () => {
    dispatch(change('questionSearchModal', 'searchTextModal', ''));
    dispatch((_dispatch, getState) => {
      const { searchTextModal } = getState().filter;
      if (searchTextModal) {
        dispatch(setSearchTextQuestionModal(''));
      }
    });
  },
  listTopicSuggestions: param => dispatch(listTopicSuggestions(param)),

});

const QuestionSearchByFiltersModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'questionSearchModal',
})(QuestionSearchByFilters));


export default QuestionSearchByFiltersModalContainer;
