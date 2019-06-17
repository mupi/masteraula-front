import { connect } from 'react-redux';
import { listQuestions } from 'actions/questionAction';
import { history } from 'helpers/history';

import SidebarFilters from 'components/sidebar/SidebarFilters';
import {
  listDisciplineFilters, listTeachingLevelFilters, listSourceFilters, listYearFilters,
  addSelectedDisciplineFilter, removeSelectedDisciplineFilter,
  addSelectedTeachingLevelFilter, removeSelectedTeachingLevelFilter,
  addSelectedDifficultyFilter, removeSelectedDifficultyFilter,
  addSelectedSourceFilter, removeSelectedSourceFilter,
  addSelectedYearFilter, removeSelectedYearFilter,
  clearSelectedFilters,
} from 'actions/filterAction';

// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  disciplineFilters: state.filter.disciplineFilters,
  teachingLevelFilters: state.filter.teachingLevelFilters,
  sourceFilters: state.filter.sourceFilters,
  yearFilters: state.filter.yearFilters,
  isFetchingDisciplineFilters: state.filter.isFetchingDisciplineFilters,
  isFetchingTeachingLevelFilters: state.filter.isFetchingTeachingLevelFilters,
  isFetchingSourceFilters: state.filter.isFetchingSourceFilters,
  isFetchingYearFilters: state.filter.isFetchingYearFilters,
  isFetchingQuestions: state.question.isFetching,
  filter: state.filter,
  questionPage: state.question.questionPage,
  currentPage: state.question.currentPage,
  onlyMyQuestions: state.filter.onlyMyQuestions,
});

const toggleSelectedDisciplineFilter = (idDiscipline, value) => {
  history.replace('/question-base/1');
  return value
    ? addSelectedDisciplineFilter(idDiscipline) : removeSelectedDisciplineFilter(idDiscipline);
};

const toggleSelectedTeachingLevelFilter = (idTeachingLevel, value) => {
  history.replace('/question-base/1');
  return value
    ? addSelectedTeachingLevelFilter(idTeachingLevel) : removeSelectedTeachingLevelFilter(idTeachingLevel);
};

const toggleSelectedDifficultyFilter = (difficultyType, value) => {
  history.replace('/question-base/1');
  return value
    ? addSelectedDifficultyFilter(difficultyType) : removeSelectedDifficultyFilter(difficultyType);
};

const toggleSelectedSourceFilter = (idSource, value) => {
  history.replace('/question-base/1');
  return value
    ? addSelectedSourceFilter(idSource) : removeSelectedSourceFilter(idSource);
};

const toggleSelectedYearFilter = (idYear, value) => {
  history.replace('/question-base/1');
  return value
    ? addSelectedYearFilter(idYear) : removeSelectedYearFilter(idYear);
};


const mapDispatchToProps = dispatch => ({
  listDisciplineFilters: param => dispatch(listDisciplineFilters(param)),
  listTeachingLevelFilters: param => dispatch(listTeachingLevelFilters(param)),
  listSourceFilters: param => dispatch(listSourceFilters(param)),
  listYearFilters: param => dispatch(listYearFilters(param)),

  toggleSelectedDisciplineFilter: (idDiscipline, value) => dispatch(toggleSelectedDisciplineFilter(idDiscipline, value)),
  toggleSelectedTeachingLevelFilter: (idTeachingLevel, value) => dispatch(toggleSelectedTeachingLevelFilter(idTeachingLevel, value)),
  toggleSelectedDifficultyFilter: (difficultyType, value) => dispatch(toggleSelectedDifficultyFilter(difficultyType, value)),
  toggleSelectedSourceFilter: (idSource, value) => dispatch(toggleSelectedSourceFilter(idSource, value)),
  toggleSelectedYearFilter: (idYear, value) => dispatch(toggleSelectedYearFilter(idYear, value)),

  listQuestions: (page, filter) => dispatch(listQuestions(page, filter)),
  clearFilters: () => dispatch(clearSelectedFilters()),
});

const FilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarFilters);

export default FilterContainer;
