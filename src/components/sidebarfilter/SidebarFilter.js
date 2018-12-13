import React from 'react';
import { ListGroup, ListGroupItem, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SidebarFilter = ({
  name, filterList, toggleFilter, selected,
}) => {
  const handleFilter = (event) => {
    const valueFilter = event.target.value;
    toggleFilter(valueFilter, event.target.checked);
  };

  const isChecked = id => (selected && selected.filter(item => item.id === id).length > 0);

  return (
    <ListGroupItem className="question-category-filter" color="light">
      <div>
        {name}
        <span className="question-category-filter__icon-toogle"><FontAwesomeIcon icon="angle-left" /></span>
      </div>
      <ListGroup className="question-single-filter">
        {filterList && filterList.map(filter => (
          <ListGroupItem key={filter.id} color="light" className={isChecked(filter.id) ? 'c-sidebar__filter-selected' : {}}>
            <Input type="checkbox" value={filter.id} onClick={handleFilter} checked={isChecked(filter.id)} readOnly />
            {filter.name}
          </ListGroupItem>
        ))}
      </ListGroup>
    </ListGroupItem>
  );
};


export default SidebarFilter;
