import React from 'react';
import {
  Card, CardHeader, CardText, CardBody, CardTitle, Badge,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { history } from 'helpers';

const PremiumInfo = ({ name, color }) => (
  <Badge color={color} style={{ padding: '5px' }}>
    <FontAwesomeIcon
      icon="crown"
      className="btn__icon"
    />
    {name}
  </Badge>
);

const LinkInfo = ({
  linkName, linkHref, addMyQuestionsFilter, cleanAllSearch, author,
}) => (
  <Link
    to={linkHref}
    onClick={() => {
      history.push(linkHref);
      if (cleanAllSearch) { cleanAllSearch(); }
      if (addMyQuestionsFilter) { addMyQuestionsFilter(author, true); }
    }}
  >
    {linkName}
  </Link>
);


const MyStatisticsCard = (props) => {
  const {
    title, number, linkName, hasLink = true, isPremium, userTypeSection = false,
  } = props;

  return (
    <Card>
      <CardHeader className="c-stat-card__title text-center">{title}</CardHeader>
      <CardBody className="c-stat-card__body">
        <CardTitle className="c-stat-card__number">{number}</CardTitle>
        {linkName && hasLink && (
        <CardText className="c-stat-card__link">
          <LinkInfo {...props} />
        </CardText>
        )}
        { userTypeSection
          && (isPremium ? <PremiumInfo name="Você é premium" color="premium" /> : (
            <Link className="" to="/nossos-planos">
              <PremiumInfo name="Seja premium" color="info" />
            </Link>
          ))}
      </CardBody>
    </Card>
  );
};

export default MyStatisticsCard;
