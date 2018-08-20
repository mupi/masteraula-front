import React from 'react';
import PropTypes from 'prop-types';

import {
  Row, Container, Col, Label, Button, Modal, ModalBody, ModalFooter, ModalHeader,
} from 'reactstrap';
import QuestionContent from 'components/question/QuestionContent';
import DisciplineList from 'components/disciplines/DisciplineList';
import QuestionSourceYear from 'components/question/QuestionSourceYear';
import GoToQuestionBaseButton from 'components/buttons/GoToQuestionBaseButton';
import RemoveQuestionButton from 'components/buttons/RemoveQuestionButton';
import { getTeachingLevel } from 'helpers/question';
import  DocumentQuestionItem  from './DocumentQuestionItem';

class DocumentQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
    };
  }

  toggle(question) {
    if (question) {
      this.setState({
        question,
      });
    } else {
      this.setState({
        question: '',
      });
    }
  }

  getListQuestions(activeDocument, removeSelectedQuestion) {
    const questions = [];
    const disciplines = [
      { name: 'Química' },
      { name: 'Física' },
    ];
    const statement="Evitar o desperdício de água e energia é essencial para garantir a sustentabilidade do planeta Terra. Educar a criança para que evite o desperdício dentro da sua própria casa é tarefa dos pais. Apagar as luzes ao sair do quarto ou banheiro, desligar a TV quando não há ninguém assistindo, manter a porta da geladeira fechada ou tirar da tomada os aparelhos que não estão em uso, são hábitos simples que representam grande economia e que as crianças devem aprender. Fechar as torneiras para escovar os dentes ou ensaboar a louça, não brincar no chuveiro e não lavar o chão ou o carro com mangueiras também são ações que fazem diferença no consumo da água e estão ao alcance de todas as crianças. Poupar e usar, de forma consciente, é educação ambiental."
 

    if (activeDocument) {
      for (let i = 0; i < activeDocument.questions.length; i += 1) {
        const question = activeDocument.questions[i];
        questions.push(
          <div key={i} className="c-document__question">
            <RemoveQuestionButton
              questionId={question.question}
              activeDocumentId={activeDocument.id}
              removeSelectedQuestion={removeSelectedQuestion}
            />
            <Row className="c-document__question-header">
              <Col sm="8" xs="8" className="c-document__question-info-header"> 
                <span className="question-info  difficulty-level">
                  {getTeachingLevel('E')}
                </span>
              </Col>
              <Col sm="12">
                <DisciplineList list={disciplines} />
                <QuestionSourceYear source="ENEM" year="2018" />
              </Col>
            </Row>
            <Row>
              <div className="c-document__question-content">
              {` ${statement.substring(0, 150)}${statement.length >= 150 && ' ...'}`}
              </div>
            </Row>
            <Row>
              <div className="c-document__question-view-more col-md-3 offset-md-9">
                <Button onClick={() => this.toggle(question.question)}>
                  <i className="fa fa-search" />
                  {' '}
                  <span className="button-text">
                    Ver mais
                  </span>
                </Button>
              </div>
            </Row>
          </div>,
        );
      }
    }
    return questions;
  }

  clickRemove(removeFunction, documentId, questionIdToRemove) {
    removeFunction(documentId, questionIdToRemove);
    this.toggle();
  }

  render() {
    const { activeDocument, removeSelectedQuestion } = this.props;
    const questions = this.getListQuestions(activeDocument, removeSelectedQuestion);

    return (
      <Container>
        <div>
          <div className="l-button-add-question">
            <GoToQuestionBaseButton customClass="o-button-add-question-doc o-button-add-question-doc--xl" />
          </div>
          <DocumentQuestionItem activeDocument={activeDocument} removeSelectedQuestion={removeSelectedQuestion}/>
          {questions}
        </div>

      </Container>);
  }
}

DocumentQuestions.propTypes = {
  removeSelectedQuestion: PropTypes.func,
};

DocumentQuestions.defaultProps = {
  removeSelectedQuestion: f => f,
};

export default DocumentQuestions;
