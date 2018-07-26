import React from 'react';
import { Container, Row } from 'reactstrap';
import DisciplineList from 'components/disciplines/DisciplineList'
import QuestionSourceYear from './QuestionSourceYear'

const QuestionHeader = ({
id, disciplines, source, year
}) => (
<Container>
              <Row>
                <DisciplineList list={disciplines} />
              </Row>

              <Row>
                <QuestionSourceYear styleTag="top-label-question source-name" source={source} year={year}/>
              </Row>
              <Row className="title-section-question">
                <h4><i className="fa fa-chevron-circle-right"></i> Questão</h4>
              </Row>
            </Container>
)export default QuestionHeader;
