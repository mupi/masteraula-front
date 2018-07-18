import React from "react";
import Descriptor from "./Descriptor"

const DescriptorList = ({list, styleTag}) =>
                  <div className="descriptor-list">
                  {list && list.map((descriptor, i) =>
                      <Descriptor key={i}
                            name={descriptor.name}
                            styleTag= {styleTag}
                      />
                  )}
                  </div>
  export default DescriptorList;
