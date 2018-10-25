import React from 'react';
import Discipline from './Discipline';

const DisciplineList = ({ list }) => (
  <div className="disciplines" style={{'display':'inline-block !important'}}>
    {list && list.map((discipline, i) => (
      <Discipline
        key={i}
        name={discipline.name}
      />
    ))}
  </div>
);
export default DisciplineList;
