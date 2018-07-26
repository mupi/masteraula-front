import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { UncontrolledCollapse, Button, Input } from 'reactstrap';

const SidebarFilter = ({ name, list }) => (

  <ListGroupItem className="question-category-filter">
    <a>
      {name}
      <i className="fa fa-angle-left" />
    </a>
    <ListGroup className="question-single-filter">
      {list && list.map((filter, i) => (
        <ListGroupItem key={i}>
          {' '}
          <Input type="checkbox" />
          {' '}
          {filter.name}
        </ListGroupItem>
      ))}
    </ListGroup>
  </ListGroupItem>
);


export default SidebarFilter;
