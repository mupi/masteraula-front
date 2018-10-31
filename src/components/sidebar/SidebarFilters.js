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
  }

  render() {
    const {
      disciplineFilters, teachingLevelFilters, isFetchingDisciplineFilters, isFetchingTeachingLevelFilters, error,
      toggleSelectedDisciplineFilter, toggleSelectedTeachingLevelFilter, toggleSelectedDifficultyFilter, filter,
      clearFilters,
    } = this.props;

    // function clear(event) {
    //   console.log(event.target);
    //   toggleSelectedDisciplineFilter(event.target.id, false);
    // }
    if (isFetchingDisciplineFilters || isFetchingTeachingLevelFilters) {
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
              {/* filter.disciplinesSelected.map(item => (
                <Button id={item} onClick={clear}>
                  {item} X
                </Button>
              )).concat(
                filter.difficultiesSelected.map(item => (
                  <Button>
                    {item} X
                  </Button>
                )),
                filter.teachingLevelsSelected.map(item => (
                  <Button>
                    {item} X
                  </Button>
                )),
              ) */}
            </div>
          )
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
