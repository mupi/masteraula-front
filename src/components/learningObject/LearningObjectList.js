import React from 'react';
import { Row, Col } from 'reactstrap';
import LearningObjectContent from 'components/learningObject/LearningObjectContent';


const LearningObjectList = ({ learningObjects, removeOption, removeSelectedObjectToQuestion }) => {
  /* eslint-disable react/no-danger */
  return (
    <div className="c-question__full-statement">
      {(learningObjects && learningObjects.length > 0)
        ? (
          <Row className="c-question__section-list-learning-objects">
            <Col sm="12" xs="12">
              {learningObjects.map((learningObject, i) => (
                <LearningObjectContent
                  key={learningObject.id}
                  learningObject={learningObject}
                  removeOption={removeOption}
                  removeSelectedObjectToQuestion={removeSelectedObjectToQuestion}
                />
              ))}
            </Col>
          </Row>
        ) : ''}
    </div>
  );
};
export default LearningObjectList;
