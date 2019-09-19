import { connect } from 'react-redux';
import { history } from 'helpers';

import SidebarObjectFilters from 'components/sidebar/SidebarObjectFilters';
import {
  addSelectedObjectTypeFilter, removeSelectedObjectTypeFilter,
  clearSelectedFilters,
} from 'actions/filterObjectAction';

// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  isFetchingObjects: state.learningObject.isFetching,
  filterObject: state.filterObject,
});

const toggleSelectedObjectTypeFilter = (objectType, value) => {
  history.replace('/object-base/1');
  return value
    ? addSelectedObjectTypeFilter(objectType) : removeSelectedObjectTypeFilter(objectType);
};

const mapDispatchToProps = dispatch => ({
  toggleSelectedObjectTypeFilter: (objectType, value) => dispatch(toggleSelectedObjectTypeFilter(objectType, value)),
  clearFilters: () => dispatch(clearSelectedFilters()),
});

const SidebarObjectFiltersContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarObjectFilters);

export default SidebarObjectFiltersContainer;
