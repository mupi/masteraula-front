import React, { Component } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import { Row, Col } from 'reactstrap';
import LearningObjectContent from 'components/learningObject/LearningObjectContent';
import { history } from 'helpers/history';


class ViewLearningObjectPage extends Component {
  componentDidMount() {
    const { fetchLearningObject, match } = this.props;
    fetchLearningObject(match.params.id);
    history.push(`/view-learningobject/${match.params.id}`);
  }

  render() {
    const {
      activeLearningObject,
    } = this.props;
    return (
      <HomeUserPage>
        <Row>
          <Col sm="12">
            <div className="c-learning-object">
              { activeLearningObject ? <LearningObjectContent learningObject={activeLearningObject} /> : ''}
            </div>
          </Col>
        </Row>
      </HomeUserPage>
    );
  }
}
export default ViewLearningObjectPage;
