import React from 'react';

import { getOrderAlternative, getCleanAlternativeText } from 'helpers/question';

const Alternative = ({ option, text }) => (
  /* eslint-disable react/no-danger */
  <div className="c-question__l-alternative">
    <div className="btn__icon">
      { getOrderAlternative(option)}
      {')  '}
    </div>
    <div>
      <div dangerouslySetInnerHTML={{ __html: getCleanAlternativeText(text) }} />
    </div>
  </div>
);

export default Alternative;
