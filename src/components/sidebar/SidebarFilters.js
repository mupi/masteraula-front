import React from "react";
import { ListGroup } from 'reactstrap';
import SidebarFilter from "components/sidebarfilter/SidebarFilter";

import 'assets/css/Navigation.css';
import 'font-awesome/css/font-awesome.min.css';

const filters= {
  "disciplines": [
    { "name": "Artes" },
    { "name": "Biologia" },
    { "name": "Ciências" },
    { "name": "Educação Física" },
    { "name": "Ensino Religioso" },
    { "name": "Estudos Sociais" },
    { "name": "Filosofia" },
    { "name": "Física" },
    { "name": "Geografia" },
    { "name": "História" },
    { "name": "Informática" },
    { "name": "Língua Estrangeira - Inglês" },
    { "name": "Língua Estrangeira - Espanhol" },
    { "name": "Língua Estrangeira - Outras" },
    { "name": "Matemática" },
    { "name": "Polivalente" },
    { "name": "Português / Língua Portuguesa" },
    { "name": "Química" },
    { "name": "Redação e Literatura" },
    { "name": "Sociologia" },
    { "name": "Outros" }
  ],
  "teachingLevels":[
    { "name": "Ensino Infantil"},
    { "name": "Ensino Fundamental I"},
    { "name": "Ensino Fundamental II"},
    { "name": "Ensino Médio"},
    { "name": "Ensino Superior"},
    { "name": "Ensino para Jovens e Adultos (EJA)"}
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
