import React from 'react';
import PropTypes from 'prop-types';
import Star from './Star';

const StarRating = ({ starsSelected = 0, totalStars = 5, onRate = f => f }) => (
  <div className="star-rating">
    {[...Array(totalStars)].map((n, i) => (
      <Star
        key={n}
        selected={i < starsSelected}
        onClick={() => onRate(i + 1)}
      />
    ))}
    <p className="stars">
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

StarRating.defaultProps = {
  starsSelected: 0,
  totalStars: 5,
  onRate: f => f,
};

export default StarRating;
