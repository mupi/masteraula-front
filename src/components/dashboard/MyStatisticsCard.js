import React from 'react';
import {
  Card, CardHeader, CardText, CardBody, CardTitle,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const MyStatisticsCard = (props) => {
  const {
    title, number, linkHref, linkName, hasLink = true,
  } = props;

  return (
    <Card>
      <CardHeader className="c-stat-card__title text-center">{title}</CardHeader>
      <CardBody className="c-stat-card__body">
        <CardTitle className="c-stat-card__number">{number}</CardTitle>
        {linkName && hasLink && (
        <CardText className="c-stat-card__link">
          <Link to={linkHref}>
            {linkName}
          </Link>
        </CardText>
        )}
      </CardBody>
    </Card>
  );
};

export default MyStatisticsCard;
