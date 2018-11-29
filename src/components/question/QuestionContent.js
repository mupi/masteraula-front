import React from 'react';
import { Row, Col } from 'reactstrap';
import AlternativeList from 'components/alternatives/AlternativeList';
import Alternative from 'components/alternatives/Alternative';
import { getCleanCompleteStatement, getCleanAlternativeText } from 'helpers/question';


const QuestionContent = (question) => {
  /* eslint-disable react/no-danger */
  const {
    statement, alternatives, resolution, learningObjects,
  } = question;

  return (
    <div className="c-question__full-statement">
      {(learningObjects && learningObjects.length > 0)
        ? (
          <Row className="c-question--section-border">
            <Col sm="12" xs="12">
              {learningObjects.map((learningObject, i) => (
                <div key={learningObject.id} className="c-question__learning-object">
                  { (learningObject.image) ? (
                    <div>
                      <img
                        alt="objeto-aprendizagem"
                        src={`http://localhost:8000${learningObject.image}`}
                      />
                    </div>
                  ) : ''}

                  { (learningObject.text) ? (
                    <div className="c-question__learning-object--text">
                      <div dangerouslySetInnerHTML={{ __html: getCleanCompleteStatement(learningObject.text) }} />
                    </div>
                  ) : ''}
                  <p><small>Fonte: <i>{learningObject.source}</i></small></p>
                </div>
              ))}
            </Col>
          </Row>
        ) : ''}

      <Row className="c-question--section-border">
        <Col sm="12" xs="12">
          <div className="">
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
      {(resolution && alternatives.length === 0)
        ? (
          <Row className="c-question--section-border">
            <Col sm="12" xs="12">
              <div className="c-question__answer">
                <p className="c-question__answer-title">
                  Resposta:
                </p>
                <div dangerouslySetInnerHTML={{ __html: getCleanAlternativeText(resolution) }} />
              </div>
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
                {resolution
                  ? (<div className="c-question__resolution-text" dangerouslySetInnerHTML={{ __html: getCleanAlternativeText(resolution) }} />) : ''
                }
              </div>
            </Col>
          </Row>
        ) : ''}
    </div>
  );
};
export default QuestionContent;
