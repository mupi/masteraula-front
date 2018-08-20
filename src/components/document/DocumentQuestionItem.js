import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col,
} from 'reactstrap';
import RemoveQuestionButton from 'components/buttons/RemoveQuestionButton';

const DocumentQuestionItem = (props) => {
  const { question, activeDocument, removeSelectedQuestion } = props;

  return (
    <div className="c-document__question">
      <RemoveQuestionButton
        questionId="1"
        activeDocumentId={activeDocument.id}
        removeSelectedQuestion={removeSelectedQuestion}
      />
      <Row>
        <Col sm="3">
          <img className="c-question__img" src="https://www.asomadetodosafetos.com/content/uploads/2016/05/Tirinha-Mafalda5.jpg" alt="objeto-aprendizagem" />
        </Col>
        <Col sm="9">
            Evitar o desperdício de água e energia é essencial para garantir a sustentabilidade do planeta Terra. Educar a criança para que evite o desperdício de ...
        </Col>
      </Row>
    </div>
  );
};

DocumentQuestionItem.propTypes = {
  removeSelectedQuestion: PropTypes.func,
};

DocumentQuestionItem.defaultProps = {
  removeSelectedQuestion: f => f,
};

export default DocumentQuestionItem;
