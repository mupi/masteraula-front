import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { UncontrolledCollapse, Button, Input } from 'reactstrap';


const SidebarFilter = ({name, list, addFilter, removeFilter , listQuestions}) => {

  const handleFilter = (e) => {
    const valueFilter = e.target.value;
    if (e.target.checked) {
      addFilter(valueFilter);
    } else {
      removeFilter(valueFilter);
    }
  };

  return(
  <ListGroupItem className="question-category-filter">
    <a>
      {name}
      <i className="fa fa-angle-left" />
    </a>
    <ListGroup className="question-single-filter">
      {list && list.map((filter, i) => (
        <ListGroupItem key={i}>
          {' '}
          <Input type="checkbox" value={filter.id} onClick={e => handleFilter(e)} />
          {' '}
          {filter.name}
        </ListGroupItem>
      ))}
    </ListGroup>
  </ListGroupItem>
  );
};


export default SidebarFilter;
