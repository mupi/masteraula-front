import React, { Component } from 'react';
import QuestionContent from "./question/QuestionContent.js";
import QuestionHeader from "./question/QuestionHeader.js";
import QuestionInfo from "./question/QuestionInfo.js";
import RelatedQuestions from "./question/RelatedQuestions";
import QuestionComments from "./question/QuestionComments.js";
import 'font-awesome/css/font-awesome.min.css';
import '../css/Question.css';


class QuestionPage  extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
            <div className="main-contenedor middle-box animated fadeInDown">
                <div className="contenedor-question">
                    <div className="row justify-content-center">
                      <div className="col-sm-5 col-md-5 col-lg-6 col-xs-12">
                      <QuestionHeader />
                      <QuestionContent />
                      <QuestionInfo />
                      <RelatedQuestions />
                      <QuestionComments />
                    </div>
                  </div>
                </div>
                <div className="btn-float">
                        <button type="button" className="btn btn-default btn-circle btn-xl btn-lateral"><i className="fa fa-plus"></i></button>
                </div>
            </div>
    );
  }
}

export default QuestionPage;
