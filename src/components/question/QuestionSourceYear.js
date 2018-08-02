import React from 'react';

const QuestionSourceYear = ({ source, year }) => (
  <div className="question-info--source-year">
    <span className="question-info question-info--purple">
      {source}
      {' '}
      {year}
    </span>
  </div>
);
export default QuestionSourceYear;
