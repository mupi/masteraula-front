import React from 'react';
import PropTypes from 'prop-types';
import CreateLabelForm from 'components/label/CreateLabelForm';

const CreateMyQuestionLabelModal = ({
  title,
  nameAction,
  closeModal,
  submit,
  label = null,
}) => (
  <div className="modal-content modal__content">
    <div className="modal-header modal__header">
      <h5
        className="modal-title"
      >
        {title}
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
        data={label}
        closeModal={closeModal}
        nameAction={nameAction}
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

export default CreateMyQuestionLabelModal;
