import { connect } from 'react-redux';
import PricingPage from 'pages/Pricing/PricingPage';
import { showModal, hideModal } from 'actions/modalAction';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
});

const PricingPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PricingPage);

export default PricingPageContainer;
