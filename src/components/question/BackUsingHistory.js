import React from 'react';
import { history } from 'helpers/history';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BackUsingHistory = () => {
  return (
    history && history.length > 2
      ? (
        <Button onClick={history.goBack} className="mr-auto btn btn-secondary c-question__btn-back">
          <FontAwesomeIcon icon="arrow-circle-left" className="btn__icon" />
          {' '}
        Voltar
        </Button>
      ) : (
        <Button onClick={() => history.push('/question-base/1')} className="mr-auto btn btn-secondary c-question__btn-back">
          <FontAwesomeIcon icon="arrow-circle-left" className="btn__icon" />
          {' '}
        Voltar
        </Button>
      )
  );
};
export default BackUsingHistory;
