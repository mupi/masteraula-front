import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

const DeleteQuestionButton = ({
  questionId, label, customClass, showDeleteModal,
}) => (
  <Button
    value={questionId}
    title="Apagar questão"
    className={customClass}
    onClick={(() => showDeleteModal(questionId, questionId))}
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
