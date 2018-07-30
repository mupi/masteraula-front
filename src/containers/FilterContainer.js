import { connect } from 'react-redux';
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
  questionFilters: state.question,
});

const mapDispatchToProps = dispatch => ({
  listDisciplineFilters: param => dispatch(listDisciplineFilters(param)),
  listTeachingLevelFilters: param => dispatch(listTeachingLevelFilters(param)),
  addSelectedDisciplineFilter: idDiscipline => dispatch(addSelectedDisciplineFilter(idDiscipline)),
  removeSelectedDisciplineFilter: idDiscipline => dispatch(removeSelectedDisciplineFilter(idDiscipline)),
  addSelectedTeachingLevelFilter: idTeachingLevel => dispatch(addSelectedTeachingLevelFilter(idTeachingLevel)),
  removeSelectedTeachingLevelFilter: idTeachingLevel => dispatch(removeSelectedTeachingLevelFilter(idTeachingLevel)),
  addSelectedDifficultyFilter: difficultyType => dispatch(addSelectedDifficultyFilter(difficultyType)),
  removeSelectedDifficultyFilter: difficultyType => dispatch(removeSelectedDifficultyFilter(difficultyType)),
});

const FilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarFilters);

export default FilterContainer;
