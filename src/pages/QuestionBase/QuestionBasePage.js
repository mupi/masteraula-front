import React from 'react';
import { Row, Input, InputGroup, InputGroupAddon, Button, Alert} from 'reactstrap';
import HomeUserPage from "../HomeUser/HomeUserPage"
import QuestionList from "components/question/QuestionList"
import  QuestionPagination from "components/QuestionPagination/QuestionPagination"



const getResults = (isFetching, results ) => {
  if(!isFetching) {
        return <QuestionList questions={results} numCols='3'/>
      }
      else{
        return <Alert className="c-question-base__alert--warning" color="warning">Carregando ...</Alert>
      }
}

class QuestionBasePage extends React.Component {
    componentDidMount() {
      this.props.listQuestions(parseInt(this.props.match.params.page, 10));
    }

    componentDidUpdate(prevProps) {
      if (this.props.match.params.page !== prevProps.match.params.page) {
        this.props.listQuestions(parseInt(this.props.match.params.page, 10));
      }
    }

    render(){
      const { questionPage,isFetching, error } = this.props

      if(error) {
        return  (
          <HomeUserPage>
             <Alert color="danger">{error.message}</Alert>
          </HomeUserPage>
        )
      }


      return (
        <HomeUserPage showFilters={true}>
          <div className="c-question-base">
              <Row className="c-question-base__search-text">Digite o termo e encontre soluções relacionadas
                <InputGroup>
                  <Input />
                  <InputGroupAddon addonType="prepend"><Button>Pesquisar</Button></InputGroupAddon>
                </InputGroup>
              </Row>
              <Row className="pagination-questions">
                <QuestionPagination {...this.props} {...questionPage}/>
              </Row>
              <Row className="c-question-base__results">
                {getResults(isFetching,questionPage.results)}
              </Row>
              <Row className="pagination-questions">
                <QuestionPagination {...this.props} {...questionPage}/>
              </Row>
          </div>
          </HomeUserPage>
        )
    }
  }

export default QuestionBasePage;
