import React  from "react";
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';

const Tag = ({i, name, styleTag}) =>
    <span id={i} key= {i} className={styleTag}>{name}</span>

export default Tag;
