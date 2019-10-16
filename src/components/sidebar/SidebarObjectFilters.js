import React, { Component } from 'react';
import { ListGroup, Alert, Button } from 'reactstrap';
import SidebarFilter from 'components/sidebarfilter/SidebarFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const filters = {
  objectTypes: [
    { id: 'I', name: 'Imagem' },
    { id: 'T', name: 'Texto' },
    { id: 'V', name: 'Vídeo' },
  ],
};

class SidebarObjectFilters extends Component {
  componentDidMount() {
  }

  render() {
    const {
      error, isFetchingObjects,
      toggleSelectedObjectTypeFilter,
      filterObject,
      clearFilters,
    } = this.props;

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
        {filterObject.typesObjectSelected.length > 0
          ? (
            <div className="l-question-all-filters__clear-button">
              <Button className="l-question-all-filters__clear-button--btn" onClick={clearFilters} disabled={isFetchingObjects}>
              Limpar todos os filtros
              </Button>
            </div>
          )
          : ''
        }
        <SidebarFilter
          id="1"
          name="Tipo"
          filterList={filters.objectTypes}
          toggleFilter={toggleSelectedObjectTypeFilter}
          selected={filterObject.typesObjectSelected}
          isFetchingQuestions={isFetchingObjects}
        />
      </ListGroup>
    );
  }
}


export default SidebarObjectFilters;
