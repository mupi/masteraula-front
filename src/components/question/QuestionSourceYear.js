import React from 'react';

const QuestionSourceYear = ({ source, year }) => (
  <div className="question-info--source-year" style={{'display':'inline-block !important'}}>
    <span className="question-info question-info--purple">
      {source}
      {' '}
      {year}
    </span>
  </div>
);
export default QuestionSourceYear;
