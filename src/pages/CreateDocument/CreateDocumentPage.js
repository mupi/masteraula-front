import React, { Component } from 'react';
import {  Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import DocumentForm from '../../components/document/DocumentForm.js';
import DocumentPreview from '../../components/document/DocumentPreview.js';
import HomeUserPage from "../HomeUser/HomeUserPage"
import 'assets/css/Document.css';

import classnames from 'classnames';


class CreateDocumentPage extends Component{
   constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.setFields = this.setFields.bind(this);
    this.state = {
      activeTab: '1',
      name:'',
      schoolName:'',
      course:'',
      teacherName:'',
      studentName:'',
      class:'',
      grade:'',
      date:'',
      questions: [{
    "id":"100",
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
     "Temperatura" ,
      "Condensação"
    ],
    "descriptors": [
     {name: "D1 - Localizar informações explícitas"  },
     {name: "D2 - Inferir o sentido de uma palavra"}
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
      "teachingLevels": [
        { "name": "Ensino Médio" },
        { "name": "Ensino Superior" }
      ],
      "extract": "Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha: a) O discurso feminista de Susanita é responsável pelo efeito de humor, já que o tema é tratado de forma irônica, denotando certo machismo ...",
      "urlImage": "-"
      },
      { "disciplines": [
        { "name": "Matemática" },
        { "name": "Geometria" }
      ],
      "descriptors": [
       {name: "D1"  },
       {name: "D2"}
     ],
      "source": "ENEM",
      "year": "2018",
      "author": "Diego Gonçalves Carvalho",
      "teachingLevels": [
        { "name": "Ensino Médio" },
        { "name": "Ensino Superior" }
      ],
      "extract": "Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha: a) O discurso feminista de Susanita é responsável pelo efeito de humor, já que o tema é tratado de forma irônica, denotando certo machismo ...",
      "urlImage": ""
      },
      { "disciplines": [
        { "name": "Química" },
        { "name": "Física" }
      ],
      "descriptors": [
       {name: "D1"  },
       {name: "D2"}
     ],
      "source": "ENEM",
      "year": "2010",
      "author": "Thiago Oliveira dos Santos",
      "teachingLevels": [
        { "name": "Ensino Médio" },
        { "name": "Ensino Superior" }
      ],
      "extract": "Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha: a) O discurso feminista de Susanita é responsável pelo efeito de humor, já que o tema é tratado de forma irônica, denotando certo machismo ...",
      "urlImage": ""
      }

    ]

  },{
    "id":"100",
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
     "Temperatura" ,
      "Condensação"
    ],
    "descriptors": [
     {name: "D1 - Localizar informações explícitas"  },
     {name: "D2 - Inferir o sentido de uma palavra"}
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
      "teachingLevels": [
        { "name": "Ensino Médio" },
        { "name": "Ensino Superior" }
      ],
      "extract": "Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha: a) O discurso feminista de Susanita é responsável pelo efeito de humor, já que o tema é tratado de forma irônica, denotando certo machismo ...",
      "urlImage": "-"
      },
      { "disciplines": [
        { "name": "Matemática" },
        { "name": "Geometria" }
      ],
      "descriptors": [
       {name: "D1"  },
       {name: "D2"}
     ],
      "source": "ENEM",
      "year": "2018",
      "author": "Diego Gonçalves Carvalho",
      "teachingLevels": [
        { "name": "Ensino Médio" },
        { "name": "Ensino Superior" }
      ],
      "extract": "Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha: a) O discurso feminista de Susanita é responsável pelo efeito de humor, já que o tema é tratado de forma irônica, denotando certo machismo ...",
      "urlImage": ""
      },
      { "disciplines": [
        { "name": "Química" },
        { "name": "Física" }
      ],
      "descriptors": [
       {name: "D1"  },
       {name: "D2"}
     ],
      "source": "ENEM",
      "year": "2010",
      "author": "Thiago Oliveira dos Santos",
      "teachingLevels": [
        { "name": "Ensino Médio" },
        { "name": "Ensino Superior" }
      ],
      "extract": "Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha: a) O discurso feminista de Susanita é responsável pelo efeito de humor, já que o tema é tratado de forma irônica, denotando certo machismo ...",
      "urlImage": ""
      }

    ]

  }]
    }
 }

  setFields(field, event){
    console.log(event.target.value)
    console.log(this.state)
    let prevState = this.state;
    if(prevState[field]==='on'){
      prevState[field] = '';
    } else {
      prevState[field] = event.target.value;
    }
    this.setState(prevState);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      let prevState = this.state;
      prevState['activeTab'] = tab;
      this.setState({
        prevState
      });
    }
  }

  render(){
     return(
          <HomeUserPage>
            <div>
                <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                  >
                    Monte seu documento
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}
                   >
                    Escolha as questões
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab} style={{'display':'block'}}>
                <TabPane tabId="1">
                      <DocumentForm setFields={this.setFields}/>
                </TabPane>
                <TabPane tabId="2">
                      <DocumentPreview data={this.state}/>
                </TabPane>
                </TabContent>
            </div>
          </HomeUserPage>);
    }
}

export default CreateDocumentPage
