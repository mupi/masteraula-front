import React from 'react';
import PropTypes from 'prop-types';
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

RemoveButton.propTypes = {
  id: PropTypes.number,
  removeSelectedItem: PropTypes.func,
};

RemoveButton.defaultProps = {
  id: 0,
  removeSelectedItem: f => f,
};
export default RemoveButton;
