import React from 'react';
import { Row, Col } from 'reactstrap';

import { getOrderAlternative, getCleanAlternativeText } from 'helpers/question';

const Alternative = ({ option, text }) => (
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
