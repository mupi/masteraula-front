import React from 'react';
import PropTypes from 'prop-types';
import CreateLabelForm from 'components/label/CreateLabelForm';


import {
  createMyQuestionLabel,
} from 'actions/labelAction';
import { connect } from 'react-redux';

import { openSidebar } from 'actions/menuAction';
import { hideModal } from 'actions/modalAction';

const CreateMyQuestionLabelModal = ({
  closeModal,
  submit,
}) => (
  <div className="modal-content modal__content">
    <div className="modal-header modal__header">
      <h5
        className="modal-title"
      >
         Criar nova etiqueta
      </h5>
      <button type="button" className="close" aria-label="Close" onClick={closeModal}>
        <span aria-hidden="true">
            &times;
        </span>
      </button>
    </div>
    <div className="modal-basic-operation__body modal-body">
      <CreateLabelForm
        onSubmit={submit}
        closeModal={closeModal}
      />
    </div>
  </div>
);

CreateMyQuestionLabelModal.propTypes = {
  closeModal: PropTypes.func,
  submit: PropTypes.func,
};

CreateMyQuestionLabelModal.defaultProps = {
  closeModal: f => f,
  submit: f => f,
};

const mapDispatchToProps = dispatch => ({
  submit: (values) => {
    dispatch(createMyQuestionLabel(values));
    dispatch(hideModal());
  },
  openSidebar: isOpenSidebar => dispatch(openSidebar(isOpenSidebar)),
});

const mapStateToProps = state => ({
  modal: state.document.modal,
  isOpenSidebar: state.menu.isOpenSidebar,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateMyQuestionLabelModal);
