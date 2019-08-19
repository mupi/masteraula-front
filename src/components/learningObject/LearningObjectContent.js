import React from 'react';
import { getCleanCompleteStatement, getCleanLearningObjectSource } from 'helpers/question';
import RemoveObjectFromQuestionButton from 'components/buttons/RemoveObjectFromQuestionButton';
import {
  Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


/*
Options available for LearningObjectContent
const options = {
  showOperations,
  showViewButton,
  showCreateQuestionButton,
  removeOption,
  showTitle,
};
*/

const LearningObjectContent = (props) => {
  /* eslint-disable react/no-danger */
  const {
    learningObject,
    removeSelectedObjectToQuestion,
    options,
  } = props;

  return (
    <div key={learningObject.id} className="c-learning-object">
      { options && options.showOperations ? (
        <div className="c-learning-object__operations">
          {options.showViewButton ? (
            <Link
              to={`/view-object/${learningObject.id}`}
              title="Visualizar objeto"
              className="btn btn-secondary btn__icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon="eye" />
            </Link>
          ) : ''}
          {options.showCreateQuestionButton ? (
            <Button title="Adicionar objeto à nova questão">
              <FontAwesomeIcon icon="plus" />
            </Button>
          ) : ''}

        </div>
      ) : ''

      }
      {options && options.removeOption ? (
        <div className="c-create-question__remove-object-btn">
          <RemoveObjectFromQuestionButton objectId={learningObject.id} removeSelectedObjectToQuestion={removeSelectedObjectToQuestion} />
        </div>
      ) : ''}
      { options && options.showTitle ? (
        <div className="object-card__id">
          Objeto N°
          {' '}
          {learningObject.id}
        </div>
      ) : ''}
      {(learningObject.image) ? (
        <div>
          <img alt="objeto-aprendizagem" className="c-learning-object__img" src={learningObject.image} />
        </div>
      ) : ''}

      {(learningObject.text) ? (
        <div className="c-learning-object--text">
          <div dangerouslySetInnerHTML={{ __html: getCleanCompleteStatement(learningObject.text) }} />
        </div>
      ) : ''}
      {(learningObject.source) ? (
        <div className="c-learning-object--source">
          <div dangerouslySetInnerHTML={{ __html: getCleanLearningObjectSource(learningObject.source) }} />
        </div>
      ) : ''}
      {(learningObject.tags && learningObject.tags.length > 0) ? (
        <p className="c-learning-object-tags">
          <small>Tags:</small>
          {' '}
          <small><i>{learningObject.tags.map(tag => tag.name.trim()).join(', ')}</i></small>
        </p>
      ) : ''}
    </div>
  );
};

export default LearningObjectContent;
