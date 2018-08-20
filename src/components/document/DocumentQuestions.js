import React from 'react';
import PropTypes from 'prop-types';

import {
  Row, Container, Col, Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import QuestionContent from 'components/question/QuestionContent';
import ViewQuestionModal from 'components/question/ViewQuestionModal';
import DisciplineList from 'components/disciplines/DisciplineList';
import QuestionSourceYear from 'components/question/QuestionSourceYear';
import GoToQuestionBaseButton from 'components/buttons/GoToQuestionBaseButton';
import RemoveQuestionButton from 'components/buttons/RemoveQuestionButton';

const DocumentQuestions = (props) => {
  const { activeDocument, removeSelectedQuestion } = props;

  return (
    <Container>
      <div>
        <div className="l-button-add-question">
          <GoToQuestionBaseButton customClass="o-button-add-question-doc o-button-add-question-doc--xl" />
        </div>
        {activeDocument && activeDocument.questions.map(question => (
          <div className="c-document__question">
            <RemoveQuestionButton
              questionId={question.question}
              activeDocumentId={activeDocument.id}
              removeSelectedQuestion={removeSelectedQuestion}
            />
            <Row>
              <Col sm="12">
                <DisciplineList list={question.disciplines} />
                <QuestionSourceYear source={question.source} year={question.year} />
              </Col>
            </Row>
            <Row>
              <div className="c-document__question-content">
                <QuestionContent statement={question.question} />
              </div>
            </Row>
            <Row>
              <div className="c-document__question-view-more col-md-3 offset-md-9">
                <Link to={`/view-question/${question.id}`}>
                  <Button className="question-card__btn">
                    Ver mais
                  </Button>
                </Link>
              </div>
            </Row>
          </div>
        ))}
        <ViewQuestionModal />
      </div>

    </Container>);
};

DocumentQuestions.propTypes = {
  activeDocument: PropTypes.shape(),
  removeSelectedQuestion: PropTypes.func,
};

DocumentQuestions.defaultProps = {
  activeDocument: null,
  removeSelectedQuestion: f => f,
};

export default DocumentQuestions;
