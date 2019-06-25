import React from 'react';
import {
  Button, Card, CardFooter, CardBody, CardHeader,
} from 'reactstrap';
import { getCleanExtractStatement } from 'helpers/question';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RemoveObjectFromQuestionButton from 'components/buttons/RemoveObjectFromQuestionButton';

const isObjectAddedToQuestion = (selectedObjectList, id) => {
  if (selectedObjectList) {
    const objectAdded = selectedObjectList.filter(item => item.id === id);
    return (objectAdded.length > 0);
  }
  return false;
};


const SimpleLObjectCard = (props) => {
  const getQuoteSeparator = (i, length) => {
    if (i !== length - 1) {
      return ', ';
    }
    return '';
  };
  const {
    object, addSelectedObjectToQuestion, selectedObjectList, removeSelectedObjectToQuestion,
  } = props;
  const extractText = object.text ? getCleanExtractStatement(object.text) : '';
  const cleanSource = object.source ? getCleanExtractStatement(object.source) : null;

  const objectTypeImage = object.image ? 'Imagem' : null;
  const objectTypeText = object.text ? 'Texto' : null;

  return (
    <Card className="h-100 object-card__full">
      <CardHeader className="object-card__header">
        <div className="object-card__info-section">
          {objectTypeImage ? (
            <span
              className="object-card__filter-button object-card__filter-button--green"
            >
              {objectTypeImage}
            </span>
          ) : ''}
          {objectTypeText ? (
            <span
              className="object-card__filter-button object-card__filter-button--pink"
            >
              {objectTypeText}
            </span>
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
            (object.tags.length > 0 && cleanSource) ? (
              <span className="object-card__more-info--lightgray">
                {' | '}
              </span>
            ) : ''}
          {
            (cleanSource) ? (
              <span>
                <span className="object-card__more-info--lightgray">Fonte:</span>
                {' '}
                <span className="object-card__tag object-card__info-section-item--italic">{cleanSource}</span>
              </span>
            ) : ''}
        </p>
        {isObjectAddedToQuestion(selectedObjectList, object.id) ? (
          <div className="question-card__pin">
            <FontAwesomeIcon
              icon="thumbtack"
            />
          </div>
        ) : ('')}
      </CardHeader>
      <CardBody className="object-card__body">
        {object && object.image
          ? <div className="object-card__img-wrapper"><img className="object-card__img" alt={cleanSource} src={object.image} width="150" /></div>
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
        {!isObjectAddedToQuestion(selectedObjectList, object.id) ? (
          <Button className="object-card__btn" onClick={() => addSelectedObjectToQuestion(object)}>
            <FontAwesomeIcon icon="plus" className="btn__icon" />
            {' '}
            Adicionar
            {' '}
          </Button>
        ) : (<RemoveObjectFromQuestionButton objectId={object.id} removeSelectedObjectToQuestion={removeSelectedObjectToQuestion} />
        )}
      </CardFooter>
    </Card>
  );
};
export default SimpleLObjectCard;
