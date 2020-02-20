import React from 'react';
import { Row, Col, CardDeck } from 'reactstrap';
import MyStatisticsCard from './MyStatisticsCard';

const MyDashboardMyStatistics = (props) => {
  const { myStatistics, user } = props;
  const hasLink = user && !user.subscription;
  return (
    myStatistics ? (
      <>
        <Row className="mb-2">
          <Col sm="12">
            <h5>Minhas estatísticas</h5>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col sm="12">
            <CardDeck>
              <MyStatisticsCard
                title="Questões criadas"
                number={myStatistics.questions}
                linkName="Ver minhas questões"
                linkHref="/documents/1"
              />
              <MyStatisticsCard
                title="Provas criadas"
                number={myStatistics.documents}
                linkName="Ver minhas provas"
                linkHref="/documents/1"
              />
              <MyStatisticsCard
                title="Download em docx"
                number={myStatistics.downloads}
                linkName="Seja Premium"
                linkHref="/nossos-planos/"
                hasLink={hasLink}
              />
              <MyStatisticsCard
                title="Planos de aula criados"
                number={myStatistics.plans}
                linkName="Ver meus planos"
                linkHref="/my-classplans/1"
              />
              <MyStatisticsCard
                title="Questões usadas nas provas"
                number={myStatistics.documents_questions}
              />
            </CardDeck>
          </Col>
        </Row>
      </>
    ) : <div />);
};
export default MyDashboardMyStatistics;
