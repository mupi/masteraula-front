import React from 'react';
import {
  ListGroup, ListGroupItem, Input, Button, UncontrolledCollapse,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SidebarFilter = ({
  name, filterList, toggleFilter, selected, id,
}) => {
  const handleFilter = (event) => {
    const valueFilter = event.target.value;
    toggleFilter(valueFilter, event.target.checked);
  };

  const isChecked = filterId => (selected && selected.filter(item => item.id === filterId).length > 0);

  return (
    <ListGroupItem className="c-filters">
      <div className="c-filters__question-category-filter">
        {name}
        <Button id={`toggler${id}`} className="c-filters__question-category-filter-icon" color="light"><FontAwesomeIcon icon="angle-left" /></Button>
      </div>
      <UncontrolledCollapse toggler={id ? `#toggler${id}` : ''}>
        <ListGroup className="c-filters__question-group-filters">
          {filterList && filterList.map(filter => (
            <ListGroupItem
              key={filter.id}
              color="light"
              className={isChecked(filter.id) ? 'c-filters__question-single-filter c-sidebar__filter-selected' : 'c-filters__question-single-filter'}
            >
              <Input type="checkbox" value={filter.id} onClick={handleFilter} checked={isChecked(filter.id)} readOnly />
              {filter.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </UncontrolledCollapse>
    </ListGroupItem>
  );
};


export default SidebarFilter;
