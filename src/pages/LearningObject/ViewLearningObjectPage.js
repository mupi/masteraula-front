import React, { Component } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import {
  Alert, Row, Col, Button,
} from 'reactstrap';
import LearningObjectContent from 'components/learningObject/LearningObjectContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QuestionList from 'components/question/QuestionList';
import { history } from 'helpers/history';

class ViewLearningObjectPage extends Component {
  componentDidMount() {
    const { fetchLearningObject, match } = this.props;
    fetchLearningObject(match.params.id);
  }

  render() {
    const {
      activeLearningObject, isFetchingLearningObject, error,
    } = this.props;

    if (isFetchingLearningObject) {
      return (
        <HomeUserPage>
          <Alert className="alert--warning" color="warning">
            Carregando ...
          </Alert>
        </HomeUserPage>
      );
    }

    if (error || !activeLearningObject) {
      return (
        <HomeUserPage>
          <Alert color="danger">
            Erro no objeto de aprendizagem
          </Alert>
        </HomeUserPage>
      );
    }

    return (
      <HomeUserPage>
        <Row className="c-learning-object__row-header-options">
          <Col className="d-flex">
            <Button onClick={() => history.push('/object-base/1')} className="mr-auto btn btn-secondary c-question__btn-back">
              <FontAwesomeIcon icon="arrow-circle-left" className="btn__icon" />
              {' '}
              Voltar
            </Button>
          </Col>
        </Row>
        <Row className="c-question__tittle-section">
          <Col>
            <h4>
              <FontAwesomeIcon icon="image" />
              {' '}
              Objeto de aprendizagem N°
              {' '}
              { activeLearningObject ? activeLearningObject.id : ''}
            </h4>
          </Col>
        </Row>
        <Row>
          <Col sm="12" className="c-learning-object__col-full-section-details">
            <div className="l-learning-object">
              { activeLearningObject ? <LearningObjectContent learningObject={activeLearningObject} /> : ''}
            </div>
          </Col>
        </Row>
        <Row className="pagination-questions" style={{ marginLeft: '80%' }} />
        {activeLearningObject.questions ? (
          <div className="c-learning-object__col-full-section-details">
            <QuestionList
              sm="4"
              questions={activeLearningObject.questions}
              count={activeLearningObject.questions.length}
              textResult="Questões associadas ao objeto de aprendizagem"
              showLink={false}
              className="c-learning-object__col-full-section-details c-question-base__total-results"
              {...this.props}
            />
          </div>
        ) : (
          <Row>
            <Col sm="12" className="c-question-base__total-results">Sem questões associadas</Col>
          </Row>
        )}
      </HomeUserPage>
    );
  }
}
export default ViewLearningObjectPage;
