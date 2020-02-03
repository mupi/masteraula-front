import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';

const RemoveObjectFromComponentButton = ({
  objectId, removeSelectedObject,
}) => (
  <Button
    value={objectId}
    title="Remover objeto"
    className="object-card__btn object-card__btn--red"
    onClick={() => removeSelectedObject(objectId)}
  >
    <FontAwesomeIcon icon="trash-alt" className="btn__icon" />
    {' '}
    Remover
  </Button>
);

RemoveObjectFromComponentButton.propTypes = {
  objectId: PropTypes.number,
  removeSelectedObject: PropTypes.func,
};

RemoveObjectFromComponentButton.defaultProps = {
  objectId: 0,
  removeSelectedObject: f => f,
};
export default RemoveObjectFromComponentButton;
