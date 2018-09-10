import React from 'react';
import { getOrderAlternative, getCleanAlternativeText } from 'helpers/question';

const Alternative = ({ key, option, text }) => (
  <p key={key} className="alternative">
    { getOrderAlternative(option)}
    {') '}
    {getCleanAlternativeText(text)}
  </p>
);

export default Alternative;
