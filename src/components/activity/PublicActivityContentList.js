import React from 'react';
import LearningObjectList from 'components/learningObject/LearningObjectList';
import ActivityTasks from 'components/activity/ActivityTasks';

import {
  Row, Col,
} from 'reactstrap';

// Learning object's options available for LearnningObjectContent
const options = {
  showOperations: false,
  showViewButton: false,
  showCreateQuestionButton: false,
  showCreateActivityButton: false,
  removeOption: false,
  showTitle: false,
};

const PublicActivityContentList = ({ activities }) => (
  activities.map((activity, index) => (

    <Row className="justify-content-center" key={activity.id}>
      <Col sm="12" md="12" xs="12">
        <div className="c-public-activity mb-3">
          <h6 className="text-center"><strong>{`Atividade ${index + 1}`}</strong></h6>
          {(activity.learning_objects && activity.learning_objects.length > 0)
            ? (
              <LearningObjectList
                learningObjects={activity.learning_objects}
                options={options}
              />
            ) : ''}
          {activity && (
          <ActivityTasks
            tasks={activity.tasks}
            studentOnly
          />
          )}
        </div>
      </Col>
    </Row>
  ))
);

export default PublicActivityContentList;
