import React, { Component } from 'react';
import { Row, Input, Container, Col, Label, Button } from 'reactstrap';
import QuestionHeader from "../../components/question/QuestionHeader.js";
import QuestionContent from "../../components/question/QuestionContent.js";
import QuestionInfo from "../../components/question/QuestionInfo.js";
import RelatedQuestions from "../../components/question/RelatedQuestions";
import QuestionComments from "../../components/question/QuestionComments.js";

const DocumentPreview = (props) => {
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

  return(
             <Container> 
              Nome: <Input /><br/>
              <Container>
                Cabeçalho:<p/>
                <Row>
                  <Col xs='2'>
                  <img src={props.data.logo? props.data.logo : "http://via.placeholder.com/100x100"}/>
                  </Col>
                  <Col>
                    <Label>{props.data.schoolName ? props.data.schoolName: 'Nome da instituição'}</Label><br/>
                    <Label>{props.data.course ? props.data.course : "Curso/Disciplina"}</Label>{' | '}
                    <Label>{props.data.teacherName ? props.data.teacherName : "Professor(a)"}</Label>
                   {props.data.studentName? <p>Nome: ________________________________________________________</p>:''}
                   {props.data.class? 'Turma: _________  ':''}
                   {props.data.date? 'Data: ___/___/___  ':''}
                   {props.data.grade? 'Nota: _______  ':''}
                  </Col>
                </Row>
              </Container><p/>
                      <QuestionContent alternatives={question.alternatives} question={question.question} />
              <Row>
                <Col sm={{ size: 'auto', offset: 1 }}>
                  <Button color='danger'> Editar</Button><Button> Confirmar</Button>
                </Col>
              </Row>
              </Container>);
            }

export default DocumentPreview;         