import React from 'react';
import { Row, Col } from 'reactstrap';
import AlternativeList from 'components/alternatives/AlternativeList';
import Alternative from 'components/alternatives/Alternative';
import { getCleanCompleteStatement, getCleanAlternativeText } from 'helpers/question';
import LearningObjectList from 'components/learningObject/LearningObjectList';


const QuestionContent = (question) => {
  /* eslint-disable react/no-danger */
  const {
    statement, alternatives, resolution, learningObjects, options,
  } = question;

  return (
    <div className="c-question__full-statement">
      {(learningObjects && learningObjects.length > 0)
        ? (
          <LearningObjectList
            learningObjects={learningObjects}
            options={options}
          />
        ) : ''}

      <Row className="c-question--section-border">
        <Col sm="12" xs="12">
          <div className="c-question__single-statement">
            <div dangerouslySetInnerHTML={{ __html: getCleanCompleteStatement(statement) }} />
          </div>
        </Col>
      </Row>

      {(alternatives && alternatives.length > 0)
        ? (
          <Row className="c-question--section-border">
            <Col sm="12" xs="12" className="c-question__alternatives">
              <AlternativeList list={alternatives} />
            </Col>
          </Row>
        ) : ''}

      {(alternatives && alternatives.length > 0)
        ? (
          <Row className="c-question--section-border">
            <Col sm="12" xs="12" className="c-question__alternatives">
              <p className="c-question__answer-title">
                Resposta:
              </p>
              <div>
                {alternatives.map((alternative, i) => (
                  alternative.is_correct ? (
                    <Alternative
                      key={alternative.id}
                      option={i}
                      text={alternative.text}
                    />
                  ) : ''
                ))}
              </div>
            </Col>
          </Row>
        ) : ''}

      {(resolution)
        ? (
          <Row className="c-question--section-border">
            <Col sm="12" xs="12">
              <div className="c-question__answer">
                <p className="c-question__answer-title">
                  Resolução:
                </p>
                <div dangerouslySetInnerHTML={{ __html: getCleanAlternativeText(resolution) }} />
              </div>
            </Col>
          </Row>
        ) : ''}
    </div>
  );
};
export default QuestionContent;
