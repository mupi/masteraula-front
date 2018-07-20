import React from 'react';

const Alternative = ({ i, text }) => (
  <p key={i} className="text-alternative">
    {text}
  </p>
);

export default Alternative;
