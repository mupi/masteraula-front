import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CustomPaginationItem = (props) => {
  const {
    page, label, disabled, currentPage,
  } = props;

  return (
    <PaginationItem key={page} {...props} active={page === currentPage} next="true" previous="true">
      { disabled ? (
        <PaginationLink {...props}>
          { label }
        </PaginationLink>
      ) : (
        <PaginationLink tag={Link} to={`${page}`} {...props}>
          { label }
        </PaginationLink>
      )}
    </PaginationItem>
  );
};

CustomPaginationItem.propTypes = {
  page: PropTypes.number,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  currentPage: PropTypes.number,
};

CustomPaginationItem.defaultProps = {
  page: -1,
  label: '',
  disabled: true,
  currentPage: -1,
};


const CustomPagination = (props) => {
  const {
    ariaLabel, currentPage, previous, next, count, itensPerPage,
  } = props;

  const rows = [];
  for (let page = currentPage - 3; page <= currentPage + 3; page += 1) {
    if (page > 0 && (page - 1) * itensPerPage < count) {
      rows.push({ label: page, page, currentPage });
    }
  }

  return (

    <Pagination aria-label={ariaLabel}>
      <CustomPaginationItem disabled={!previous} page={currentPage - 1} previous />

      {rows.map(CustomPaginationItem)}

      <CustomPaginationItem disabled={!next} page={currentPage + 1} next />

    </Pagination>
  );
};

CustomPagination.propTypes = {
  ariaLabel: PropTypes.string,
  currentPage: PropTypes.number,
  previous: PropTypes.bool,
  next: PropTypes.bool,
  count: PropTypes.number,
  itensPerPage: PropTypes.number,
};

CustomPagination.defaultProps = {
  ariaLabel: '',
  currentPage: 1,
  previous: false,
  next: false,
  count: 0,
  itensPerPage: 8,
};

export default CustomPagination;
