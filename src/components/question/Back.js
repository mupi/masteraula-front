import React from 'react';
import { Link } from 'react-router-dom';
import { withLastLocation } from 'react-router-last-location';
import { history } from 'helpers/history';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Back = ({ lastLocation }) => {
  return (
    lastLocation && !lastLocation.pathname.includes('edit-question')
      ? (
        <Link className="mr-auto btn btn-secondary c-question__btn-back btn__icon" to={lastLocation || '/'}>
          {' '}
          <FontAwesomeIcon icon="arrow-circle-left" className="btn__icon" />
          {' '}
          Voltar
        </Link>
      ) : (
        <Button onClick={() => history.replace('/question-base/1')} className="mr-auto btn btn-secondary c-question__btn-back">
          <FontAwesomeIcon icon="arrow-circle-left" className="btn__icon" />
          {' '}
          Voltar
        </Button>
      )
  );
};

export default withLastLocation(Back);
