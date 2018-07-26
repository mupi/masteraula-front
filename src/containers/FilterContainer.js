import { connect } from 'react-redux'
import SidebarFilter from 'components/sidebar/sidebarFilters'
import { listDisciplineFilters, listTeachingLevelFilters } from 'actions/filterAction.js'

//state.<reducer's name>.<property>
  const mapStateToProps = state => ({
        disciplineFilters: state.filter.disciplineFilters,
        teachingLevelFilters: state.filter.teachingLevelFilters,
        isFetchingDisciplineFilters: state.question.isFetchingDisciplineFilters,
        isFetchingTeachingLevelFilters: state.question.isFetchingTeachingLevelFilters
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
