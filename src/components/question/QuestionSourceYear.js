import React from 'react';

const QuestionSourceYear = ({ source, year }) => (
  <div className="question-info question-info--source-year">
    <span>
      {source}
      {' '}
      {year}
    </span>
  </div>
);
export default QuestionSourceYear;
