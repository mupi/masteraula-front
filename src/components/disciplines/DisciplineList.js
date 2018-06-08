import React, { Component } from "react";
import Discipline from "./Discipline"

const DisciplineList = ({list}) =>
              <div className="list-info">
                  {list.map((discipline, i) =>
                      <Discipline key={i}
                            name={discipline.name}
                      />
                  )}
              </div>
  export default DisciplineList;
