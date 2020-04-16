import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import URLCopy from 'components/onlineTest/URLCopy';

const OnlineTestBasicInfo = (props) => {
  const { onlineTest } = props;

  return (
    <Row>
      <Col sm="6">
        <p className="c-online__total-questions-label">
          <strong>{`Total de ${onlineTest.questions.length} questões`}</strong>
        </p>
        <p className="c-online__questions-info">
          <span className="c-online__questions-info--label">
            <FontAwesomeIcon
              className="btn__icon"
              icon="clock"
            />
            <strong>Periodo ativo: </strong>
          </span>
          <span className="c-online__questions-info--value">{`Entre ${onlineTest.start_date} e ${onlineTest.finish_date}` }</span>
        </p>
        <p className="c-online__questions-info">
          <span className="c-online__questions-info--label">
            <FontAwesomeIcon
              className="btn__icon"
              icon="hourglass-start"
            />
            <strong>Duração:</strong>
          </span>
          <span className="c-online__questions-info--value">{onlineTest.duration}</span>
        </p>
        <p className="c-online__questions-info">
          <span className="c-online__questions-info--label">
            <FontAwesomeIcon
              className="btn__icon"
              icon="image"
            />
            <strong>Mídia:</strong>
          </span>
          <span className="c-online__questions-info--value">2 imagens / 2 vídeos</span>
        </p>
        <p className="c-online__questions-info">
          <span className="c-online__questions-info--label">
            <FontAwesomeIcon
              className="btn__icon"
              icon="check-square"
            />
            <strong>Tipos de questões: </strong>
          </span>
          <span className="c-online__questions-info--value">2 dissertativas / 0 multipla escolha</span>
        </p>
        <p className="c-online__questions-info">
          <span className="c-online__questions-info--label">
            <FontAwesomeIcon
              className="btn__icon"
              icon="graduation-cap"
            />
            <strong>Aplicação: </strong>
          </span>
          <span className="c-onlin__questions-info-value">2 questões de vestibular / 1 questão autoral</span>
        </p>
      </Col>

      <Col sm="6">
        <URLCopy url={onlineTest.link} />
      </Col>
    </Row>
  );
};

export default OnlineTestBasicInfo;
