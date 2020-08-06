import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';

const RemoveButton = ({
  id, removeSelectedItem, itemName,
}) => (
  <Button
    value={id}
    title={`Remover ${itemName}`}
    className="object-card__btn object-card__btn--red"
    onClick={() => removeSelectedItem(id)}
  >
    <FontAwesomeIcon icon="trash-alt" className="btn__icon" />
    {' '}
    Remover
  </Button>
);

export default RemoveButton;
