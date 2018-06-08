import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';

const QuestionAvatar = (extract)=>  (
          <Col sm="3" className="title-section-question">
              <div>
                <p>
                  {extract}
                </p>
              </div>
          </Col>
  )

export default QuestionAvatar;
