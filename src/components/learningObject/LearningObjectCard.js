import React from 'react';
import {
  Button, Card, CardFooter, CardBody, CardHeader,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { getCleanExtractStatement } from 'helpers/question';

const CardBodyLearninObject = (props) => {
  const { learningObject, objectType } = props;

  const extractText = learningObject.text ? getCleanExtractStatement(learningObject.text) : '';
  const cleanSource = learningObject.source ? getCleanExtractStatement(learningObject.source) : null;

  return (
    <CardBody className="object-card__body">
      {objectType === 'Image' ? (
        <div className="object-card__img-wrapper">
          <img className="object-card__img" alt={cleanSource} src={learningObject.image} width="150" />
        </div>
      ) : ''}
      {objectType === 'Texto' ? (
        <p className="question-card__extract">
          {extractText.substring(0, 150)}
          {' ...'}
        </p>
      ) : extractText}
    </CardBody>
  );
};

const LearningObjectCard = (props) => {
  const { object, addSelectedObjectTypeFilter } = props;
  const cleanSource = object.source ? getCleanExtractStatement(object.source) : null;

  const objectType = (() => {
    switch (object.object_type) {
      case 'I': return 'Imagem';
      case 'T': return 'Texto';
      case 'A': return 'Audio';
      case 'V': return 'Video';
      default: return null;
    }
  })();

  const buttonColor = (() => {
    switch (object.object_type) {
      case 'I': return 'pink';
      case 'T': return 'green';
      case 'A': return 'blue';
      case 'V': return 'blue';
      default: return null;
    }
  })();

  const handleSelectedObjectTypeFilter = () => {
    addSelectedObjectTypeFilter(object.object_type);
  };

  return (
    <Card className="h-100 object-card__full">
      <CardHeader className="object-card__header">
        <div className="object-card__id">
          {`Objeto N° ${object.id}`}
        </div>
        <div className="object-card__info-section">
          {objectType ? (
            <Button
              className={`object-card__filter-button object-card__filter-button--${buttonColor}`}
              onClick={handleSelectedObjectTypeFilter}
            >
              {objectType}
            </Button>
          ) : ''}
        </div>
        <p className="object-card__more-info">
          {(object.tags && object.tags.length > 0) && (
            <span>
              <span className="object-card__more-info--lightgray">tags: </span>
              <span className="object-card__tag object-card__info-section-item--italic">
                {object.tags.map(t => t.name).join(', ')}
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
      <CardBodyLearninObject learningObject={object} objectType={objectType} />
      <CardFooter className="object-card__footer">
        <Link to={`/view-object/${object.id}`}>
          <Button className="object-card__btn">
            Ver objeto
            {' '}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
export default LearningObjectCard;
