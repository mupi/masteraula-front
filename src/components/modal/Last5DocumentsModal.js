import React from 'react';
import { Button, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { first5Elements } from 'helpers/document';

const Last5DocumentsModal = ({
  closeModal, title, message, myLastDocumentsList, switchActiveDocument,
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
      <p>
        {message}
      </p>
      <Table>
        <thead>
          <tr>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {myLastDocumentsList && first5Elements(myLastDocumentsList.results).map(document => (
            <tr
              className="menu-top__dropdown-item"
              key={document.id}
            >
              <td
                role="gridcell"
                onClick={() => { switchActiveDocument(document); closeModal(); }}
              >
                {document.name}
              </td>
            </tr>))}
        </tbody>
      </Table>
      <p>
        <Link to="/documents/1" className="modal-last5-document__link-more-documents" onClick={() => { closeModal(); }}>
          Ver mais provas
        </Link>
      </p>
      <div className="modal-footer modal__footer">
        <Button color="secondary" onClick={closeModal}>
          Fechar
        </Button>
      </div>
    </div>
  </div>
);

Last5DocumentsModal.propTypes = {
  closeModal: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
};

Last5DocumentsModal.defaultProps = {
  closeModal: f => f,
  title: '',
  message: '',
};

export default Last5DocumentsModal;
