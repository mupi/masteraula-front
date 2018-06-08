import React, { Component } from "react";
import PropTypes from 'prop-types';

const Discipline = ({i, name}) =>
    <span key= {i} className="label-info discipline-name">{name}</span>

export default Discipline;
