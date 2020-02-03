import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Button } from 'reactstrap';
import RemoveObjectFromComponentButton from 'components/buttons/RemoveObjectFromComponentButton';
import LearningObjectCard from './LearningObjectCard';

const SimpleLObjectCardList = (props) => {
  const {
    objects, sm, selectedObjectList,
    addSelectedObject, removeSelectedObject,
  } = props;

  const isObjectAdded = (id) => {
    if (selectedObjectList) {
      const objectAdded = selectedObjectList.filter(item => item.id === id);
      return (objectAdded.length > 0);
    }
    return false;
  };

  const CardButton = object => (
    !isObjectAdded(object.id) ? (
      <Button className="object-card__btn" onClick={() => addSelectedObject(object)}>
        <FontAwesomeIcon icon="plus" className="btn__icon" />
        {' '}
        Adicionar
        {' '}
      </Button>
    ) : (
      <RemoveObjectFromComponentButton objectId={object.id} removeSelectedObject={removeSelectedObject} />
    )
  );

  return (
    <Row>
      {objects && objects.map(object => (
        <Col sm={sm} lg="3" xs="12" key={object.id} className="object-card">
          <LearningObjectCard object={object} button={CardButton(object)} {...props} />
        </Col>
      ))}
    </Row>
  );
};

SimpleLObjectCardList.propTypes = {
  objects: PropTypes.arrayOf(PropTypes.shape({})),
  sm: PropTypes.string,
};

SimpleLObjectCardList.defaultProps = {
  objects: [],
  sm: '4',
};

export default SimpleLObjectCardList;
