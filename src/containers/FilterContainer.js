import { connect } from 'react-redux';
import SidebarFilters from 'components/sidebar/SidebarFilters';
import { listDisciplineFilters, listTeachingLevelFilters } from 'actions/filterAction';

// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  disciplineFilters: state.filter.disciplineFilters,
  teachingLevelFilters: state.filter.teachingLevelFilters,
  isFetchingDisciplineFilters: state.filter.isFetchingDisciplineFilters,
  isFetchingTeachingLevelFilters: state.filter.isFetchingTeachingLevelFilters,
});

const mapDispatchToProps = dispatch => ({
  listDisciplineFilters: param => dispatch(listDisciplineFilters(param)),
  listTeachingLevelFilters: param => dispatch(listTeachingLevelFilters(param)),
});

const FilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarFilters);

export default FilterContainer;
