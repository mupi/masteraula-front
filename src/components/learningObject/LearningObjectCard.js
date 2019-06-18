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
    <Card>
      <CardHeader>
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

        {
            (object.tags.length > 0) ? (
              <span className="question-card__more-info--lightgray">
                tags:
                {' '}
              </span>
            ) : ''}
        {object.tags && object.tags.map((tag, i) => (
          <span key={i} className="question-card__tag question-card__info-section-item--italic">
            {tag.name}
            { getQuoteSeparator(i, object.tags.length)}
          </span>
        ))}
      </CardHeader>
      <CardBody>
        {object && object.image
          ? <div className="object-card__img-wrapper"><img className="object-card__img" alt={object.source} src={object.image} width="150" /></div>
          : ''}
        { (extractText && extractText.length >= 150) ? ` ${extractText.substring(0, 150)}${' ...'}` : extractText }
      </CardBody>
      <CardFooter className="question-card__footer">
        <Link to={`/view-learningobject/${object.id}`}>
          <Button className="question-card__btn">
            Ver objeto
            {' '}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
export default LearningObjectCard;
