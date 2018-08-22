import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { UncontrolledCollapse, Button, Input } from 'reactstrap';


const SidebarFilter = ({name, filterList, toogleFilter}) => {

  const handleFilter = (event) => {
    const valueFilter = event.target.value;
    toogleFilter(valueFilter, event.target.checked);
  };

  return (
    <ListGroupItem className="question-category-filter">
      <div>
        {name}
        <i className="fa fa-angle-left" />
      </div>
      <ListGroup className="question-single-filter">
        {filterList && filterList.map((filter, i) => (
          <ListGroupItem key={i}>
            <Input type="checkbox" value={filter.id} onClick={handleFilter} />
            {filter.name}
          </ListGroupItem>
        ))}
      </ListGroup>
    </ListGroupItem>
  );
};


export default SidebarFilter;
