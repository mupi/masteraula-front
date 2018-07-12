import React from "react";
import Tag from "./Tag"

const TagList = ({list, styleTag}) =>
                  <div>
                  {list && list.map((tag, i) =>
                      <Tag key={i}
                            name={tag}
                            styleTag= {styleTag}
                      />
                  )}
                  </div>
  export default TagList;
