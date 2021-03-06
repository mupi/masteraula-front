import React from 'react';
import {
  Row, Col, Badge, Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import URLCopy from 'components/onlineTest/URLCopy';
import { masteraulaUrl, maxPublicLinksFreePlan } from 'helpers/config';
import { Link } from 'react-router-dom';


/* eslint-disable react/no-danger */
const ClassPlanBasicInfo = ({
  classPlan, generatePublicLink, publicLink, showAlertModal, quantityUsedPublicLinks, isPremium, isOwner,
}) => {
  const hasTeachingYears = classPlan && classPlan.teaching_years && classPlan.teaching_years.length > 0;
  const hasTags = classPlan && classPlan.tags && classPlan.tags.length > 0;
  const hasBncc = classPlan && classPlan.bncc && classPlan.bncc.length > 0;
  const hasDuration = classPlan && classPlan.duration;
  const freePlanLimitString = `Você atingiu seu limite máximo de ${maxPublicLinksFreePlan} links para planos de aula públicos. Atualize seu plano gratuito para Premium`;
  const componentMessage = closeModal => (
    <p>
      {freePlanLimitString}
      { }
      <Link
        className="c-sidebar__user-dropdown-item"
        to="/nossos-planos"
        title="Nossos planos"
        onClick={() => closeModal()}
      >
        <span>
          {' '}
          aqui
        </span>
      </Link>
    </p>
  );

  const handleClick = () => {
    if (!isPremium && quantityUsedPublicLinks === maxPublicLinksFreePlan) {
      showAlertModal(componentMessage);
    } else {
      generatePublicLink(classPlan.id);
    }
  };
  return (
    <>
      <Row className="c-question__tittle-section">
        <Col>
          <h5>
            <FontAwesomeIcon icon="info-circle" />
            {' '}
            Informações básicas
          </h5>
          <div className="border-top my-3" />

        </Col>
      </Row>
      <Row>
        {!classPlan.disabled && isOwner ? (
          <Col sm="6" className="offset-md-6 text-right">
            {(publicLink.length === 0) ? (
              <Button color="success" onClick={() => handleClick()}>
                <FontAwesomeIcon icon="link" />
                {' '}
                Gerar link
              </Button>
            )
              : <URLCopy url={`${masteraulaUrl}/view-public-classplan/${publicLink}`} />
          }
          </Col>
        ) : ''}
      </Row>
      <Row className="c-classplan__row-info">
        <Col className="info-label" sm="4" xs="4">
                    Nome
        </Col>
        <Col sm="8" xs="8">
          {classPlan.name}
        </Col>
      </Row>
      <Row className="c-classplan__row-info">
        <Col className="info-label" sm="4" xs="4">
                    Disciplinas
        </Col>
        <Col sm="8" xs="8" className="c-classplan__disciplines">
          {classPlan.disciplines.map(discipline => <Badge key={`${discipline.id}-${discipline.name}`} color="success" pill>{discipline.name.trim()}</Badge>)}
        </Col>
      </Row>
      <Row className="c-classplan__row-info">
        <Col className="info-label" sm="4" xs="4">
                      Tópicos
        </Col>
        <Col sm="8" xs="8" className="c-classplan__topics">
          {classPlan.topics.map(topic => <Badge key={`${topic.id}-${topic.name}`} color="success" pill>{topic.name.trim()}</Badge>)}
        </Col>
      </Row>
      {hasTags && (
        <Row className="c-classplan__row-info">
          <Col className="info-label" sm="4" xs="4">
                      Tags
          </Col>
          <Col sm="8" xs="8" className="c-classplan__topics">
            {classPlan.tags.map(tag => <Badge key={`${tag.id}-${tag.name}`} color="success" pill>{tag.name.trim()}</Badge>)}
          </Col>
        </Row>
      )}
      {hasBncc && (
        <Row className="c-classplan__row-info">
          <Col className="info-label" sm="4" xs="4">
                        BNCC
          </Col>
          <Col sm="8" xs="8" className="c-classplan__topics">
            {classPlan.bncc.map(bncc => <Badge key={`${bncc.id}-${bncc.name}`} color="success" pill>{bncc.name.trim()}</Badge>)}
          </Col>
        </Row>
      )}
      <Row className="c-classplan__row-info">
        <Col className="info-label" sm="4" xs="4">
                    Nível de Ensino
        </Col>
        <Col sm="8" xs="8" className="c-classplan__topics">
          {classPlan.teaching_levels.map(level => <Badge key={`${level.id}-${level.name}`} color="success" pill>{level.name.trim()}</Badge>)}
        </Col>
      </Row>
      {hasTeachingYears && (
        <Row className="c-classplan__row-info">
          <Col className="info-label" sm="4" xs="4">
                      Ano
          </Col>
          <Col sm="8" xs="8" className="c-classplan__topics">
            {classPlan.teaching_years.map(teachingYear => <Badge key={`${teachingYear.id}-${teachingYear.name}`} color="success" pill>{teachingYear.name.trim()}</Badge>)}
          </Col>
        </Row>
      )}
      {hasDuration && (
        <Row className="c-classplan__row-info">
          <Col className="info-label" sm="4" xs="4">
                      Duração da aula
          </Col>
          <Col sm="2" xs="6">
            {`${classPlan.duration} min`}
          </Col>
        </Row>
      )}
      <Row className="c-classplan__row-info">
        <Col className="info-label" sm="4" xs="4">
                   Autoria
        </Col>
        <Col sm="8" xs="8">
          {classPlan.owner.anonymous === true && classPlan.owner.nickname !== null ? ( 
            classPlan.owner.nickname
          ) : classPlan.owner.name}
        </Col>
      </Row>
    </>
  );
};
export default ClassPlanBasicInfo;
