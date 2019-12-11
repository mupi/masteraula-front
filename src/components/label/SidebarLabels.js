import React from 'react';
import {
  ListGroup, ListGroupItem, Button, Alert,
} from 'reactstrap';
import LabelItem from 'components/label/LabelItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const { myQuestionLabels } = props;
const SidebarLabels = ({ labels, isFetching }) => (
  <div className="mt-3">
    <h6 className="labels__title">Minhas etiquetas</h6>
    { isFetching ? (
      <Alert color="warning" fade={false}>
                  Carregando ...
      </Alert>
    ) : (
      <ListGroup flush className="labels__list-group">
        {labels && labels.map(label => (
          <ListGroupItem className="label-item__list-group-item">
            <LabelItem key={label.id} label={label} />
          </ListGroupItem>
        ))}
        <ListGroupItem className="label-item__list-group-item">
          <Button color="link" className="label-item__name-link labels__new-option-item">
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
