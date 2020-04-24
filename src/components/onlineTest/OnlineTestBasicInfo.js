import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import URLCopy from 'components/onlineTest/URLCopy';
import { formatDate } from 'helpers/question';
import { masteraulaUrl } from 'helpers/config';

const OnlineTestBasicInfo = (props) => {
  const { onlineTest } = props;
  const duration = onlineTest.duration ? `${onlineTest.duration} min` : 'Livre';
  return (
    <Row>
      <Col sm="6">
        <p className="c-online__total-questions-label">
          <strong>{`Total de ${onlineTest.questions_quantity} questões`}</strong>
        </p>
        <p className="c-online__questions-info">
          <span className="c-online__questions-info--label">
            <FontAwesomeIcon
              className="btn__icon"
              icon="clock"
            />
            <strong>Periodo ativo: </strong>
          </span>
          <span className="c-online__questions-info--value">{`Entre ${formatDate(onlineTest.start_date)} e ${formatDate(onlineTest.finish_date)}` }</span>
        </p>
        <p className="c-online__questions-info">
          <span className="c-online__questions-info--label">
            <FontAwesomeIcon
              className="btn__icon"
              icon="hourglass-start"
            />
            <strong>Duração: </strong>
          </span>
          <span className="c-online__questions-info--value">{duration}</span>
        </p>
        <p className="c-online__questions-info">
          <span className="c-online__questions-info--label">
            <FontAwesomeIcon
              className="btn__icon"
              icon="image"
            />
            <strong>Mídia: </strong>
          </span>
          <span className="c-online__questions-info--value">
            { `${onlineTest.media_questions} objetos de aprendizagem`}
          </span>
        </p>
        <p className="c-online__questions-info">
          <span className="c-online__questions-info--label">
            <FontAwesomeIcon
              className="btn__icon"
              icon="check-square"
            />
            <strong>Tipos de questões: </strong>
          </span>
          <span className="c-online__questions-info--value">
            { `${onlineTest.types_questions.dissertation_quantity} dissertativas / `}
            { `${onlineTest.types_questions.objective_quantity} multipla escolha`}
          </span>
        </p>
        <p className="c-online__questions-info">
          <span className="c-online__questions-info--label">
            <FontAwesomeIcon
              className="btn__icon"
              icon="graduation-cap"
            />
            <strong>Aplicação: </strong>
          </span>
          <span className="c-online__questions-info--value">
            { `${onlineTest.application.exam_quantity} questões de vestibular / `}
            { `${onlineTest.application.authoral_quantity} questão autoral`}
          </span>
        </p>
      </Col>

      <Col sm="6">
        <URLCopy url={`${masteraulaUrl}/apply-online/${onlineTest.link}`} />
      </Col>
    </Row>
  );
};

export default OnlineTestBasicInfo;
