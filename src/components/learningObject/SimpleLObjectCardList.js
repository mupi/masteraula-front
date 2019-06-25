import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import SimpleLObjectCard from './SimpleLObjectCard';

const SimpleLObjectCardList = (props) => {
  const {
    objects, count, sm, textResult = 'Objetos de aprendizagem encontrados', addSelectedObjectToQuestion,
  } = props;
  return (
    <Row>
      <Col sm="12" className="c-object-base__total-results">
        {`${textResult}: ${count}`}
      </Col>
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
  count: PropTypes.number,
  sm: PropTypes.string,
};

SimpleLObjectCardList.defaultProps = {
  objects: [],
  count: 0,
  sm: '4',
};

export default SimpleLObjectCardList;
