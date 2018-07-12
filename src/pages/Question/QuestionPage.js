import HomeUserPage from "../HomeUser/HomeUserPage"
import QuestionHeader from "components/question/QuestionHeader.js";
import QuestionContent from "components/question/QuestionContent.js";
import QuestionInfo from "components/question/QuestionInfo.js";
import RelatedQuestions from "components/question/RelatedQuestions";
import QuestionComments from "components/question/QuestionComments.js";
import React, { Component, PropTypes } from 'react';

import 'font-awesome/css/font-awesome.min.css';
import 'assets/css/Question.css';


class QuestionPage extends Component {
  componentDidMount() {
    this.props.fetchQuestion(this.props.match.params.id);
  }

  render(){
    const { activeQuestion, rating, error } = this.props

    if(error) {
      return  (
        <HomeUserPage>
          <div className="alert alert-danger">{error.message}</div>
        </HomeUserPage>
      )
    }


    return (
            <HomeUserPage>
              <div className="contenedor-question">
                  <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xs-12">
                    <QuestionHeader disciplines={activeQuestion.disciplines} source={activeQuestion.source} year={activeQuestion.year} />
                    <QuestionContent alternatives={activeQuestion.alternatives} statement={activeQuestion.statement} answer={activeQuestion.resolution}/>
                    <QuestionInfo {...activeQuestion}
                                />
                    <QuestionComments />
                  </div>
                </div>
              </div>
              <div className="btn-float">
                      <button type="button" className="btn btn-default btn-circle btn-xl btn-lateral"><i className="fa fa-plus"></i></button>
              </div>

            </HomeUserPage>
          );
        }
}
export default QuestionPage;
