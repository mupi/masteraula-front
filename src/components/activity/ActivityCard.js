import React from 'react';
import {
  Button, Card, CardFooter, CardBody, CardHeader,
} from 'reactstrap';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ActivityCard = (props) => {
  const {
    activity,
    addSelectedDisciplineFilter,
    addSelectedTeachingLevelFilter,
  } = props;
  const tagList = activity.tags.concat(activity.topics);
  const fullTagsTopics = tagList && tagList.length > 0 ? tagList.map(t => t.name).join(', ') : '';

  return (
    <Card className="h-100 question-card__full">
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

      <CardBody className="question-card__body">
        <div className="l-question-card-text">
          <p className="question-card__extract">
            <strong>Tópicos abordados na atividade:</strong>
            { (fullTagsTopics.length >= 150) ? ` ${fullTagsTopics.substring(0, 150)}${' ...'}` : fullTagsTopics }
            {' '}
          </p>
        </div>
      </CardBody>
      <CardFooter className="question-card__footer">
        <Link to={`/view-activity/${activity.id}`}>
          <Button className="question-card__btn">
            Ver atividade
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ActivityCard;
