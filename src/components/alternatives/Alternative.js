import React from 'react';

const Alternative = ({ i, text }) => (
  <p key={i} className="alternative">
    {text}
  </p>
);

export default Alternative;
