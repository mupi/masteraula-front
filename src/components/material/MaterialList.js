import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import QuestionCard from '../question/QuestionCard';
import ActivityCard from '../activity/ActivityCard';


const MaterialList = (props) => {
  const {
    sm, questions, activities, count, textResult, showQuantity,
  } = props;

  return (
    <Row>

      { showQuantity ? (
        <Col sm="12" className="c-question-base__total-results">
          {`${count} ${textResult} `}
          {' '}
        </Col>
      ) : ''
      }

      {questions.map(question => (
        <Col sm={sm} lg="3" xs="12" key={`Q${question.id}`} className="question-card">
          <QuestionCard question={question} {...props} />
        </Col>
      ))}
      {activities.map(activity => (
        <Col sm={sm} lg="3" xs="12" key={`A${activity.id}`} className="question-card">
          <ActivityCard activity={activity} {...props} />
        </Col>
      ))}
    </Row>
  );
};

MaterialList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({})),
  activities: PropTypes.arrayOf(PropTypes.shape({})),
  count: PropTypes.number,
  sm: PropTypes.string,
};

MaterialList.defaultProps = {
  questions: [],
  activities: [],
  count: 0,
  sm: '4',
};

export default MaterialList;
