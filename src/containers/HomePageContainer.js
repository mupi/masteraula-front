import { connect } from 'react-redux';
import HomePage from 'pages/Home/HomePage';
import { showModal, hideModal } from 'actions/modalAction';

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
});

const HomePageContainer = connect(
  null,
  mapDispatchToProps,
)(HomePage);

export default HomePageContainer;
