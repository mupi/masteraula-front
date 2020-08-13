import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RemoveButton from 'components/buttons/RemoveButton';
import ClassPlanCard from './ClassPlanCard';

/* BUTTON TYPE */
export const BUTTON_TYPE = {
  ACTIVITYCARD_BASE: 1,
  ACTIVITYCARD_MODAL_VIEW: 2,
  ACTIVITYCARD_SELECT: 3,
};

const ClassPlanList = (props) => {
  const {
    classPlans, count, sm, textResult = 'plano de aulas encontrados', showQuantity = true, search,
    addSelectedClassPlan, removeSelectedClassPlan, buttonType,
    selectedClassPlanList,
    showClassPlanModal,
  } = props;

  const isClassPlanAdded = (id) => {
    if (selectedClassPlanList) {
      const classPlanAdded = selectedClassPlanList.filter(item => (item.id === id || item.classPlan_ids === id));
      return (classPlanAdded.length > 0);
    }
    return false;
  };

  const ViewCardModalButton = ({ classPlan }) => (
    <Button className="btn-margin-right menu-top__document-button" onClick={() => showClassPlanModal(classPlan.id)}>
      <FontAwesomeIcon icon="eye" className="btn__icon" />
        Ver plano de aula
    </Button>
  );

  const ViewCardButton = ({ classPlan }) => (
    <Link to={`/view-classPlan/${classPlan.id}`}>
      <Button className="question-card__btn">
        Ver plano de aula
      </Button>
    </Link>
  );


  const CardButton = ({ classPlan }) => (
    !isClassPlanAdded(classPlan.id) ? (
      <Button className="object-card__btn" onClick={() => addSelectedClassPlan(classPlan)}>
        <FontAwesomeIcon icon="plus" className="btn__icon" />
        {' '}
        Adicionar
        {' '}
      </Button>
    ) : (
      <RemoveButton id={classPlan.id} removeSelectedItem={removeSelectedClassPlan} itemName="atividade" />
    )
  );

  function getButton(classPlan) {
    switch (buttonType) {
      case BUTTON_TYPE.ACTIVITYCARD_BASE: return <ViewCardButton classPlan={classPlan} />;
      case BUTTON_TYPE.ACTIVITYCARD_MODAL_VIEW: return <ViewCardModalButton classPlan={classPlan} />;
      case BUTTON_TYPE.ACTIVITYCARD_SELECT: return <CardButton classPlan={classPlan} />;
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

      {classPlans && classPlans.map(classPlan => (
        <Col sm={sm} lg="3" xs="12" key={`A${classPlan.id}`} className="question-card">
          <ClassPlanCard
            classPlan={classPlan}
            button={getButton(classPlan)}
            {...props}
          />
        </Col>
      ))}
    </Row>
  );
};

ClassPlanList.propTypes = {
  classPlans: PropTypes.arrayOf(PropTypes.shape({})),
  count: PropTypes.number,
  sm: PropTypes.string,
};

ClassPlanList.defaultProps = {
  classPlans: [],
  count: 0,
  sm: '4',
};

export default ClassPlanList;
