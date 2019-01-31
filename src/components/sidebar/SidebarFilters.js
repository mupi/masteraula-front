import React, { Component } from 'react';
import { ListGroup, Alert, Button } from 'reactstrap';
import SidebarFilter from 'components/sidebarfilter/SidebarFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    this.props.listSourceFilters();
    this.props.listYearFilters();
  }

  render() {
    const {
      disciplineFilters, teachingLevelFilters, sourceFilters, yearFilters,
      isFetchingDisciplineFilters, isFetchingTeachingLevelFilters, isFetchingSourceFilters, isFetchingYearFilters,
      error,
      toggleSelectedDisciplineFilter, toggleSelectedTeachingLevelFilter, toggleSelectedDifficultyFilter,
      toggleSelectedSourceFilter, toggleSelectedYearFilter,
      filter,
      clearFilters,
    } = this.props;

    if (isFetchingDisciplineFilters || isFetchingTeachingLevelFilters || isFetchingSourceFilters || isFetchingYearFilters) {
      return (
        <ListGroup className="question-all-filters">
          <h6>
            <FontAwesomeIcon
              className="btn__icon"
              icon="filter"
            />
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
          <FontAwesomeIcon
            className="btn__icon"
            icon="filter"
          />
          {' Filtros'}
        </h6>
        {filter.disciplinesSelected.length > 0 || filter.teachingLevelsSelected.length > 0
          || filter.difficultiesSelected.length > 0
          ? (
            <div className="l-question-all-filters__clear-button">
              <Button className="l-question-all-filters__clear-button--btn" onClick={clearFilters}>
              Limpar todos os filtros
              </Button>
            </div>
          )
          : ''
        }
        <SidebarFilter
          id="1"
          name="Disciplinas"
          filterList={disciplineFilters}
          toggleFilter={toggleSelectedDisciplineFilter}
          selected={filter.disciplinesSelected}
        />
        <SidebarFilter
          id="2"
          name="Nível de Ensino"
          filterList={teachingLevelFilters}
          toggleFilter={toggleSelectedTeachingLevelFilter}
          selected={filter.teachingLevelsSelected}
        />
        <SidebarFilter
          id="3"
          name="Dificuldade"
          filterList={filters.difficultyLevels}
          toggleFilter={toggleSelectedDifficultyFilter}
          selected={filter.difficultiesSelected}
        />
        <SidebarFilter
          id="4"
          name="Fonte"
          filterList={sourceFilters}
          toggleFilter={toggleSelectedSourceFilter}
          selected={filter.sourcesSelected}
        />
        <SidebarFilter
          id="5"
          name="Ano"
          filterList={yearFilters}
          toggleFilter={toggleSelectedYearFilter}
          selected={filter.yearsSelected}
        />
      </ListGroup>
    );
  }
}


export default SidebarFilters;
