import React from 'react';
import { Row, Col } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import QuestionCard from './QuestionCard'

const QuestionList = ({questions})=>  (
    <Row>
        {questions.map((question, i) =>
          <Col sm="4" xs="12" key={i}>
            <QuestionCard key={i} disciplines={question.disciplines} source={question.source}
                          year={question.year} extract={question.extract}
                          urlImage={question.image}
            />
          </Col>
        )}
  </Row>
  )

export default QuestionList
