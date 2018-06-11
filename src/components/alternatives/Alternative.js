import React  from "react";
import PropTypes from 'prop-types';

const Alternative = ({i, text}) =>
    <p key= {i} className="text-alternative">{text}</p>

export default Alternative;
