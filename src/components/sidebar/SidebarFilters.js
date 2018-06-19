import React from "react";
import { ListGroup, ListGroupItem } from 'reactstrap';
import {
  Route,
  BrowserRouter,
  Switch,
  Link
} from "react-router-dom";
import { Row, Col, Container } from 'reactstrap';
import { UncontrolledCollapse, Button, Input } from 'reactstrap';
import SidebarFilter from "components/sidebarfilter/SidebarFilter";

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

const SidebarFilters = ()=> {
    return (
          <ListGroup className="question-all-filters">
                <h6><i className="fa fa-filter"></i> Filtros</h6>
                <SidebarFilter name="Disciplinas" list={filters.disciplines}/>
                <SidebarFilter name="Nível de Ensino" list={filters.teachingLevels}/>
                <SidebarFilter name="Dificuldade" list={filters.difficultyLevels}/>
          </ListGroup>


      )
}

export default SidebarFilters;
