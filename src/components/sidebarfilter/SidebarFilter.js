import React from "react";
import { ListGroup, ListGroupItem, Form } from 'reactstrap';
import {  Input } from 'reactstrap';

import 'assets/css/Navigation.css';
import 'font-awesome/css/font-awesome.min.css';

const SidebarFilter = ({name, list})=> {
    return (
                <ListGroupItem className="question-category-filter"><a>{name}<i className="fa fa-angle-left"></i></a>
                      <ListGroup className="question-single-filter">
                        {list.map((filter, i) =>
                            <ListGroupItem key={i}>  <Input type="checkbox" /> {filter.name}</ListGroupItem>
                        )}
                      </ListGroup>
                </ListGroupItem>
      )
}

export default SidebarFilter;
