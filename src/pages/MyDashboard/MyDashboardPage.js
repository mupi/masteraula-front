import React from 'react';
import {
  Row, Col,
} from 'reactstrap';
import HomeUserPage from '../HomeUser/HomeUserPage';

class MyDashboardPage extends React.Component {
  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <HomeUserPage>
        <div className="c-my-documents">
          <Row>
            <Col sm="12">
              <h4 className="text-center">Meu Painel de Atividades</h4>
            </Col>
          </Row>
        </div>
      </HomeUserPage>
    );
  }
}


export default MyDashboardPage;
