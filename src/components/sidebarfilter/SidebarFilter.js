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
    <ListGroupItem className="question-category-filter">
      <div className="question-category-filter">
        {name}
        <Button id={`toggler${id}`} className="question-category-filter__icon-toogle" color="light"><FontAwesomeIcon icon="angle-left" /></Button>
      </div>
      <UncontrolledCollapse toggler={id ? `#toggler${id}` : ''}>
        <ListGroup className="question-single-filter">
          {filterList && filterList.map(filter => (
            <ListGroupItem key={filter.id} color="light" className={isChecked(filter.id) ? 'c-sidebar__filter-selected' : {}}>
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
