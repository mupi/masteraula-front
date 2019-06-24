import React from 'react';
import { Button, Row, Alert } from 'reactstrap';
import PropTypes from 'prop-types';

import CustomPagination from 'components/pagination/CustomPagination';
import SimpleLObjectSearchFormContainer from 'containers/SimpleLObjectSearchFormContainer';
import SimpleLObjectCardList from 'components/learningObject/SimpleLObjectCardList';


  class SearchLearningObjectModal extends React.Component {
    componentDidMount() {
      const {
        match, listObjects, filterObject,
      } = this.props;
      listObjects(parseInt(1, 10), filterObject);
    }
  
    componentDidUpdate(prevProps) {
      const {
        match, listObjects,
      } = this.props;
      
    }

   
  
    render() {
      const {
        objectPage, isFetching, error, closeModal, title,
      } = this.props;
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

        <div className="c-object-base">
          <SimpleLObjectSearchFormContainer />
          <Row className="pagination-questions" style={{ marginLeft: '80%' }}>
            <CustomPagination {...this.props} {...objectPage} itensPerPage={16} disabled={isFetching} />
          </Row>
          <div className="c-question-base__results">
            { isFetching ? (
              <Alert className="c-question-base__alert--warning" color="warning" fade={false}>
                   Carregando ...
              </Alert>
            ) : (
              <SimpleLObjectCardList
                sm="4"
                {...this.props}
                objects={objectPage ? objectPage.results : null}
                count={objectPage ? objectPage.count : 0}
              />
            )
            }
          </div>
          <Row className="pagination-questions" style={{ marginLeft: '80%' }}>
            <CustomPagination {...this.props} {...objectPage} itensPerPage={16} disabled={isFetching} />
          </Row>
        </div>

        <div className="modal-footer modal__footer">
          <Button color="secondary" onClick={closeModal}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
}

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
