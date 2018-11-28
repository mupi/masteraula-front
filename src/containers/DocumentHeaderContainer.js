import { connect } from 'react-redux';
import DocumentHeader from 'components/document/DocumentHeader';
import { reduxForm } from 'redux-form';

import { showModal, hideModal } from 'actions/modalAction';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Digite um nome para o novo cabeçalho';
  } else {
    const trueName = values.name.trim();
    if (trueName.length < 3) {
      errors.name = 'Seu nome precisa ter no mínimo 3 caracteres válidos.';
    }
  }

  return errors;
};

// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  activeHeader: state.header.activeHeader,
  isUpdated: state.header.isUpdated,
  error: state.header.error,
});

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
});

const DocumentHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'header_form',
  validate,
  asyncBlurFields: [],
})(DocumentHeader));

export default DocumentHeaderContainer;
