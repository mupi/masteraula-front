import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

const QuestionSourceYear = ({ source, year, styleTag }) => (
  <span className={styleTag}>
    {source}
    {' '}
    {year}
  </span>
);
export default QuestionSourceYear;
