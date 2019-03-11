import { connect } from 'react-redux';
import PricingPage from 'pages/Pricing/PricingPage';
import { showModal, hideModal } from 'actions/modalAction';
import { SubmissionError } from 'redux-form';
import { fetchRegister } from 'actions/registerAction';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
  submit: (values) => {
    if (!values.accept_terms) {
      throw new SubmissionError({
        _error: 'Você deve concordar com os Termos de Uso para usar o MasterAula ',
      });
    }

    return dispatch(fetchRegister(values.email, values.password, values.name));
  },
});

const PricingPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PricingPage);

export default PricingPageContainer;
