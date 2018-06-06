import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import QuestionView from "./QuestionView.js";


class QuestionPage  extends Component {


  constructor(props) {
    super(props);
  }

  render() {
    return (
            <div className="main-contenedor middle-box animated fadeInDown">
                <div className="contenedor-question">
                    <QuestionView />
                </div>
            </div>
    );
  }
}

export default QuestionPage;
