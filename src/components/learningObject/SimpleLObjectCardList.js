import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import SimpleLObjectCard from './SimpleLObjectCard';

const SimpleLObjectCardList = (props) => {
  const {
    objects, sm,
    addSelectedObjectToQuestion,
  } = props;
  return (
    <Row>
      {objects && objects.map(object => (
        <Col sm={sm} lg="3" xs="12" key={object.id} className="object-card">
          <SimpleLObjectCard object={object} {...props} addSelectedObjectToQuestion={addSelectedObjectToQuestion} />
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
