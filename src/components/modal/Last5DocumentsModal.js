import React from 'react';
import { Button , DropdownItem} from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';



const Last5DocumentsModal = ({
  closeModal, title, message, myLastDocumentsList,
}) => {
    const first5Elements = (myLastDocumentsList) => {
        const myLast5DocumentsList = [];
        let count = 0;
        const countLimit = (myLastDocumentsList.length < 5 ? myLastDocumentsList.length : 5);
      
        while (count < countLimit) {
          myLast5DocumentsList.push(myLastDocumentsList[count]);
          count += 1;
        }
        return myLast5DocumentsList;
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
          {message}
        </p>

         {myLastDocumentsList && first5Elements(myLastDocumentsList.results).map(document => (
                <DropdownItem
                  key={document.id}
                  className="menu-top__dropdown-item"
                  onClick={() => this.editDocument(document)}
                >
                  {document.name}
                </DropdownItem>))}
              <DropdownItem divider />
              <DropdownItem className="menu-top__dropdown-item">
                <Link to="/documents/1" className="menu-top__link-more-documents">
                  Ver mais provas
                </Link>
              </DropdownItem>

        <div className="modal-footer modal__footer">
          <Button color="secondary" onClick={closeModal}>
          Fechar
          </Button>
        </div>
      </div>
    </div>
  );
};

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
