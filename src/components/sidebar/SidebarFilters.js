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
    const {
      listDisciplineFilters, listTeachingLevelFilters, listSourceFilters, listYearFilters,
    } = this.props;
    listDisciplineFilters();
    listTeachingLevelFilters();
    listSourceFilters();
    listYearFilters();
  }

  render() {
    const {
      /* disciplineFilters, */ teachingLevelFilters, sourceFilters, yearFilters,
      isFetchingDisciplineFilters, isFetchingTeachingLevelFilters, isFetchingSourceFilters, isFetchingYearFilters,
      error, isFetchingQuestions,
      /* toggleSelectedDisciplineFilter, */ toggleSelectedTeachingLevelFilter, toggleSelectedDifficultyFilter,
      toggleSelectedSourceFilter, toggleSelectedYearFilter,
      filter,
      clearFilters,
      onlyMyQuestions,
    } = this.props;

    if (isFetchingDisciplineFilters || isFetchingTeachingLevelFilters || isFetchingSourceFilters || isFetchingYearFilters
    ) {
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
          || filter.difficultiesSelected.length > 0 || filter.sourcesSelected.length > 0
          || filter.yearsSelected.length > 0 || onlyMyQuestions
          ? (
            <div className="l-question-all-filters__clear-button">
              <Button className="l-question-all-filters__clear-button--btn" onClick={clearFilters} disabled={isFetchingQuestions}>
              Limpar todos os filtros
              </Button>
            </div>
          )
          : ''
        }
        {/* <SidebarFilter
          id="1"
          name="Disciplinas"
          filterList={disciplineFilters}
          toggleFilter={toggleSelectedDisciplineFilter}
          selected={filter.disciplinesSelected}
          isFetchingQuestions={isFetchingQuestions}
        /> */}
        <SidebarFilter
          id="2"
          name="Nível de Ensino"
          filterList={teachingLevelFilters}
          toggleFilter={toggleSelectedTeachingLevelFilter}
          selected={filter.teachingLevelsSelected}
          isFetchingQuestions={isFetchingQuestions}

        />
        <SidebarFilter
          id="3"
          name="Dificuldade"
          filterList={filters.difficultyLevels}
          toggleFilter={toggleSelectedDifficultyFilter}
          selected={filter.difficultiesSelected}
          isFetchingQuestions={isFetchingQuestions}

        />
        <SidebarFilter
          id="4"
          name="Vestibular"
          filterList={sourceFilters}
          toggleFilter={toggleSelectedSourceFilter}
          selected={filter.sourcesSelected}
          isFetchingQuestions={isFetchingQuestions}

        />
        <SidebarFilter
          id="5"
          name="Ano"
          filterList={yearFilters}
          toggleFilter={toggleSelectedYearFilter}
          selected={filter.yearsSelected}
          isFetchingQuestions={isFetchingQuestions}

        />
      </ListGroup>
    );
  }
}


export default SidebarFilters;
