import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, ListGroup, ListGroupItem, Input, InputGroup, InputGroupAddon, Button, Container} from 'reactstrap';
import HomeUserPage from "../HomeUser/HomeUserPage"
import QuestionList from "../../components/question/QuestionList"
import '../../assets/css/QuestionBase.css';

const  results = {
    "rquestions": [
      { "disciplines": [
        { "name": "Química" },
        { "name": "Física" }
      ],
      "source": "ENEM",
      "year": "2010",
      "author": "Thiago Oliveira dos Santos",
      "extract": "Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha: a) O discurso feminista de Susanita é responsável pelo efeito de humor, já que o tema é tratado de forma irônica, denotando certo machismo ...",
      "urlImage": ""
      },
      { "disciplines": [
        { "name": "Matemática" },
        { "name": "Geometria" }
      ],
      "source": "ENEM",
      "year": "2018",
      "author": "Diego Gonçalves Carvalho",
      "extract": "Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha: a) O discurso feminista de Susanita é responsável pelo efeito de humor, já que o tema é tratado de forma irônica, denotando certo machismo ...",
      "urlImage": ""
      },
      { "disciplines": [
        { "name": "Química" },
        { "name": "Física" }
      ],
      "source": "ENEM",
      "year": "2010",
      "author": "Thiago Oliveira dos Santos",
      "extract": "Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha: a) O discurso feminista de Susanita é responsável pelo efeito de humor, já que o tema é tratado de forma irônica, denotando certo machismo ...",
      "urlImage": ""
      },
      { "disciplines": [
        { "name": "Química" },
        { "name": "Física" }
      ],
      "source": "ENEM",
      "year": "2010",
      "author": "Thiago Oliveira dos Santos",
      "extract": "Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha: a) O discurso feminista de Susanita é responsável pelo efeito de humor, já que o tema é tratado de forma irônica, denotando certo machismo ...",
      "urlImage": ""
    },
    { "disciplines": [
      { "name": "Química" },
      { "name": "Física" }
    ],
    "source": "ENEM",
    "year": "2010",
    "author": "Thiago Oliveira dos Santos",
    "extract": "Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha: a) O discurso feminista de Susanita é responsável pelo efeito de humor, já que o tema é tratado de forma irônica, denotando certo machismo ...",
    "urlImage": ""
    },
    { "disciplines": [
      { "name": "Matemática" },
      { "name": "Geometria" }
    ],
    "source": "ENEM",
    "year": "2018",
    "author": "Diego Gonçalves Carvalho",
    "extract": "Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha: a) O discurso feminista de Susanita é responsável pelo efeito de humor, já que o tema é tratado de forma irônica, denotando certo machismo ...",
    "urlImage": ""
    },
    { "disciplines": [
      { "name": "Química" },
      { "name": "Física" }
    ],
    "source": "ENEM",
    "year": "2010",
    "author": "Thiago Oliveira dos Santos",
    "extract": "Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha: a) O discurso feminista de Susanita é responsável pelo efeito de humor, já que o tema é tratado de forma irônica, denotando certo machismo ...",
    "urlImage": ""
    },
    { "disciplines": [
      { "name": "Química" },
      { "name": "Física" }
    ],
    "source": "ENEM",
    "year": "2010",
    "author": "Thiago Oliveira dos Santos",
    "extract": "Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha: a) O discurso feminista de Susanita é responsável pelo efeito de humor, já que o tema é tratado de forma irônica, denotando certo machismo ...",
    "urlImage": ""
    }
    ]

  }



const QuestionBasePage= () =>
            <HomeUserPage>
                  <Row className="text-search-question">Digite o termo e encontre soluções relacionadas
                    <InputGroup>
                      <Input />
                      <InputGroupAddon addonType="prepend"><Button>Pesquisar</Button></InputGroupAddon>
                    </InputGroup>
                  </Row>
                  <Row className="questions-result">
                    <QuestionList questions={results.rquestions} numCols='3'/>
                  </Row>
             </HomeUserPage>

export default QuestionBasePage;
