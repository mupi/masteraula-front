import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import ModalRoot from './ModalRoot';

import LoginModal from 'components/login/LoginModal';
import RegisterModal from 'components/userregister/RegisterModal';
import TermsUsePage from 'pages/TermsUse/TermsUsePage';
import VerifyRegisterPageContainer from 'pages/UserRegister/VerifyRegisterPageContainer';
import HomePage from 'pages/Home/HomePage';

import {
  ViewDocumentPageContainer,
  ForgotPasswordPageContainer,
  UserProfilePageContainer,
  RedefinePasswordPageContainer,
  QuestionPageContainer,
  QuestionBasePageContainer,
  EditDocumentPageContainer,
}
  from 'containers';
import { showModal, hideModal } from 'actions/modalAction';


import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';

import Menu from 'components/menu/Menu';
import { history } from 'helpers/history';

import Footer from 'components/footer/Footer';
// CSS imported in a single place (here)
import 'assets/scss/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.closeModal = this.closeModal.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.openAlertModal = this.openAlertModal.bind(this);
    this.openConfirmModal = this.openConfirmModal.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.openPromptModal = this.openPromptModal.bind(this);
    this.showInput = this.showInput.bind(this);
  }

  closeModal(event) {
    this.props.hideModal();
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  showInput(event) {
    console.log(this.state);
  }

  openAlertModal(event) {
    this.props.showModal({
      open: true,
      title: 'Alert Modal',
      message: 'Alert modal masteraula',
      closeModal: this.closeModal
    }, 'alert')
  }

  openConfirmModal(event) {
    this.props.showModal({
      open: true,
      title: 'Confirm Modal',
      message: 'Confirm modal masteraula',
      confirmAction: this.closeModal,
      closeModal: this.closeModal
    }, 'confirm')
  }

  openDeleteModal(event) {
    this.props.showModal({
      open: true,
      title: 'Delete Modal',
      message: 'Delete modal masteraula',
      deleteAction: this.closeModal,
      closeModal: this.closeModal,
    }, 'delete')
  }

  openPromptModal(event) {
    this.props.showModal({
      open: true,
      title: 'Prompt Modal',
      fields: [{
        label: 'Address name',
        name: 'addressName',
        placeholder: 'Enter address name',
      }],
      onInputChange: this.onInputChange,
      confirmAction: this.showInput
    }, 'prompt')
  }

  render() {
    const { isOpenSidebar, isLoggedIn } = this.props;

    return (
      <ConnectedRouter history={history}>
        <div id="main-masteraula-container" className={isOpenSidebar ? 'container-open' : ''}>
          <Menu />
          {isLoggedIn
            ? (
              <Switch>
                <Route path="/question-base/:page(\d+)" component={QuestionBasePageContainer} />
                <Route path="/view-question/:id" component={QuestionPageContainer} />
                <Route path="/user-profile" component={UserProfilePageContainer} />
                <Route path="/documents/:page(\d+)" component={ViewDocumentPageContainer} />
                <Route path="/edit-document" component={EditDocumentPageContainer} />
                <Route component={NotFoundPage} />
              </Switch>
            )
            : (
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={LoginModal} />
                <Route path="/register" component={RegisterModal} />
                <Route path="/esqueci-senha" component={ForgotPasswordPageContainer} />
                <Route path="/redefine-senha/:uid/:token" component={RedefinePasswordPageContainer} />
                <Route path="/terms-use" component={TermsUsePage} />
                <Route path="/verify-userregister/:key" component={VerifyRegisterPageContainer} />
                <Route component={NotFoundPage} />
              </Switch>
            )
          }
          <div className="container">
            <div className="modal-types row d-flex justify-content-center align-items-center">
              <div className="col">
                <button type="button"
                  className="btn btn-outline-primary btn-block"
                  onClick={this.openAlertModal}
                >alert</button>
              </div>
              <div className="col">
                <button
                  className="btn btn-outline-primary btn-block"
                  onClick={this.openConfirmModal}
                >confirm</button>
              </div>
              <div className="col">
                <button
                  className="btn btn-outline-primary btn-block"
                  onClick={this.openDeleteModal}
                >delete</button>
              </div>
              <div className="col">
                <button
                  className="btn btn-outline-primary btn-block"
                  onClick={this.openPromptModal}
                >prompt</button>
              </div>
            </div>
          </div>
            <ModalRoot />

          <Footer year="2018" version="1.0" />
        </div>
      </ConnectedRouter>
    );
  }
}

App.propTypes = {
  isOpenSidebar: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
};

App.defaultProps = {
  isOpenSidebar: false,
  isLoggedIn: false,
};

const mapStateToProps = state => ({
  isOpenSidebar: state.menu.isOpenSidebar,
  isLoggedIn: state.session.session,
});

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }))
  }
})

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default connectedApp;
