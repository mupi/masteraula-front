import React, { Component } from 'react';
import { ListGroup, Alert } from 'reactstrap';
import SidebarFilter from 'components/sidebarfilter/SidebarFilter';

const filters = {
  difficultyLevels: [
    { id: 'E', name: 'Fácil' },
    { id: 'M', name: 'Médio' },
    { id: 'H', name: 'Difícil' },
  ],
};


class SidebarFilters extends Component {
  componentDidMount() {
    this.props.listDisciplineFilters();
    this.props.listTeachingLevelFilters();
  }

  render() {
    const {
      disciplineFilters, teachingLevelFilters, isFetchingDisciplineFilters, isFetchingTeachingLevelFilters, error,
      addSelectedDisciplineFilter,removeSelectedDisciplineFilter,
      addSelectedTeachingLevelFilter, removeSelectedTeachingLevelFilter,
      addSelectedDifficultyFilter, removeSelectedDifficultyFilter,
    } = this.props;

    if (isFetchingDisciplineFilters || isFetchingTeachingLevelFilters) {
      return (
        <ListGroup className="question-all-filters">
          <h6>
            <i className="fa fa-filter" />
            {' '}
Filtros
          </h6>
          <Alert className="alert--warning" color="warning">

              Carregando ...
          </Alert>
        </ListGroup>
      );
    }

    if (error) {
      return (
        <ListGroup className="question-all-filters">
          <Alert color="danger">

              Erro nos filtros
          </Alert>
        </ListGroup>
      );
    }

    return (

      <ListGroup className="question-all-filters">
        <h6>
          <i className="fa fa-filter" />
          {' '}
Filtros
        </h6>
        <SidebarFilter
          name="Disciplinas"
          list={disciplineFilters}
          addFilter={addSelectedDisciplineFilter}
          removeFilter={removeSelectedDisciplineFilter}
        />
        <SidebarFilter
          name="Nível de Ensino"
          list={teachingLevelFilters}
          addFilter={addSelectedTeachingLevelFilter}
          removeFilter={removeSelectedTeachingLevelFilter}
        />
        <SidebarFilter
          name="Dificuldade"
          list={filters.difficultyLevels}
          addFilter={addSelectedDifficultyFilter}
          removeFilter={removeSelectedDifficultyFilter}
        />
      </ListGroup>
    );
  }
}


export default SidebarFilters;
