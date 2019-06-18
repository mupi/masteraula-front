import React from 'react';
import {
  Button, Card, CardFooter, CardBody, CardHeader,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const LearningObjectCard = (props) => {
  const getQuoteSeparator = (i, length) => {
    if (i !== length - 1) {
      return ', ';
    }
    return '';
  };
  const { object } = props;
  return (
    <Card>
      <CardHeader>
        <Button
          key={object.type}
          className="question-card__info-section-item question-card__info-section-item--pink"
        >
          {object.type}
        </Button>
        <br />
        {
            (object.tags.length > 0) ? (
              <span className="question-card__more-info--lightgray">


                tags:
                {' '}
              </span>
            ) : ''}
        {object.tags && object.tags.map((tag, i) => (
          <span key={i} className="question-card__tag question-card__info-section-item--italic">
            {tag.name}
            { getQuoteSeparator(i, object.tags.length)}
          </span>
        ))}
      </CardHeader>
      <CardBody>
        {object && object.image ? <img src={object.image} width="150" /> : ''}
        { (object.text && object.text.length >= 150) ? ` ${object.text.substring(0, 150)}${' ...'}` : object.text }
      </CardBody>
      <CardFooter className="question-card__footer">
        <Link to={`/view-object/${object.id}`}>
          <Button className="question-card__btn">


              Ver objeto

            {' '}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
export default LearningObjectCard;