import React from 'react';

const Descriptor = ({ i, name, styleTag }) => (
  <span id={i} key={i} className={styleTag}>
    {name}
  </span>
);

export default Descriptor;
