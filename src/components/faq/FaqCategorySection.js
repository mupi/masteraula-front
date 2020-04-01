
import React from 'react';
import {
  Row, Col,
} from 'reactstrap';
import FaqQuestion from 'components/faq/FaqQuestion';

const FaqCategorySection = (props) => {
  const { faqCategory } = props;
  return (
    <div className="mb-4">
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }} className="mb-2">
          <h5>{faqCategory.name}</h5>
        </Col>
      </Row>
      {faqCategory.category_questions && faqCategory.category_questions.map(faqQuestion => (
        <FaqQuestion faqQuestion={faqQuestion} key={faqQuestion.id} />
      ))}
    </div>
  );
};

export default FaqCategorySection;
