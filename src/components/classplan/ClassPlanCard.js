import React from 'react';
import {
  Button, Card, CardFooter, CardBody, CardHeader, Badge,
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HeaderWithFilters = (props) => {
  const {
    classPlan,
    addSelectedDisciplineFilter,
    addSelectedTeachingLevelFilter,
  } = props;

  return (
    <CardHeader className="question-card__header">
      <div className="d-flex question-card__id align-items-center">
        <div>
          { `Plano de aula N° ${classPlan.id}`}
        </div>
      </div>
      <div className="question-card__info-section">
        {classPlan.disciplines && classPlan.disciplines.map(discipline => (
          <Button
            key={discipline.id}
            className="question-card__info-section-item question-card__info-section-item--pink"
            onClick={() => addSelectedDisciplineFilter(discipline.id.toString())}
          >
            <span className="question-card__info-section--complete">{discipline.name}</span>
            <span className="question-card__info-section--substring">{discipline.slug.toUpperCase()}</span>
          </Button>
        ))}
        {classPlan.teaching_levels && classPlan.teaching_levels.map(teachingLevel => (
          <Button
            key={teachingLevel.id}
            className="question-card__info-section-item question-card__info-section-item--green"
            onClick={() => addSelectedTeachingLevelFilter(teachingLevel.id.toString())}
          >
            <span className="question-card__info-section--complete">{teachingLevel.name}</span>
            <span className="question-card__info-section--substring">{teachingLevel.slug.toUpperCase()}</span>
          </Button>
        ))}
      </div>
      <p className="question-card__more-info">
        {classPlan.learning_objects && classPlan.learning_objects.length > 0 ? (
          <span className="question-card__number-learning-obj">
            <FontAwesomeIcon icon="image" />
            {' '}
            {classPlan.learning_objects.length}
            {' | '}
          </span>
        ) : ''}
        <span className="question-card__more-info--lightgray">
          {`Tipo: Estação`}
          {' '}
        </span>
      </p>
    </CardHeader>
  );
};

const HeaderWithoutFilters = (props) => {
  const { classPlan } = props;
  return (
    <CardHeader className="question-card__header text-left">
      <div className="d-flex question-card__id align-items-center">
        <div>
          { `Plano de aula N° ${classPlan.id}`}
        </div>
      </div>
      <div className="question-card__info-section">
        {classPlan.disciplines && classPlan.disciplines.map(discipline => <Badge className="question-card__info-section-item--pink" key={`${discipline.id}-${discipline.name}`} color="success" pill>{discipline.name.trim()}</Badge>)}
        {classPlan.teaching_levels && classPlan.teaching_levels.map(teachingLevel => <Badge key={`${teachingLevel.id}-${teachingLevel.name}`} color="success" pill>{teachingLevel.name.trim()}</Badge>)}
      </div>
      <p className="question-card__more-info">
        {classPlan.learning_objects && classPlan.learning_objects.length > 0 ? (
          <span className="question-card__number-learning-obj">
            <FontAwesomeIcon icon="image" />
            {' '}
            {classPlan.learning_objects.length}
            {' | '}
          </span>
        ) : ''}
        <span className="question-card__more-info--lightgray">
          Tipo:
          {classPlan.plan_type && classPlan.plan_type === 'S' ? (
            'Estação'
            ): 'Aberto'}
            {' '}
        </  span>
      </p>
    </CardHeader>
  );
};

const ClassPlanCard = (props) => {
  const {
    classPlan,
    button,
    withFilters = true,
  } = props;

  return (
    <Card className="h-100 question-card__full">
      { withFilters ? <HeaderWithFilters {...props} /> : <HeaderWithoutFilters {...props} />}
      <CardBody className="question-card__body">
        <div className="l-question-card-text">
          <p className="question-card__extract">
            Etapas:
          </p>
          <p className="question-card__extract">
            <em>
              { classPlan.phases }
            </em>
          </p>
        </div>
      </CardBody>
      <CardFooter className="question-card__footer">
        {button}
      </CardFooter>
    </Card>
  );
};

export default ClassPlanCard;
