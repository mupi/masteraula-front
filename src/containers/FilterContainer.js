import { connect } from 'react-redux'
import SidebarFilter from 'components/sidebar/sidebarFilters'
import { listDisciplineFilters, listTeachingLevelFilters } from 'actions/filterAction.js'

//state.<reducer's name>.<property>
  const mapStateToProps = state => ({
        disciplineFilters: state.filter.disciplineFilters,
        teachingLevelFilters: state.filter.teachingLevelFilters,
  })

  const mapDispatchToProps = dispatch => ({
      listDisciplineFilters : () => {
        return dispatch(listDisciplineFilters())
      },
      listTeachingLevelFilters : () => {
        return dispatch(listTeachingLevelFilters())
      }
  })

  const FilterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(SidebarFilter);

  export default FilterContainer
