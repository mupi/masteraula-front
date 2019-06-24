import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const SearchLearningObjectModal = ({
  closeModal, title,
}) => {
  const handleConfirm = () => {
    closeModal();
  };

  return (
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
        <p>
          Use o buscador para pesquisar objetos de aprendizagem a serem adicionados a sua prova.
        </p>

        <div className="modal-footer modal__footer">
          <Button className="btn--confirm" onClick={() => handleConfirm()}>
            Apagar
          </Button>
          <Button color="secondary" onClick={closeModal}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

SearchLearningObjectModal.propTypes = {
  closeModal: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
};

SearchLearningObjectModal.defaultProps = {
  closeModal: f => f,
  title: '',
  message: '',
};

export default SearchLearningObjectModal;
