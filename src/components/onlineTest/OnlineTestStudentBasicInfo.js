import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OnlineTestStudentBasicInfo = (props) => {
  const { student } = props;

  return (
    <>
      <p className="c-online__questions-info">
        <span className="c-online__questions-info--label">
          <FontAwesomeIcon
            className="btn__icon"
            icon="clock"
          />
          <strong>Prova finalizada em: </strong>
        </span>
        <span className="c-online__questions-info--value">
          {student.start}
        </span>
      </p>
      <p className="c-online__questions-info">
        <span className="c-online__questions-info--label">
          <FontAwesomeIcon
            className="btn__icon"
            icon="hourglass-start"
          />
          <strong>Tempo de duração: </strong>
        </span>
        <span className="c-online__questions-info--value">
          {student.finish}
        </span>
      </p>
      <p className="c-online__questions-info">
        <span className="c-online__questions-info--label">
          <FontAwesomeIcon
            className="btn__icon"
            icon="star"
          />
          <strong>Pontuação final: </strong>
        </span>
        <span className="c-online__questions-info--value">
          {`${student.total_score} pontos`}
        </span>
      </p>
    </>
  );
};

export default OnlineTestStudentBasicInfo;
