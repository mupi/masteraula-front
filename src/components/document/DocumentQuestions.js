import React from 'react';
import {
  Row, Container, Col, Label, Button, Modal, ModalBody, ModalFooter, ModalHeader,
} from 'reactstrap';
import QuestionContent from 'components/question/QuestionContent';
import QuestionHeader from 'components/question/QuestionHeader';
import QuestionInfo from 'components/question/QuestionInfo';
import DisciplineList from 'components/disciplines/DisciplineList';
import QuestionSourceYear from 'components/question/QuestionSourceYear';
import GoToQuestionBaseButton from 'components/buttons/GoToQuestionBaseButton';
import RemoveQuestionButton from 'components/buttons/RemoveQuestionButton';


class DocumentPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
    };

    this.toggle = this.toggle.bind(this);
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


  render() {
    const { props } = this;
    const questions = [];
    for (let i = 0; i < props.data.questions.length; i++) {
      const question = props.data.questions[i];
      questions.push(
        <div key={i} className="c-document__question">
          <RemoveQuestionButton />
          <Row>
            <Col sm="12">
              <DisciplineList list={question.disciplines} />
              <QuestionSourceYear  source={question.source} year={question.year} />
            </Col>
          </Row>
          <Row>
            <div className="c-document__question-content">
              <QuestionContent statement={question.question} />
            </div>
          </Row>
          <Row>
            <div className="c-document__question-view-more col-md-3 offset-md-9">
              <Button onClick={() => this.toggle(question)}>
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

    return (
      <Container>
        <div>
          <div className="l-button-add-question">
            <GoToQuestionBaseButton customClass="o-button-add-question-doc o-button-add-question-doc--xl" />
          </div>

          {questions}
          {this.state.question
            ? (
              <Modal className="c-document__question-modal" isOpen={this.state.question} toggle={() => this.toggle()} size="lg">
                <ModalHeader toggle={() => this.toggle()} />
                <ModalBody>
                  <QuestionHeader disciplines={this.state.question.disciplines} source={this.state.question.source} year={this.state.question.year} />
                  <QuestionContent alternatives={this.state.question.alternatives} question={this.state.question.question} answer={this.state.question.answer} />
                  <QuestionInfo
                    disciplines={this.state.question.disciplines}
                    teachingLevels={this.state.question.teachingLevels}
                    descriptors={this.state.question.descriptors}
                    tags={this.state.question.tags}
                    difficulty={this.state.question.difficulty}
                    author={this.state.question.author}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={() => this.toggle()}>
Fechar
                  </Button>
                  {' '}
                  <Button color="danger" onClick={() => this.toggle()}>
remover
                  </Button>
                </ModalFooter>
              </Modal>
            )
            : ''}
        </div>

      </Container>);
  }
}

export default DocumentPreview;
