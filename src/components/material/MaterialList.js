import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import QuestionCard from '../question/QuestionCard';
import ActivityCard from '../activity/ActivityCard';

export const BUTTON_TYPE = {
  ACTIVITYCARD_BASE: 1,
  ACTIVITYCARD_MODAL_VIEW: 2,
  ACTIVITYCARD_SELECT: 3,
};

const ViewCardButton = ({ activity }) => (
  <Link to={`/view-activity/${activity.id}`}>
    <Button className="question-card__btn">
      Ver atividade
    </Button>
  </Link>
);

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
          <ActivityCard activity={activity} button={<ViewCardButton activity={activity} />} {...props} />
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
