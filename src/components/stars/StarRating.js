import React from 'react';
import PropTypes from 'prop-types';
import Star from './Star';
import 'assets/css/Star.css';

const StarRating = ({ starsSelected = 0, totalStars = 5, onRate = f => f }) => (
  <div className="star-rating">
    {[...Array(totalStars)].map((n, i) => (
      <Star
        key={i}
        selected={i < starsSelected}
        onClick={() => onRate(i + 1)}
      />
    ))}
    <p className="list-stars">
      {starsSelected}
      {' '}
de
      {' '}
      {totalStars}
      {' '}
estrelas
    </p>
  </div>
);
StarRating.propTypes = {
  starsSelected: PropTypes.number,
  totalStars: PropTypes.number,
  onRate: PropTypes.func,
};

export default StarRating;
