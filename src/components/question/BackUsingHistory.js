import React from 'react';
import { history } from 'helpers/history';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BackUsingHistory = ( location ) => {
    console.log("en back: ");
    console.log(location);
    console.log(history.goBack);
    console.log("history..");
  return (
    location
      ? (
        <Button onClick={history.goBack} className="mr-auto btn btn-secondary c-question__btn-back">
          <FontAwesomeIcon icon="arrow-circle-left" className="btn__icon" />
          {' '}
          Voltar History
        </Button>
      ) : (
        <Button onClick={() => history.push('/question-base/1')} className="mr-auto btn btn-secondary c-question__btn-back">
          <FontAwesomeIcon icon="arrow-circle-left" className="btn__icon" />
          {' '}
          Voltar Banco
        </Button>
      )
  );
};

export default BackUsingHistory;
