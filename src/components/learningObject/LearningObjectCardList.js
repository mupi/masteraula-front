import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import LearningObjectCard from './LearningObjectCard';

const LearningObjectCardList = (props) => {
  const {
    objects, count, sm, textResult = 'Objetos de aprendizagem encontrados', showLink = false, search,
  } = props;

  const CardButton = object => (
    <Link to={`/view-object/${object.id}`}>
      <Button className="object-card__btn">
        Ver objeto
      </Button>
    </Link>
  );

  return (
    <Row>
      <Col sm="12" className="c-object-base__total-results">
        {`${textResult}: ${count}`}
        {(search && search !== undefined && search.length > 0) ? (
          <>
            {' para '}
            <span className="c-question-base__search-term">
              {search}
            </span>
          </>
        ) : ''
                }
        {' '}
        {showLink ? (
          <a
            className="c-object-base__link-askquestion"
            target="_blank"
            rel="noopener noreferrer"
            href="https://goo.gl/forms/bG2mMbMNNrNiOjqt2"
          >
            Não encontrou o que queria? Clique aqui
          </a>
        ) : ''}
      </Col>
      {objects && objects.map(object => (
        <Col sm={sm} lg="3" xs="12" key={object.id} className="object-card">
          <LearningObjectCard object={object} button={CardButton(object)} filterTags {...props} />
        </Col>
      ))}
    </Row>
  );
};

LearningObjectCardList.propTypes = {
  objects: PropTypes.arrayOf(PropTypes.shape({})),
  count: PropTypes.number,
  sm: PropTypes.string,
};

LearningObjectCardList.defaultProps = {
  objects: [],
  count: 0,
  sm: '4',
};

export default LearningObjectCardList;
