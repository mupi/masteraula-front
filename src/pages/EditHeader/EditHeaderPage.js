import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentHeaderContainer from 'containers/DocumentHeaderContainer';
import {
  Row, Col, Button,
} from 'reactstrap';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class EditHeaderPage extends Component {
  componentDidMount() {
    const { fetchHeader, resetNewHeader, match } = this.props;
    if (match.params.id) {
      fetchHeader(match.params.id);
    } else {
      resetNewHeader();
    }
  } 
 
  render() {
    const {
      activeHeader, createHeader, updateHeader,
    } = this.props;
    const submit = (activeHeader ? updateHeader : createHeader);

    return (
      <HomeUserPage>
        <ToastContainer hideProgressBar position="bottom-right" />
        <div className="c-edit-header__options">
          <Row className="c-headers-options">
            <Col sm="12" className="d-flex justify-content-end">
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
        </div>
        <div className="c-header">
          <Row>
            <Col sm="12">
              <h4>Dados do cabeçalho</h4>
            </Col>
          </Row>
          <DocumentHeaderContainer onSubmit={submit} data={activeHeader} />
        </div>
        <ToastContainer hideProgressBar position="bottom-right" />
      </HomeUserPage>);
  }
}

EditHeaderPage.propTypes = {
  activeHeader: PropTypes.shape({}),
  createHeader: PropTypes.func,
  updateHeader: PropTypes.func,

};

EditHeaderPage.defaultProps = {
  createHeader: f => f,
  updateHeader: f => f,
};

export default EditHeaderPage;
