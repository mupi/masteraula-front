import React from 'react';

const Discipline = ({ i, name }) => (
  <span key={i} className="disciplines__item" style={{'display':'inline-block !important'}}>
    {name}
  </span>
);

export default Discipline;
