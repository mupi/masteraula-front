import React, { Component } from 'react';
import { Row, Input, Container, Col, Label, Button } from 'reactstrap';
import QuestionContent from "../../components/question/QuestionContent.js";

const DocumentForm =(props) => {

  let question = {"id":"100",
    "question": "Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha:",
    "disciplines": [
      { "name": "Química" },
      { "name": "Física" }
    ],
    "alternatives": [
      {"text": "a) O discurso feminista de Susanita é responsável pelo efeito de humor, já que o tema é tratado de forma irônica, denotando certo machismo por parte do autor da tirinha."},
      {"text": "b) Mafalda opõe-se ao discurso da amiga Susanita e, por meio de suas feições em todos os quadrinhos, percebe-se nitidamente seu descontentamento."},
      {"text": "c) A linguagem verbal não contribui para o melhor entendimento da tirinha, pois todo efeito de humor está contido na linguagem não verbal por meio da expressão exibida por Mafalda no último quadrinho."},
      {"text": "d) Susanita apresenta um discurso de acordo com as teorias feministas que pregam a libertação das práticas tradicionalmente atribuídas à mulher. Contudo, no último quadrinho, a personagem defende o uso de uma tecnologia que apenas reforça os padrões tradicionais."}
    ],
    "answer": "Alternativa “d”. Há uma quebra de expectativa, o que ocasionou o efeito de humor da tirinha. Susanita apresentou, até o terceiro quadrinho, um discurso condizente com as teorias feministas em voga nos anos 70. Todavia, no último quadrinho, ela demonstrou ter um conhecimento limitado sobre o assunto, elogiando o uso de uma tecnologia, a máquina de tricô, que apenas reforça os padrões tradicionais do comportamento feminino.",
    "source": "ENEM",
    "year": "2010",
    "difficulty": "Fácil",
    "author": "Thiago Oliveira dos Santos",
    "teachingLevels": [
      { "name": "Ensino Médio" },
      { "name": "Ensino Superior" }
    ],
    "tags": [
      { "name": "Temperatura" },
      { "name": "Condensação" }
    ],
    "descriptors": [
     {name: "Localizar informações explícitas"  },
     {name: "Inferir o sentido de uma palavra"}
   ],
    "stars":"3",
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
      }

    ]

  }
      return(<Container>
       Nome: <Input /><br/>
       <Container>
         <Row>
         Cabeçalho:
        </Row>
         <Row>
           <Col md="2" xs='12'>
              Logo<br/>
              <img src="http://via.placeholder.com/100x100"/>
              </Col>
              <Col>
                <Input placeholder="Nome da instituição"/>
                <Input placeholder="Curso/Disciplina"/>
                <Input placeholder="Professor(a)"/><br/>
                Mostrar os seguintes campos em branco:<br/>
                <Row>
                  <Col>
                    <Input addon type="checkbox" aria-label="Checkbox for following text input" /> Aluno<br/>
                    <Input addon type="checkbox" aria-label="Checkbox for following text input" /> Turma<br/>
                  </Col>
                  <Col>
                    <Input addon type="checkbox" aria-label="Checkbox for following text input" /> Nota da avaliação<br/>
                    <Input addon type="checkbox" aria-label="Checkbox for following text input" /> Data
                  </Col>
                </Row>
              </Col>
         </Row>
       </Container>

       </Container>
              )}

export default DocumentForm;
