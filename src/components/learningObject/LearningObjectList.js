import React from 'react';
import { Row, Col } from 'reactstrap';
import LearningObjectContentContainer from 'containers/LearningObjectContentContainer';

/*
Options available for LearningObjectContent
const options = {
  showOperations,
  showViewButton,
  showCreateQuestionButton,
  removeOption,
  showTitle,
};
*/


/* eslint-disable react/no-danger */
const LearningObjectList = ({
  learningObjects, removeSelectedObjectToQuestion, options,
}) => (
  <div>
    {(learningObjects && learningObjects.length > 0)
      ? (
        <Row className="c-question__section-list-learning-objects">
          <Col sm="12" xs="12">
            {learningObjects.map(learningObject => (
              <LearningObjectContentContainer
                key={learningObject.id}
                learningObject={learningObject}
                removeSelectedObjectToQuestion={removeSelectedObjectToQuestion}
                options={options}
              />
            ))}
          </Col>
        </Row>
      ) : ''}
  </div>
);
export default LearningObjectList;
