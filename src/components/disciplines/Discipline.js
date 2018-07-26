import React from 'react';

const Discipline = ({ i, name }) => (
  <span key={i} className="disciplines__item">
    {name}
  </span>
);

export default Discipline;
