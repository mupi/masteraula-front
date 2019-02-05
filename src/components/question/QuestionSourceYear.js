import React from 'react';

const QuestionSourceYear = ({ source, year }) => (
  <div className="" style={{'display':'inline-block !important'}}>
    <span className="question-info question-info--purple">
      {source}
      {' '}
      {year}
    </span>
  </div>
);
export default QuestionSourceYear;
