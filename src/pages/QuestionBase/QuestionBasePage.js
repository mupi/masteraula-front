import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Input, InputGroup, InputGroupAddon, Button} from 'reactstrap';
import HomeUserPage from "../HomeUser/HomeUserPage"
import QuestionList from "components/question/QuestionList"
import 'assets/css/QuestionBase.css';

class QuestionBasePage extends React.Component {
    componentDidMount() {
      this.props.listQuestions(this.props.match.params.page);
    }
    
    render(){
      const { questionPage, error } = this.props
  
      if(error) {
        return  (
          <HomeUserPage>
            <div className="alert alert-danger">{error.message}</div>
          </HomeUserPage>
        )
      }
      return (
        <HomeUserPage showFilters={true}>
          <div className="contenedor-question-base">
              <Row className="text-search-question">Digite o termo e encontre soluções relacionadas
                <InputGroup>
                  <Input />
                  <InputGroupAddon addonType="prepend"><Button>Pesquisar</Button></InputGroupAddon>
                </InputGroup>
              </Row>
              <Row className="questions-result">
                <QuestionList questions={questionPage.results} numCols='3'/>
              </Row>
          </div>
          </HomeUserPage>
        )
    }
  }

export default QuestionBasePage;
