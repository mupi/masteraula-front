import React  from "react";

const Tag = ({i, name, styleTag}) =>
    <span id={i} className={styleTag}>{name.text}</span>

export default Tag;
