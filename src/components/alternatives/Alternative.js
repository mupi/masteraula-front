import React from 'react';
import { getOrderAlternative, getCleanAlternativeText } from 'helpers/question';

const Alternative = ({ option, text }) => (
  <p className="alternative">
    { getOrderAlternative(option)}
    {') '}
    {getCleanAlternativeText(text)}
  </p>
);

export default Alternative;
