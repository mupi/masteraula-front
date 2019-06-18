import React from 'react';
import {
  Button, Card, CardFooter, CardBody, CardHeader,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { getCleanExtractStatement } from 'helpers/question';

const LearningObjectCard = (props) => {
  const getQuoteSeparator = (i, length) => {
    if (i !== length - 1) {
      return ', ';
    }
    return '';
  };
  const { object } = props;
  const extractText = object.text ? getCleanExtractStatement(object.text) : '';
  const objectTypeImage = object.image ? 'Imagem' : null;
  const objectTypeText = object.text ? 'Texto' : null;

  return (
    <Card className="h-100 object-card__full">
      <CardHeader className="object-card__header">
        <div className="object-card__info-section">
          {objectTypeText ? (
            <Button
              key={object.type}
              className="object-card__filter-button object-card__filter-button--pink"
            >
              {objectTypeText}
            </Button>
          ) : ''}
          {objectTypeImage ? (
            <Button
              key={object.type}
              className="object-card__filter-button object-card__filter-button--green"
            >
              {objectTypeImage}
            </Button>
          ) : ''}
        </div>
        <p className="object-card__more-info">
          {
            (object.tags.length > 0) ? (
              <span className="object-card__more-info--lightgray">
                tags:
                {' '}
              </span>
            ) : ''}
          {object.tags && object.tags.map((tag, i) => (
            <span key={i} className="object-card__tag object-card__info-section-item--italic">
              {tag.name}
              { getQuoteSeparator(i, object.tags.length)}
            </span>
          ))}
          {
            (object.tags.length > 0 && object.source) ? (
              <span className="object-card__more-info--lightgray">
                {' | '}
              </span>
            ) : ''}
          {
            (object.source) ? (
              <span>
                <span className="object-card__more-info--lightgray">Fonte:</span>
                {' '}
                <span className="object-card__tag object-card__info-section-item--italic">{object.source}</span>
              </span>
            ) : ''}
        </p>
      </CardHeader>
      <CardBody className="object-card__body">
        {object && object.image
          ? <div className="object-card__img-wrapper"><img className="object-card__img" alt={object.source} src={object.image} width="150" /></div>
          : ''}
        { (extractText && extractText.length >= 150)
          ? (
            <p className="question-card__extract">
              {extractText.substring(0, 150)}
              {' ...'}
            </p>
          ) : extractText }
      </CardBody>
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
