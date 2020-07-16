import { connect } from 'react-redux';
import ActivityBasePage from 'pages/Activity/ActivityBasePage';
import { listActivities } from 'actions/activityAction';


import {
  addSelectedDisciplineFilter, removeSelectedDisciplineFilter,
  addSelectedTeachingLevelFilter, removeSelectedTeachingLevelFilter,
  addSelectedDifficultyFilter, removeSelectedDifficultyFilter,
  addSelectedTopicFilter, removeSelectedTopicFilter,
  addSelectedYearFilter, removeSelectedYearFilter,
  resetTopicListSelected,
  addMyActivitiesFilter, listDisciplineFilters, listTeachingLevelFilters, listYearFilters,
  setSearchText,
} from 'actions/filterActivityAction';

import { history } from 'helpers';
import { listTopicSuggestions } from 'actions/suggestionAction';
import { change, reduxForm } from 'redux-form';

/*  Português : 2
    Literatura: 3

    Sociologia: 11
    Filosofia: 12
*/

const toggleSelectedDisciplineFilter = (idDiscipline, value) => {
  history.replace('/activity-base/1');
  return value
    ? addSelectedDisciplineFilter(idDiscipline) : removeSelectedDisciplineFilter(idDiscipline);
};

const toggleSelectedTeachingLevelFilter = (idTeachingLevel, value) => {
  history.replace('/activity-base/1');
  return value
    ? addSelectedTeachingLevelFilter(idTeachingLevel) : removeSelectedTeachingLevelFilter(idTeachingLevel);
};

const toggleSelectedDifficultyFilter = (difficultyType, value) => {
  history.replace('/activity-base/1');
  return value
    ? addSelectedDifficultyFilter(difficultyType) : removeSelectedDifficultyFilter(difficultyType);
};

const toggleSelectedYearFilter = (idYear, value, nameYear = 'default') => {
  history.replace('/activity-base/1');
  return value
    ? addSelectedYearFilter(idYear, nameYear) : removeSelectedYearFilter(idYear);
};

const mapStateToProps = state => ({
  /* PRECISO REFATORAR AQUI.. */
  isFetchingQuestions: state.activity.isFetching,
  isFetching: state.activity.isFetching,
  activityPage: state.activity.activityPage,
  filter: state.filterActivity,
  currentPage: state.activity.currentPage,

  /* search filters */
  searchText: state.filterActivity.searchText,
  onlyMyActivities: state.filterActivity.onlyMyActivities,
  disciplineIdSelected: state.filterActivity.disciplinesSelected
    && state.filterActivity.disciplinesSelected.length > 0 ? state.filterActivity.disciplinesSelected[0].id : -1,
  disciplinesSelected: state.filterActivity.disciplinesSelected,
  disciplineFilters: state.filterActivity.disciplineFiltersJoined,
  author: state.session.session.user.id,
  user: state.session.session.user,
  topicFilters: state.filterActivity.topicFilters,
  moreTopicFilters: state.filterActivity.moreTopicFilters,
  topicsSelected: state.filterActivity.topicsSelected,
  /* autocomplete */
  isFetchingTopicSuggestions: state.suggestion.isFetchingSuggestions,
  topicSuggestions: state.suggestion.topicSuggestions,
});

const setDispatchSearchText = searchText => (dispatch) => {
  dispatch(setSearchText(searchText));
  history.replace('/activity-base/1');
};

const mapDispatchToProps = dispatch => ({
  listResults: (page, filter) => dispatch(listActivities(page, filter)),

  addMyActivitiesFilter: (author, value) => {
    history.replace('/activity-base/1');
    dispatch(addMyActivitiesFilter(author, value));
  },
  /* PRECISO REFATORAR AQUI.. */
  addMyQuestionsFilter: (author, value) => {
    history.replace('/activity-base/1');
    dispatch(addMyActivitiesFilter(author, value));
  },
  listDisciplineFilters: param => dispatch(listDisciplineFilters(param)),
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
    dispatch(change('activitySearch', 'searchText', ''));
    dispatch((_dispatch, getState) => {
      const { searchText } = getState().filter;
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

const ActivityBasePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'activitySearch',
})(ActivityBasePage));


export default ActivityBasePageContainer;
