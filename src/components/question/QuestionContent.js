import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import learningObject from "../../img/home/question-objeto-aprendizagem.jpg";
import learningObject2 from "../../img/home/question-objeto-aprendizagem2.jpg";


class QuestionContent  extends Component {


    constructor(props) {
      super(props);
      this.state = {
              alternatives: [
                {
                alternative_text: "a) O discurso feminista de Susanita é responsável pelo efeito de humor, já que o tema é tratado de forma irônica, denotando certo machismo por parte do autor da tirinha."
                },
                {
                alternative_text: "b) Mafalda opõe-se ao discurso da amiga Susanita e, por meio de suas feições em todos os quadrinhos, percebe-se nitidamente seu descontentamento."
                },
                {
                alternative_text: "c) A linguagem verbal não contribui para o melhor entendimento da tirinha, pois todo efeito de humor está contido na linguagem não verbal por meio da expressão exibida por Mafalda no último quadrinho."
                },
                {
                alternative_text: "d) Susanita apresenta um discurso de acordo com as teorias feministas que pregam a libertação das práticas tradicionalmente atribuídas à mulher. Contudo, no último quadrinho, a personagem defende o uso de uma tecnologia que apenas reforça os padrões tradicionais."
                }
              ]
          }
    }
  render() {
    const { alternatives } = this.state

    return (

            <Container className="question-content">
              <Row className="text-center">
                  <Col sm="12" xs="12">
                    <div className="img-learning-object">
                      <img src={learningObject2}/>
                    </div>
                  </Col>
              </Row>
              <Row className="question-section-border section-text-question">
                <Col sm="12" xs="12">
                  <p className="text-question">Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha:</p>
                </Col>
              </Row>
              <Row className="question-section-border">
                <Col sm="12" xs="12">
                  {  alternatives.map((alternative, i) =>
                          <p key= {i} className="text-alternative">{alternative.alternative_text}</p>
                     )
                   }
                </Col>
              </Row>
              <Row className="question-section-border">
                <Col sm="12" xs="12">
                  <p className="text-answer">
                    Alternativa “d”. Há uma quebra de expectativa, o que ocasionou o efeito de humor da tirinha. Susanita apresentou, até o terceiro quadrinho, um discurso condizente com as teorias feministas em voga nos anos 70. Todavia, no último quadrinho, ela demonstrou ter um conhecimento limitado sobre o assunto, elogiando o uso de uma tecnologia, a máquina de tricô, que apenas reforça os padrões tradicionais do comportamento feminino.
                  </p>
                </Col>
              </Row>
            </Container>
    );
  }
}

export default QuestionContent;
