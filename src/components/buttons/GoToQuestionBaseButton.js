import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GoToQuestionBaseButton = ({ customClass, nameButton}) => (
  <Link to="/question-base/1">
    <Button
      title="Adicionar questões"
      className={customClass}
    >
      <FontAwesomeIcon
          icon="plus"
        />
      {' '}
      {nameButton}
    </Button>
  </Link>


);
export default GoToQuestionBaseButton;
