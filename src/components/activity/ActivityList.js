import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import ActivityCard from './ActivityCard';

const ActivityList = (props) => {
  const {
    activities, count, sm, textResult = 'atividades encontradas', showQuantity = true, showLink = true, search,
  } = props;
  return (
    <Row>

      { showQuantity ? (
        <Col sm="12" className="c-question-base__total-results">
          {`${count} ${textResult} `}
          <span className="c-question-base__search-term">{search}</span>
          {' '}
          {showLink ? (
            <a
              className="c-question-base__link-askquestion"
              target="_blank"
              rel="noopener noreferrer"
              href="https://forms.gle/A1T4TPAMbrRA33hJA"
            >
          (Não encontrou o que queria? Clique aqui)
            </a>
          ) : ''}
        </Col>
      ) : ''
      }

      {activities.map(activity => (
        <Col sm={sm} lg="3" xs="12" key={`A${activity.id}`} className="question-card">
          <ActivityCard activity={activity} {...props} />
        </Col>
      ))}
    </Row>
  );
};

ActivityList.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({})),
  count: PropTypes.number,
  sm: PropTypes.string,
};

ActivityList.defaultProps = {
  activities: [],
  count: 0,
  sm: '4',
};

export default ActivityList;
