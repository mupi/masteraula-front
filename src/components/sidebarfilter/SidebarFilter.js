import React from "react";
import { ListGroup, ListGroupItem } from 'reactstrap';
import { UncontrolledCollapse, Button, Input } from 'reactstrap';

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
