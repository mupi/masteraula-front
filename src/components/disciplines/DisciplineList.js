import React from "react";
import Discipline from "./Discipline"

const DisciplineList = ({list}) =>
              <div className="list-info">
                  {list && list.map((discipline, i) =>
                      <Discipline key={i}
                            name={discipline.name}
                      />
                  )}
              </div>
  export default DisciplineList;
