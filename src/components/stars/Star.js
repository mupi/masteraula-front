import React from 'react'
import PropTypes from 'prop-types'

const Star = ({ selected=false, onClick=f=>f }) =>
    <div className={(selected) ? "stars__item stars__item--selected" : "stars__item"}
         onClick={onClick}>
    </div>

Star.propTypes = {
    selected: PropTypes.bool,
    onClick: PropTypes.func
}

export default Star
