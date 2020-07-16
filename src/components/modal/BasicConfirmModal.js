import React from 'react';
import { Button } from 'reactstrap';

/*
  ConfirmModal for actions
*/
const BasicConfirmModal = ({
  closeModal, confirmAction, title, typeMessage,
}) => {
  const handleConfirm = () => {
    confirmAction();
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
        { typeMessage === 'confirm-add-object' && (
          <>
            <p>Antes de adicionar um objeto, confirme se:</p>
            <ul>
              <li>Esse objeto realmente não existe em nosso banco.</li>
              <li>
                Você está em dia com a leitura dos nossos
                {' '}
                <a href="/terms-use">termos de uso e política de privacidade</a>
              </li>
            </ul>
            <p>Deseja continuar com a adição do novo objeto?</p>
          </>
        )}
        <div className="modal-footer modal__footer">
          <Button className="btn--confirm" onClick={() => handleConfirm()}>
            Sim
          </Button>
          <Button color="secondary" onClick={closeModal}>
            Não
          </Button>
        </div>
      </div>
    </div>
  );
};
export default BasicConfirmModal;
