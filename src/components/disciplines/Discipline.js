import React from 'react';

const Discipline = ({ i, name }) => (
  <span key={i} className="label-info discipline-name">
    {name}
  </span>
);

export default Discipline;
