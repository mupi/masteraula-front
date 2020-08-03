import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RemoveButton from 'components/buttons/RemoveButton';
import ActivityCard from './ActivityCard';

/* BUTTON TYPE */
export const BUTTON_TYPE = {
  ACTIVITYCARD_BASE: 1,
  ACTIVITYCARD_MODAL_VIEW: 2,
  ACTIVITYCARD_MODAL_SELECT: 3,
};

const ActivityList = (props) => {
  const {
    activities, count, sm, textResult = 'atividades encontradas', showQuantity = true, search,
    addSelectedActivity, removeSelectedActivity, buttonType,
    selectedActivityList,
    showActivityModal,
  } = props;

  const isActivityAdded = (id) => {
    if (selectedActivityList) {
      const activityAdded = selectedActivityList.filter(item => (item.id === id || item.activity_ids === id));
      return (activityAdded.length > 0);
    }
    return false;
  };

  const ViewCardModalButton = ({ activity }) => (
    <Button className="btn-margin-right menu-top__document-button" onClick={() => showActivityModal(activity.id)}>
      <FontAwesomeIcon icon="eye" className="btn__icon" />
        Ver atividade
    </Button>
  );

  const ViewCardButton = ({ activity }) => (
    <Link to={`/view-activity/${activity.id}`}>
      <Button className="question-card__btn">
        Ver atividade
      </Button>
    </Link>
  );


  const CardButton = ({ activity }) => (
    !isActivityAdded(activity.id) ? (
      <Button className="object-card__btn" onClick={() => addSelectedActivity(activity)}>
        <FontAwesomeIcon icon="plus" className="btn__icon" />
        {' '}
        Adicionar
        {' '}
      </Button>
    ) : (
      <RemoveButton id={activity.id} removeSelectedItem={removeSelectedActivity} itemName="atividade" />
    )
  );

  function getButton(activity) {
    switch (buttonType) {
      case BUTTON_TYPE.ACTIVITYCARD_BASE: return <ViewCardButton activity={activity} />;
      case BUTTON_TYPE.ACTIVITYCARD_MODAL_VIEW: return <ViewCardModalButton activity={activity} />;
      case BUTTON_TYPE.ACTIVITYCARD_MODAL_SELECT: return <CardButton activity={activity} />;
      default: return null;
    }
  }

  return (
    <Row>

      { showQuantity ? (
        <Col sm="12" className="c-question-base__total-results">
          {`${count} ${textResult} `}
          {(search && search !== undefined && search.length > 0) ? (
            <>
              {' para '}
              <span className="c-question-base__search-term">
                {search}
              </span>
            </>
          ) : ''
                }
        </Col>
      ) : ''
      }

      {activities && activities.map(activity => (
        <Col sm={sm} lg="3" xs="12" key={`A${activity.id}`} className="question-card">
          <ActivityCard
            activity={activity}
            button={getButton(activity)}
            {...props}
          />
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
