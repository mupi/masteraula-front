import React from 'react';
import {
  ListGroup, ListGroupItem, Button, Alert,
} from 'reactstrap';
import LabelItem from 'components/label/LabelItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const { myQuestionLabels } = props;
const SidebarLabels = ({
  labels, isFetching,
  showCreateMyQuestionLabelModal, showDeleteMyQuestionLabelModal, showUpdateMyQuestionLabelModal,
  addSelectedMyQuestionLabelFilter, isFetchingQuestions,
}) => (
  <div className="labels__section">
    <h6 className="labels__title">Minhas etiquetas</h6>
    { isFetching ? (
      <Alert color="warning" fade={false}>
                  Carregando ...
      </Alert>
    ) : (
      <ListGroup flush className="labels__list-group">
        {labels && labels.map(label => (
          <ListGroupItem key={label.id} className="label-item__list-group-item">
            <LabelItem
              label={label}
              showUpdateMyQuestionLabelModal={showUpdateMyQuestionLabelModal}
              showDeleteMyQuestionLabelModal={showDeleteMyQuestionLabelModal}
              addSelectedMyQuestionLabelFilter={addSelectedMyQuestionLabelFilter}
              isFetchingQuestions={isFetchingQuestions}
            />
          </ListGroupItem>
        ))}
        <ListGroupItem className="label-item__list-group-item">
          <Button color="link" className="label-item__name-link labels__new-option-item" onClick={() => showCreateMyQuestionLabelModal()}>
            <span className="labels__new-option-name">
              <FontAwesomeIcon icon="plus-circle" className="btn__icon" />
              {' '}
              Criar etiqueta
            </span>
          </Button>
        </ListGroupItem>
      </ListGroup>
    )
      }

  </div>
);
export default SidebarLabels;
