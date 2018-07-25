import React from 'react';
import { ListGroup } from 'reactstrap';
import SidebarFilter from "components/sidebarfilter/SidebarFilter";

const filters= {
  "disciplines": [
    { "name": "Lista Disciplinas" }
  ],
  "teachingLevels":[
    { "name": "Lista de Níveis de Ensino"}
  ],
  "difficultyLevels":[
    { "name": "Fácil"},
    { "name": "Médio"},
    { "name": "Difícil"}
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
