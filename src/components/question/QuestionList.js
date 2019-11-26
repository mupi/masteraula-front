import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import QuestionCard from './QuestionCard';

const QuestionList = (props) => {
  const {
    questions, count, sm, textResult = 'questões encontradas', showQuantity = true, showLink = true, search,
  } = props;
  return (
    <Row>

      { showQuantity ? (
        <Col sm="12" className="c-question-base__total-results">
          {`${count} ${textResult} `}
          <span className="c-question-base__search-term">{search}</span>
          {' '}
          {showLink ? (
            <a
              className="c-question-base__link-askquestion"
              target="_blank"
              rel="noopener noreferrer"
              href="https://forms.gle/A1T4TPAMbrRA33hJA"
            >
          (Não encontrou o que queria? Clique aqui)
            </a>
          ) : ''}
        </Col>
      ) : ''
      }

      {questions.map(question => (
        <Col sm={sm} lg="3" xs="12" key={`Q${question.id}`} className="question-card">
          <QuestionCard question={question} {...props} />
        </Col>
      ))}
    </Row>
  );
};

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({})),
  count: PropTypes.number,
  sm: PropTypes.string,
};

QuestionList.defaultProps = {
  questions: [],
  count: 0,
  sm: '4',
};

export default QuestionList;
