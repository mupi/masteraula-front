import { connect } from 'react-redux';
import PricingPage from 'pages/Pricing/PricingPage';
import { showModal, hideModal } from 'actions/modalAction';

const mapStateToProps = () => ({
});


const mapDispatchToProps = (dispatch) => {
  const registerModalProps = {
    modalProps: {
      open: true,
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'register2',
  };

  return {
    showRegisterModal: () => dispatch(showModal(registerModalProps)),
  };
};

const PricingPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PricingPage);

export default PricingPageContainer;
