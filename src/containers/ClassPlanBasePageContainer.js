import { connect } from 'react-redux';
import ClassPlanBasePage from 'pages/ClassPlan/ClassPlanBasePage';
import { listClassPlans } from 'actions/classPlanAction';


import {
  addSelectedDisciplineFilter, removeSelectedDisciplineFilter,
  addSelectedTeachingLevelFilter, removeSelectedTeachingLevelFilter,
  addSelectedDifficultyFilter, removeSelectedDifficultyFilter,
  addSelectedTopicFilter, removeSelectedTopicFilter,
  addSelectedYearFilter, removeSelectedYearFilter,
  resetTopicListSelected,
  addMyClassPlansFilter, listDisciplineFilters, listTeachingLevelFilters, listYearFilters,
  setSearchText,
} from 'actions/filterClassPlanAction';

import { history } from 'helpers';
import { listTopicSuggestions } from 'actions/suggestionAction';
import { change, reduxForm } from 'redux-form';

const toggleSelectedDisciplineFilter = (idDiscipline, value) => {
  history.replace('/class-plan-base/1');
  return value
    ? addSelectedDisciplineFilter(idDiscipline) : removeSelectedDisciplineFilter(idDiscipline);
};

const toggleSelectedTeachingLevelFilter = (idTeachingLevel, value) => {
  history.replace('/class-plan-base/1');
  return value
    ? addSelectedTeachingLevelFilter(idTeachingLevel) : removeSelectedTeachingLevelFilter(idTeachingLevel);
};

const toggleSelectedDifficultyFilter = (difficultyType, value) => {
  history.replace('/class-plan-base/1');
  return value
    ? addSelectedDifficultyFilter(difficultyType) : removeSelectedDifficultyFilter(difficultyType);
};

const toggleSelectedYearFilter = (idYear, value, nameYear = 'default') => {
  history.replace('/class-plans-base/1');
  return value
    ? addSelectedYearFilter(idYear, nameYear) : removeSelectedYearFilter(idYear);
};

const mapStateToProps = state => ({
  isFetching: state.classPlan.isFetching,
  classPlanPage: state.classPlan.classPlanPage,
  filter: state.filterClassPlan,
  currentPage: state.classPlan.currentPage,

  /* search filters */
  searchText: state.filterClassPlan.searchText,
  onlyMyClassPlan: state.filterClassPlan.onlyMyClassPlan,
  disciplineIdSelected: state.filterClassPlan.disciplinesSelected
    && state.filterClassPlan.disciplinesSelected.length > 0 ? state.filterClassPlan.disciplinesSelected[0].id : -1,
  disciplinesSelected: state.filterClassPlan.disciplinesSelected,
  disciplineFilters: state.filterClassPlan.disciplineFiltersJoined,
  author: state.session.session.user.id,
  user: state.session.session.user,
  topicFilters: state.filterClassPlan.topicFilters,
  moreTopicFilters: state.filterClassPlan.moreTopicFilters,
  topicsSelected: state.filterClassPlan.topicsSelected,
  /* autocomplete */
  isFetchingTopicSuggestions: state.suggestion.isFetchingSuggestions,
  topicSuggestions: state.suggestion.topicSuggestions,
});

const setDispatchSearchText = searchText => (dispatch) => {
  dispatch(setSearchText(searchText));
  history.replace('/class-plan-base/1');
};

const mapDispatchToProps = dispatch => ({
  listResults: (page, filter) => dispatch(listClassPlans(page, filter)),
  addMyMaterialFilter: (author, value) => {
    history.replace('/class-plan-base/1');
    dispatch(addMyClassPlansFilter(author, value));
  },
  listDisciplineFilters: param => 
  dispatch(listDisciplineFilters(param)),

  listTeachingLevelFilters: param => dispatch(listTeachingLevelFilters(param)),
  listTopicSuggestions: param => dispatch(listTopicSuggestions(param)),
  listYearFilters: param => dispatch(listYearFilters(param)),

  addSelectedDisciplineFilter: idDiscipline => dispatch(addSelectedDisciplineFilter(idDiscipline)),
  addSelectedTopicFilter: topic => dispatch(addSelectedTopicFilter(topic)),
  addSelectedYearFilter: (idYear, nameYear) => dispatch(toggleSelectedYearFilter(idYear, true, nameYear)),
  addSelectedTeachingLevelFilter: idTeachingLevel => dispatch(toggleSelectedTeachingLevelFilter(idTeachingLevel, true)),

  resetTopicListSelected: () => dispatch(resetTopicListSelected()),


  onSubmit: (values) => {
    dispatch(setDispatchSearchText(values.searchText));
  },
  search: (searchText) => {
    dispatch(setDispatchSearchText(searchText));
  },
  clearSearchText: () => {
    dispatch(change('classPlanSearch', 'searchText', ''));
    dispatch((_dispatch, getState) => {
      const { searchText } = getState().filterClassPlan;
      if (searchText) {
        dispatch(setSearchText(''));
      }
    });
  },


  toggleSelectedDisciplineFilter: (idDiscipline, value) => dispatch(toggleSelectedDisciplineFilter(idDiscipline, value)),
  toggleSelectedTeachingLevelFilter: (idTeachingLevel, value) => dispatch(toggleSelectedTeachingLevelFilter(idTeachingLevel, value)),
  toggleSelectedDifficultyFilter: (difficultyType, value) => dispatch(toggleSelectedDifficultyFilter(difficultyType, value)),
  toggleSelectedYearFilter: (idYear, value) => dispatch(toggleSelectedYearFilter(idYear, value)),

  removeSelectedTopicFilter: idTopic => dispatch(removeSelectedTopicFilter(idTopic)),

});

const ClassPlanBasePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'classPlanSearch',
})(ClassPlanBasePage));


export default ClassPlanBasePageContainer;
