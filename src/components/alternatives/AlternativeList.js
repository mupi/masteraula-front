import React from 'react';
import Alternative from './Alternative';

const AlternativeList = ({ list }) => (
  <div>
    {list.map((alternative, i) => (
      <Alternative
        key={alternative.id}
        option={i}
        text={alternative.text}
      />
    ))}
  </div>
);
export default AlternativeList;
