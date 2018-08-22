import { connect } from 'react-redux';
import { listQuestions } from 'actions/questionAction';
import { history } from 'helpers/history';

import SidebarFilters from 'components/sidebar/SidebarFilters';
import {
  listDisciplineFilters, listTeachingLevelFilters,
  addSelectedDisciplineFilter, removeSelectedDisciplineFilter,
  addSelectedTeachingLevelFilter, removeSelectedTeachingLevelFilter,
  addSelectedDifficultyFilter, removeSelectedDifficultyFilter,

} from 'actions/filterAction';

// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  disciplineFilters: state.filter.disciplineFilters,
  teachingLevelFilters: state.filter.teachingLevelFilters,
  isFetchingDisciplineFilters: state.filter.isFetchingDisciplineFilters,
  isFetchingTeachingLevelFilters: state.filter.isFetchingTeachingLevelFilters,
  filter: state.filter,
  questionPage: state.question.questionPage,
  currentPage: state.question.currentPage,

});

const toogleSelectedDisciplineFilter = (idDiscipline, value) => {
  return value
    ? addSelectedDisciplineFilter(idDiscipline) : removeSelectedDisciplineFilter(idDiscipline);
};

const toogleSelectedTeachingLevelFilter = (idTeachingLevel, value) => {
  return value
    ? addSelectedTeachingLevelFilter(idTeachingLevel) : removeSelectedTeachingLevelFilter(idTeachingLevel);
};

const toogleSelectedDifficultyFilter = (difficultyType, value) => {
  return value
    ? addSelectedDifficultyFilter(difficultyType) : removeSelectedDifficultyFilter(difficultyType);
};


const mapDispatchToProps = dispatch => ({
  listDisciplineFilters: param => dispatch(listDisciplineFilters(param)),
  listTeachingLevelFilters: param => dispatch(listTeachingLevelFilters(param)),
  toogleSelectedDisciplineFilter: (idDiscipline, value) => dispatch(toogleSelectedDisciplineFilter(idDiscipline, value)),
  toogleSelectedTeachingLevelFilter: (idTeachingLevel, value) => dispatch(toogleSelectedTeachingLevelFilter(idTeachingLevel, value)),
  toogleSelectedDifficultyFilter: (difficultyType, value) => dispatch(toogleSelectedDifficultyFilter(difficultyType, value)),
  listQuestions: (page, filter) => dispatch(listQuestions(page, filter)),
});

const FilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarFilters);

export default FilterContainer;
