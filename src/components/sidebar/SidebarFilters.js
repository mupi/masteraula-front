import React, { Component } from 'react';
import { ListGroup, Alert, Button } from 'reactstrap';
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
      toggleSelectedDisciplineFilter, toggleSelectedTeachingLevelFilter, toggleSelectedDifficultyFilter, filter,
      clearFilters
    } = this.props;

    if (isFetchingDisciplineFilters || isFetchingTeachingLevelFilters) {
      return (
        <ListGroup className="question-all-filters">
          <h6>
            <i className="fa fa-filter" />
            {' Filtros'}
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
          {' Filtros'}
        </h6>
        {filter.disciplinesSelected.length > 0 || filter.teachingLevelsSelected.length > 0
          || filter.difficultiesSelected.length > 0 ? 
          <Button color='secondary' onClick={clearFilters}> Limpar filtros </Button>
          : ''
        }
        <SidebarFilter
          name="Disciplinas"
          filterList={disciplineFilters}
          toggleFilter={toggleSelectedDisciplineFilter}
          selected={filter.disciplinesSelected}
        />
        <SidebarFilter
          name="Nível de Ensino"
          filterList={teachingLevelFilters}
          toggleFilter={toggleSelectedTeachingLevelFilter}
          selected={filter.teachingLevelsSelected}
        />
        <SidebarFilter
          name="Dificuldade"
          filterList={filters.difficultyLevels}
          toggleFilter={toggleSelectedDifficultyFilter}
          selected={filter.difficultiesSelected}
        />
      </ListGroup>
    );
  }
}


export default SidebarFilters;
