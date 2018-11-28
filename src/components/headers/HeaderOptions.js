import React from 'react';
import { Link } from 'react-router-dom';
import {
  Row, Col, Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { history } from 'helpers/history';

const createNewHeader = (resetNewHeader) => {
  history.replace('/new-header');
  resetNewHeader();
};

const HeaderOptions = ({ resetNewHeader }) => (
  <Row className="c-headers-options">
    <Col sm="12" className="d-flex justify-content-end">
      <div className="p-2">
        <Link className="" to="/new-header">
          <Button onClick={() => createNewHeader(resetNewHeader)}>
            <FontAwesomeIcon icon="plus" className="btn__icon" />
            Criar novo
          </Button>
        </Link>
      </div>
      <div className="p-2">
        <Link className="" to="/my-headers/1">
          <Button>
            <FontAwesomeIcon icon="eye" className="btn__icon" />
            <span className="button-text">
                Ver cabeçalhos
            </span>
          </Button>
        </Link>
      </div>
    </Col>
  </Row>
);

export default HeaderOptions;
