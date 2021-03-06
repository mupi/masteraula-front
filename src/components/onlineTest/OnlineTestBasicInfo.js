import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import URLCopy from 'components/onlineTest/URLCopy';
import { formatDate } from 'helpers/question';
import { masteraulaUrl } from 'helpers/config';

const OnlineTestBasicInfo = (props) => {
  const { onlineTest } = props;
  const duration = onlineTest.duration ? `${onlineTest.duration} min` : 'Livre';
  const totalScore = onlineTest.questions_document
    ? onlineTest.questions_document.map(q => q.score).filter(item => item).reduce((a, b) => parseFloat(a) + parseFloat(b), 0) : 0;
  return (
    <Row>
      <Col sm="6">
        <p className="c-online__total-questions-label">
          <strong>{`Total de ${onlineTest.questions_quantity} questões`}</strong>
        </p>
        <p className="c-online__questions-info">
          <span className="c-online__questions-info--label">
            <FontAwesomeIcon
              icon="circle"
              className={`btn__icon c-online__status ${onlineTest.status ? 'c-online__status--active' : 'c-online__status--inactive'}`}
              title={onlineTest.status ? 'Prova Ativa' : 'Prova Inativa'}
            />
            <strong>Estado: </strong>
          </span>
          <span>
            <strong>{onlineTest.status ? 'Prova Ativa' : 'Prova Inativa'}</strong>
          </span>
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
            <strong>Duração prevista para realização: </strong>
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
        <p className="c-online__questions-info">
          <span className="c-online__questions-info--label">
            <FontAwesomeIcon
              className="btn__icon"
              icon="star"
            />
            <strong>Pontuação total: </strong>
          </span>
          <span className="c-online__questions-info--value">
            {`${parseFloat(totalScore).toFixed(2)} pontos`}
          </span>
        </p>
      </Col>
      
      <Col sm="6">
        {!onlineTest.disabled ? (
          <URLCopy url={`${masteraulaUrl}/apply-online/${onlineTest.link}`} />
        ) : ''}
      </Col>
    </Row>
  );
};

export default OnlineTestBasicInfo;
