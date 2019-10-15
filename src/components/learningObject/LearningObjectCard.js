import React from 'react';
import {
  Button, Card, CardFooter, CardBody, CardHeader,
} from 'reactstrap';

import { getCleanExtractStatement } from 'helpers/question';

const getObjectType = (objectType) => {
  switch (objectType) {
    case 'I': return 'Imagem';
    case 'T': return 'Texto';
    case 'A': return 'Audio';
    case 'V': return 'Video';
    default: return null;
  }
};

const getButtonColor = (objectType) => {
  switch (objectType) {
    case 'I': return 'pink';
    case 'T': return 'green';
    case 'A': return 'blue';
    case 'V': return 'blue';
    default: return null;
  }
};

const CardBodyLearninObject = (props) => {
  const { learningObject } = props;

  const extractText = learningObject.text ? getCleanExtractStatement(learningObject.text) : '';
  const cleanSource = learningObject.source ? getCleanExtractStatement(learningObject.source) : null;
  const hasText = learningObject.object_types.indexOf('T') >= 0;

  return (
    <CardBody className="object-card__body">
      {!hasText ? (
        <div className="object-card__img-wrapper">
          <img className="object-card__img" alt={cleanSource} src={learningObject.image} width="150" />
        </div>
      ) : ''}
      {hasText ? (
        <p className="question-card__extract">
          {extractText.substring(0, 150)}
          {' ...'}
        </p>
      ) : extractText}
    </CardBody>
  );
};

const LearningObjectCard = (props) => {
  const {
    object, addSelectedObjectTypeFilter, button, filterTags = false,
  } = props;
  const cleanSource = object.source ? getCleanExtractStatement(object.source) : null;

  const joinTagNames = () => object.tags.map(t => t.name).join(', ');

  const objectTypesBadges = objType => (filterTags ? (
    <Button
      className={`object-card__filter-button object-card__filter-button--${getButtonColor(objType)}`}
      onClick={() => addSelectedObjectTypeFilter(objType)}
    >
      {getObjectType(objType)}
    </Button>
  ) : (
    <span className={`object-card__filter-button object-card__filter-button--${getButtonColor(objType)}`}>
      {getObjectType(objType)}
    </span>
  ));

  return (
    <Card className="h-100 object-card__full">
      <CardHeader className="object-card__header">
        <div className="object-card__id">
          {`Objeto N° ${object.id}`}
        </div>
        <div className="object-card__info-section">
          {object.object_types.map(objectTypesBadges)}
        </div>
        <p className="object-card__more-info">
          {(object.tags && object.tags.length > 0) && (
            <span>
              <span className="object-card__more-info--lightgray">tags: </span>
              <span className="object-card__tag object-card__info-section-item--italic">
                {joinTagNames}
              </span>
            </span>
          )}
          {
            (cleanSource) ? (
              <span>
                {(object.tags && object.tags.length > 0) && (
                  <span className="object-card__more-info--lightgray">
                    {' | '}
                  </span>
                )}
                <span className="object-card__more-info--lightgray">Fonte: </span>
                <span className="object-card__tag object-card__info-section-item--italic">{cleanSource}</span>
              </span>
            ) : ''}
        </p>
      </CardHeader>
      <CardBodyLearninObject learningObject={object} />
      <CardFooter className="object-card__footer">
        {button}
      </CardFooter>
    </Card>
  );
};
export default LearningObjectCard;
