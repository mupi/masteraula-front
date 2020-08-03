import React from 'react';
import {
  Button, Card, CardFooter, CardBody, CardHeader, Badge,
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HeaderWithFilters = (props) => {
  const {
    activity,
    addSelectedDisciplineFilter,
    addSelectedTeachingLevelFilter,
  } = props;

  return (
    <CardHeader className="question-card__header">
      <div className="d-flex question-card__id align-items-center">
        <div>
          { `Atividade N° ${activity.id}`}
        </div>
      </div>
      <div className="question-card__info-section">
        {activity.disciplines && activity.disciplines.map(discipline => (
          <Button
            key={discipline.id}
            className="question-card__info-section-item question-card__info-section-item--pink"
            onClick={() => addSelectedDisciplineFilter(discipline.id.toString())}
          >
            <span className="question-card__info-section--complete">{discipline.name}</span>
            <span className="question-card__info-section--substring">{discipline.slug.toUpperCase()}</span>
          </Button>
        ))}
        {activity.teaching_levels && activity.teaching_levels.map(teachingLevel => (
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
        {activity.learning_objects && activity.learning_objects.length > 0 ? (
          <span className="question-card__number-learning-obj">
            <FontAwesomeIcon icon="image" />
            {' '}
            {activity.learning_objects.length}
            {' '}
            {' | '}
          </span>
        ) : ''}
        {
      (activity.tasks.length > 0) ? (
        <span className="question-card__more-info--lightgray">
          {' | '}
          {`Tarefas: ${activity.tasks.length}`}
          {' '}
        </span>
      ) : ''}
      </p>
    </CardHeader>
  );
};

const HeaderWithoutFilters = (props) => {
  const { activity } = props;
  return (
    <CardHeader className="question-card__header text-left">
      <div className="d-flex question-card__id align-items-center">
        <div>
          { `Atividade N° ${activity.id}`}
        </div>
      </div>
      <div className="question-card__info-section">
        {activity.disciplines && activity.disciplines.map(discipline => <Badge className="question-card__info-section-item--pink" key={`${discipline.id}-${discipline.name}`} color="success" pill>{discipline.name.trim()}</Badge>)}
        {activity.teaching_levels && activity.teaching_levels.map(teachingLevel => <Badge key={`${teachingLevel.id}-${teachingLevel.name}`} color="success" pill>{teachingLevel.name.trim()}</Badge>)}
      </div>
      <p className="question-card__more-info">
        {activity.learning_objects && activity.learning_objects.length > 0 ? (
          <span className="question-card__number-learning-obj">
            <FontAwesomeIcon icon="image" />
            {' '}
            {activity.learning_objects.length}
            {' '}
            {' | '}
          </span>
        ) : ''}
        {
      (activity.tasks.length > 0) ? (
        <span className="question-card__more-info--lightgray">
          {`Tarefas: ${activity.tasks.length}`}
          {' '}
        </span>
      ) : ''}
      </p>
    </CardHeader>
  );
};

const ActivityCard = (props) => {
  const {
    activity,
    button,
    withFilters = true,
  } = props;
  const tagList = activity.tags.concat(activity.topics);
  const fullTagsTopics = tagList && tagList.length > 0 ? tagList.map(t => t.name).join(', ') : '';

  return (
    <Card className="h-100 question-card__full">
      { withFilters ? <HeaderWithFilters {...props} /> : <HeaderWithoutFilters {...props} />}
      <CardBody className="question-card__body">
        <div className="l-question-card-text">
          <p className="question-card__extract">
            Tópicos abordados na atividade:
          </p>
          <p className="question-card__extract">
            <em>
              { (fullTagsTopics.length >= 150) ? ` ${fullTagsTopics.substring(0, 150)}${' ...'}` : fullTagsTopics }
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

export default ActivityCard;
