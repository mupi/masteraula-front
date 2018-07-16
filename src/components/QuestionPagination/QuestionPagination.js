import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Link, Route } from 'react-router-dom'
import PropTypes from 'prop-types'



const QuestionPagination = ({ currentPage, previous, next, count, itens_per_page}) =>{

  const QuestionPaginationItem = params => {
    const { page, label, disabled } = params

    return(
      <PaginationItem {...params} active={ page == currentPage }>
        { disabled && 
          <PaginationLink {...params} >{ label }</PaginationLink>
        }
        { !disabled && 
          <Link to={`${page}`} style={{ textDecoration: 'none' }}>
            <PaginationLink {...params} >
              { label }
            </PaginationLink>
          </Link> 
        }
      </PaginationItem>
    )
  }

  var rows = [];
  for (var page = currentPage - 3; page <= currentPage + 3; ++page){
    if (page > 0 && (page - 1) * itens_per_page < count){
      rows.push({label : page, page : page})
    }
  }

    return (
      
      <Pagination aria-label="Question Base navigation">
        <QuestionPaginationItem disabled={!previous} page={currentPage - 1} previous />

        {rows.map(QuestionPaginationItem)}

        <QuestionPaginationItem disabled={!next} page={currentPage + 1} next />

      </Pagination>
    );
}

QuestionPagination.propTypes = {
  currentPage: PropTypes.number,
  itens_per_page: PropTypes.number,
}

QuestionPagination.defaultProps = {
  currentPage: 1,
  itens_per_page: 8
}

export default QuestionPagination;
