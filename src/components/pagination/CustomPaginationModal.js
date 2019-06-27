import React from 'react';
import PropTypes from 'prop-types';
import {
 Pagination, PaginationItem, PaginationLink, Button,
} from 'reactstrap';

const CustomPaginationItemModal = (props) => {
  const {
    page, label, disabled, currentPageModal, next, previous, setCurrentPageModal,
  } = props;

  return (
    <PaginationItem key={page} active={page === currentPageModal} disabled={disabled}>
      {disabled ? (
        <PaginationLink next={next} previous={previous}>
          {label}
        </PaginationLink>
      ) : (
        <PaginationLink tag={Button} to={`${page}`} next={next} previous={previous} onClick={() => setCurrentPageModal(page)}>
          {label}
        </PaginationLink>
      )}
    </PaginationItem>
  );
};

CustomPaginationItemModal.propTypes = {
  page: PropTypes.number.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  currentPageModal: PropTypes.number,
};

CustomPaginationItemModal.defaultProps = {
  label: '',
  disabled: false,
  currentPageModal: -1,
};


const CustomPaginationModal = (props) => {
  const {
    ariaLabel, currentPageModal, previous, next, count, itensPerPage, disabled, setCurrentPageModal,
  } = props;

  const rows = [];
  for (let page = currentPageModal - 3; page <= currentPageModal + 3; page += 1) {
    if (page > 0 && (page - 1) * itensPerPage < count) {
      rows.push({
        label: page,
        page,
        currentPageModal,
        disabled,
        setCurrentPageModal,
      });
    }
  }

  return (

    <Pagination aria-label={ariaLabel} className="d-flex justify-content-end">
      <CustomPaginationItemModal disabled={!previous || disabled} page={currentPageModal - 1} previous setCurrentPageModal={setCurrentPageModal} />

      {rows.map(CustomPaginationItemModal)}

      <CustomPaginationItemModal disabled={!next || disabled} page={currentPageModal + 1} next setCurrentPageModal={setCurrentPageModal} />

    </Pagination>
  );
};

CustomPaginationModal.propTypes = {
  ariaLabel: PropTypes.string,
  currentPageModal: PropTypes.number,
  previous: PropTypes.string,
  next: PropTypes.string,
  count: PropTypes.number,
  itensPerPage: PropTypes.number.isRequired,
};

CustomPaginationModal.defaultProps = {
  ariaLabel: '',
  currentPageModal: 1,
  previous: null,
  next: null,
  count: 0,
};

export default CustomPaginationModal;
