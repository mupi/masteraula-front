import React  from 'react';
import { Container, Row } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import DisciplineList from "components/disciplines/DisciplineList"


const QuestionHeader = ({ disciplines, source, year})  =>
            <Container>
              <Row>
                    <DisciplineList list={disciplines} />
              </Row>

              <Row>
                <span className="top-label-question source-name">{source} {year}</span>
              </Row>
              <Row className="title-section-question">
                <h4><i className="fa fa-question-circle"></i> Questão</h4>
              </Row>
            </Container>


export default QuestionHeader;
