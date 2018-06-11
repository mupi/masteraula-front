import React  from "react";
import PropTypes from 'prop-types';

const Alternative = ({i, name, styleTag}) =>
    <span key= {i} className={styleTag}>{name}</span>

export default Alternative;
