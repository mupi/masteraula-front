import React from 'react';
import PropTypes from 'prop-types';

const Star = ({ selected = false, onClick = f => f }) => (
  <div
    className={(selected) ? 'stars__item stars__item--selected' : 'stars__item'}
    onClick={onClick}
    onKeyDown={onClick}
    role="button"
    tabIndex={0}
  />
);
Star.propTypes = {
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

Star.defaultProps = {
  selected: false,
  onClick: f => f,
};

export default Star;
