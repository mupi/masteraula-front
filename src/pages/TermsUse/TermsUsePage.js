import React, { useEffect } from 'react';
import HomeUserNotLoggedPage from 'pages/Home/HomeUserNotLoggedPage';
import TermsUse from 'pages/TermsUse/TermsUse';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import {
  Alert,
} from 'reactstrap';

const InnerPage = (props) => {
  const {
    isLoggedIn, isFetching, termsUseList,
  } = props;
  if (isFetching && !termsUseList) {
    return (
      <Alert className="alert--warning" color="warning">
            Carregando ...
      </Alert>
    );
  }

  return isLoggedIn ? (
    <TermsUse termsUseList={termsUseList} />
  ) : (
    <TermsUse styleClass="c-terms-use" termsUseList={termsUseList} />
  );
};

const TermsUsePage = (props) => {
  const {
    isLoggedIn, listTermsUse,
  } = props;

  useEffect(() => {
    listTermsUse();
  }, []);
  return isLoggedIn ? (
    <HomeUserPage>
      <InnerPage {...props} />
    </HomeUserPage>
  ) : (
    <HomeUserNotLoggedPage>
      <InnerPage {...props} />
    </HomeUserNotLoggedPage>
  );
};
export default TermsUsePage;
