import React from 'react';

const Tag = ({ i, name, styleTag }) => (
  <span id={i} className={styleTag}>
    {name}
  </span>
);

export default Tag;
