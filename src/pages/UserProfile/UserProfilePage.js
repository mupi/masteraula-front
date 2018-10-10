import React from 'react';
import { Alert } from 'reactstrap';
import UserProfileContainer from 'containers/UserProfileContainer';
import UserPasswordProfileContainer from 'containers/UserPasswordProfileContainer';
import { ToastContainer } from 'react-toastify';
import HomeUserPage from '../HomeUser/HomeUserPage';
import 'react-toastify/dist/ReactToastify.css';

class UserProfilePage extends React.Component {
  componentDidMount() {
    const { getStatesList } = this.props;
    getStatesList();
  }

  render() {
    const {
      stateList, isFetchingStatesList,
    } = this.props;

    if (isFetchingStatesList) {
      return (
        <HomeUserPage>
          <Alert className="alert--warning" color="warning">
              Carregando ...
          </Alert>
        </HomeUserPage>
      );
    }

    return (
      <HomeUserPage>
        <div className="l-user-profile">
          <h3 className="text-center">
              Meu Perfil
          </h3>
          <h5 className="text-center">
              Permite que a comunidade do MasterAula te conheça
          </h5>
          <UserProfileContainer stateList={stateList} />
          <UserPasswordProfileContainer />
        </div>
        <ToastContainer hideProgressBar position="bottom-right" />
      </HomeUserPage>
    );
  }
}


export default UserProfilePage;
