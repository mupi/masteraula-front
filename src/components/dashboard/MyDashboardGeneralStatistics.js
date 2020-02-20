import React from 'react';
import { Row, Col, CardDeck } from 'reactstrap';
import MyStatisticsCard from './MyStatisticsCard';
import MyDashboardBarChartTopics from './MyDashboardBarChartTopics';

const MyDashboardGeneralStatistics = (props) => {
  const { generalStatistics } = props;
  return (
    generalStatistics ? (
      <>
        <Row className="mb-2">
          <Col sm="12">
            <h5>Recursos disponíveis para o professor</h5>
          </Col>
        </Row>
        <Row className="mb-4 align-items-center">
          <Col sm="8">
            <CardDeck>
              <MyStatisticsCard
                title="Banco de questões"
                number={generalStatistics.total_questions}
                linkName="Acessar ao banco"
                linkHref="/documents/1"
              />
              <MyStatisticsCard
                title="Banco de objetos"
                number={generalStatistics.total_objects}
                linkName="Acessar ao banco"
                linkHref="/documents/1"
              />
              <MyStatisticsCard
                title="Tópicos e Assuntos"
                number={generalStatistics.total_topics}
                linkName="Acessar ao banco"
                linkHref="/topic-base/1"
              />
            </CardDeck>
          </Col>
          <Col sm="4">
            <h6 className="text-center">Questões por tópicos</h6>
            <MyDashboardBarChartTopics topics={generalStatistics.topics_questions} />
          </Col>
        </Row>
      </>
    ) : <div />);
};
export default MyDashboardGeneralStatistics;
