import React from 'react';
import { getCleanCompleteStatement, getCleanLearningObjectSource } from 'helpers/question';
import RemoveButton from 'components/buttons/RemoveButton';
import {
  Alert, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { history } from 'helpers';


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
    removeSelectedObject,
    options,
    addSelectedObjectToQuestion, setObjectIdToNewQuestion,
    addSelectedObjectToActivity, setObjectIdToNewActivity, 
  } = props;

  return (
    <div key={learningObject.id} className="c-learning-object">
       {learningObject.disabled && !options.fromView ? (
          <Alert color="danger" className="c-document__question-unavailable mb-4">
              O Objeto de aprendizagem
            {' '}
              N°
            <strong>{learningObject.id}</strong>
            {' '}
              foi removido pelo autor(a) e não está mais disponível
          </Alert>
        ) : ''}
      { options && options.showOperations && !learningObject.disabled ? (
        <div className="c-learning-object__operations">
          {options.showViewButton ? (
            <Link
              to={`/view-object/${learningObject.id}`}
              title="Visualizar objeto"
              className="btn btn-secondary btn__icon"
            >
              <FontAwesomeIcon icon="eye" />
            </Link>
          ) : ''}
          {options.showCreateQuestionButton ? (
            <UncontrolledButtonDropdown>
              <DropdownToggle caret>
                <FontAwesomeIcon icon="plus" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  title="Adicionar objeto à nova questão"
                  className="c-learning-object__op-add"
                  onClick={() => {
                    addSelectedObjectToQuestion(learningObject);
                    setObjectIdToNewQuestion(learningObject.id);
                    history.push('/create-question');
                  }}
                >
                  Adicionar à questão
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  title="Adicionar objeto à nova atividade"
                  className="c-learning-object__op-add"
                  onClick={() => {
                    addSelectedObjectToActivity(learningObject);
                    setObjectIdToNewActivity(learningObject.id);
                    history.push('/create-activity');
                  }}
                >
                    Adicionar à atividade
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          ) : ''}

        </div>
      ) : ''             
      }
      {options && options.removeOption ? (
        <div className="c-create-question__remove-object-btn">
          <RemoveButton id={learningObject.id} removeSelectedItem={removeSelectedObject} itemName="objeto" />
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
