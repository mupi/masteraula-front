import React from "react";
import { ListGroup, ListGroupItem } from 'reactstrap';
import {
  Route,
  BrowserRouter,
  Switch,
  Link
} from "react-router-dom";
import QuestionBasePage from "pages/QuestionBase/QuestionBasePage";
import UserProfilePage from "pages/UserProfile/UserProfilePage";
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

const SidebarFilters = ()=> {
    return (
          <ListGroup className="question-all-filters">
                <h6><i className="fa fa-filter"></i> Filtros</h6>
                <ListGroupItem className="question-category-filter"><a>Disciplinas <i class="fa fa-angle-left"></i></a>
                      <ListGroup className="question-single-filter">
                        {filters.disciplines.map((discipline, i) =>
                            <ListGroupItem key={i}>  <Input type="checkbox" /> {discipline.name}</ListGroupItem>
                        )}
                      </ListGroup>
                </ListGroupItem>

                <ListGroupItem className="question-category-filter"><a>Grau de dificuldade  <i class="fa fa-angle-left"></i></a>
                      <ListGroup className="question-single-filter">
                        {filters.difficultyLevels.map((difficulty, i) =>
                            <ListGroupItem key={i}>  <Input type="checkbox" /> {difficulty.name}</ListGroupItem>
                        )}
                      </ListGroup>
                </ListGroupItem>

                <ListGroupItem className="question-category-filter"><a>Nível de ensino  <i class="fa fa-angle-left"></i></a>
                      <ListGroup className="question-single-filter">
                        {filters.teachingLevels.map((level, i) =>
                            <ListGroupItem key={i}>  <Input type="checkbox" /> {level.name}</ListGroupItem>
                        )}
                      </ListGroup>
                </ListGroupItem>
          </ListGroup>


      )
}

export default SidebarFilters;
