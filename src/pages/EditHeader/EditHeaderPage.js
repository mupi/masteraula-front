import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentHeaderContainer from 'containers/DocumentHeaderContainer';
import { Link } from 'react-router-dom';
import {
  Row, Col, Button,
} from 'reactstrap';
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
    return (
      <HomeUserPage>
        <div>
          <Row>
            <Col sm="12" className="d-flex justify-content-end">
              <div className="p-2">
                <Link className="" to="/new-header">
                  <Button>
                    <FontAwesomeIcon
                      icon="plus"
                      className="btn__icon"
                    />
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
        </div>
        <div className="c-header">
          <DocumentHeaderContainer />
        </div>
        <ToastContainer hideProgressBar position="bottom-right" />
      </HomeUserPage>);
  }
}

EditHeaderPage.propTypes = {
  activeHeader: PropTypes.shape({}),
  // submit: PropTypes.func,
};

EditHeaderPage.defaultProps = {
//  submit: f => f,
};

export default EditHeaderPage;
