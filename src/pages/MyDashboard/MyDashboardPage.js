import React from 'react';
import {
  Row, Col, Alert,
} from 'reactstrap';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import MyDashboardMyStatistics from 'components/dashboard/MyDashboardMyStatistics';
import MyDashboardGeneralStatistics from 'components/dashboard/MyDashboardGeneralStatistics';

class MyDashboardPage extends React.Component {
  componentDidMount() {
    const {
      fetchMyDashboard,
    } = this.props;

    fetchMyDashboard();
  }

  componentDidUpdate() {
  }

  render() {
    const { myDashboard, isFetchingMyDashboard } = this.props;
    return (
      <HomeUserPage>
        <div className="c-my-dashboard">
          <Row>
            <Col sm="12">
              <h4 className="text-center">Meu Painel de Atividades</h4>
            </Col>
          </Row>
          { isFetchingMyDashboard ? (
            <Alert className="alert--warning" color="warning" fade={false}>
                Carregando ...
            </Alert>
          ) : (
            <>
              <MyDashboardMyStatistics myStatistics={myDashboard && myDashboard.results ? myDashboard.results[0] : null} />
              <MyDashboardGeneralStatistics generalStatistics={myDashboard && myDashboard.results ? myDashboard.results[0] : null} />
              <Row>
                <Col sm="12">
                  <h5>Minhas provas recentes</h5>
                </Col>
              </Row>
            </>
          )}
        </div>
      </HomeUserPage>
    );
  }
}


export default MyDashboardPage;
