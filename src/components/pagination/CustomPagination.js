import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const CustomPaginationItem = (props) => {
  const {
    page, label, disabled, currentPage, next, previous,
  } = props;

  return (
    <PaginationItem key={page} active={page === currentPage} disabled={disabled}>
      {disabled ? (
        <PaginationLink next={next} previous={previous}>
          {label}
        </PaginationLink>
      ) : (
        <PaginationLink tag={Link} to={`${page}`} next={next} previous={previous}>
          {label}
        </PaginationLink>
      )}
    </PaginationItem>
  );
};

CustomPaginationItem.propTypes = {
  page: PropTypes.number.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  currentPage: PropTypes.number,
};

CustomPaginationItem.defaultProps = {
  label: '',
  disabled: false,
  currentPage: -1,
};


const CustomPagination = (props) => {
  const {
    ariaLabel, currentPage, previous, next, count, itensPerPage, disabled,
  } = props;

  const rows = [];
  for (let page = currentPage - 3; page <= currentPage + 3; page += 1) {
    if (page > 0 && (page - 1) * itensPerPage < count) {
      rows.push({
        label: page,
        page,
        currentPage,
        disabled,
      });
    }
  }

  return (

    <Pagination aria-label={ariaLabel} className="d-flex justify-content-end">
      <CustomPaginationItem disabled={!previous || disabled} page={currentPage - 1} previous />

      {rows.map(CustomPaginationItem)}

      <CustomPaginationItem disabled={!next || disabled} page={currentPage + 1} next />

    </Pagination>
  );
};

CustomPagination.propTypes = {
  ariaLabel: PropTypes.string,
  currentPage: PropTypes.number,
  previous: PropTypes.string,
  next: PropTypes.string,
  count: PropTypes.number,
  itensPerPage: PropTypes.number.isRequired,
};

CustomPagination.defaultProps = {
  ariaLabel: '',
  currentPage: 1,
  previous: null,
  next: null,
  count: 0,
};

export default CustomPagination;
