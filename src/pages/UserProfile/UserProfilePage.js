import React from 'react';
import { Alert } from 'reactstrap';
import UserProfile from 'components/userprofile/UserProfile';
import UserPasswordProfile from 'components/userprofile/UserPasswordProfile';
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
      submitProfile, submitProfilePassword, stateList, isFetchingStatesList, getCitiesList,
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
          <UserProfile onSubmit={submitProfile} stateList={stateList} getCitiesList={getCitiesList} />
          <UserPasswordProfile onSubmit={submitProfilePassword} />
        </div>
        <ToastContainer hideProgressBar position="bottom-right" />
      </HomeUserPage>
    );
  }
}


export default UserProfilePage;
