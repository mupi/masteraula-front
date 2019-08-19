import React from 'react';
import { Row, Col } from 'reactstrap';
import LearningObjectContent from 'components/learningObject/LearningObjectContent';


/* eslint-disable react/no-danger */
const LearningObjectList = ({
  learningObjects, removeOption, showTitle, removeSelectedObjectToQuestion, showOperations,
}) => (
  <div>
    {(learningObjects && learningObjects.length > 0)
      ? (
        <Row className="c-question__section-list-learning-objects">
          <Col sm="12" xs="12">
            {learningObjects.map(learningObject => (
              <LearningObjectContent
                key={learningObject.id}
                learningObject={learningObject}
                removeOption={removeOption}
                showTitle={showTitle}
                showOperations={showOperations}
                removeSelectedObjectToQuestion={removeSelectedObjectToQuestion}
              />
            ))}
          </Col>
        </Row>
      ) : ''}
  </div>
);
export default LearningObjectList;
