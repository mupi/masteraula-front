import React  from "react";
import PropTypes from 'prop-types';

const Descriptor = ({i, name, styleTag}) =>
      <span id={i} key= {i} className={styleTag}>{name}</span>

export default Descriptor;
