import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

const handleDeleteQuestionButton = (e) => {
  e.preventDefault();
};

const DeleteQuestionButton = ({
  questionId, label, customClass,
}) => (
  <Button
    value={questionId}
    title="Apagar questão"
    className={customClass}
    onClick={(e => handleDeleteQuestionButton(e, questionId))}
  >
    {label}
  </Button>
);

DeleteQuestionButton.propTypes = {
  questionId: PropTypes.number,
};

DeleteQuestionButton.defaultProps = {
  questionId: 0,
};
export default DeleteQuestionButton;
