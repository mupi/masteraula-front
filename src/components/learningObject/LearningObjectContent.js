import React from 'react';
import { getCleanCompleteStatement, getCleanLearningObjectSource } from 'helpers/question';
import {
  Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const LearningObjectContent = (props) => {
  /* eslint-disable react/no-danger */
  const {
    learningObject, removeOption = false, removeSelectedObjectToQuestion,
  } = props;

  return (
    <div key={learningObject.id} className="c-learning-object">
      {removeOption ? (
        <div className="c-create-question__remove-object-btn">
          <Button
            value={learningObject.id}
            title="Remover questão"
            className="c-question__btn-remove-question"
            onClick={() => removeSelectedObjectToQuestion(learningObject.id)}
          >
            <FontAwesomeIcon icon="trash-alt" className="btn__icon" />
            {' '}
            Remover objeto
          </Button>
        </div>
      ) : ''}
      {(learningObject.image) ? (
        <div>
          <img alt="objeto-aprendizagem" src={learningObject.image} />
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
