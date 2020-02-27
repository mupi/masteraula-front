import React from 'react';
import { Row, Col, CardDeck } from 'reactstrap';
import MyStatisticsCard from './MyStatisticsCard';

const MyDashboardMyStatistics = (props) => {
  const {
    myStatistics, user, addMyQuestionsFilter, quantityDocxDownloaded,
  } = props;
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
                linkHref="/question-base/1"
                addMyQuestionsFilter={addMyQuestionsFilter}
                author={user.id}
              />
              <MyStatisticsCard
                title="Provas criadas"
                number={myStatistics.documents}
                linkName="Ver minhas provas"
                linkHref="/documents/1"
              />
              <MyStatisticsCard
                title="Download em docx"
                number={quantityDocxDownloaded}
                linkName="Seja Premium"
                linkHref="/nossos-planos/"
                userTypeSection
                hasLink={false}
                isPremium={user && user.subscription}
              />
              <MyStatisticsCard
                title="Planos de aula criados"
                number={myStatistics.plans}
                linkName="Ver meus planos"
                linkHref="/class-plans/1"
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
