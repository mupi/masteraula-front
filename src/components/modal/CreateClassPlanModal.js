import React from 'react';
import PropTypes from 'prop-types';
import ClassPlanSelectTypeFormContainer from 'containers/ClassPlanSelectTypeFormContainer';

const CreateClassPlanModal = ({
  title,
  nameAction,
  closeModal,
  submit,
  selectClassPlanType,
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
      <ClassPlanSelectTypeFormContainer
        onSubmit={submit}
        closeModal={closeModal}
        nameAction={nameAction}
        selectClassPlanType={selectClassPlanType}
      />
    </div>
  </div>
);

CreateClassPlanModal.propTypes = {
  closeModal: PropTypes.func,
  submit: PropTypes.func,
};

CreateClassPlanModal.defaultProps = {
  closeModal: f => f,
  submit: f => f,
};

export default CreateClassPlanModal;
