import React from "react";
import { ListGroup, ListGroupItem, Form } from 'reactstrap';
import {
  Route,
  BrowserRouter,
  Switch,
  Link
} from "react-router-dom";
import { Row, Col, Container } from 'reactstrap';
import { UncontrolledCollapse, Button, Input } from 'reactstrap';

import 'assets/css/Navigation.css';
import 'font-awesome/css/font-awesome.min.css';

const filters= {
  "disciplines": [
    { "name": "Química" },
    { "name": "Física" },
    { "name": "Matemática" },
    { "name": "Português" }
  ],
  "teachingLevels":[
    { "name": "Ensino Fundamental"},
    { "name": "Ensino Médio I"},
    { "name": "Ensino Médio II"},
  ],
  "difficultyLevels":[
    { "name": "Fácil"},
    { "name": "Médio"},
    { "name": "Dificil"}
  ]
}

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
