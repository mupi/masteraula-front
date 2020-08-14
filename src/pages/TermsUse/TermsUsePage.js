import React, { useEffect } from 'react';
import HomeUserNotLoggedPage from 'pages/Home/HomeUserNotLoggedPage';
import TermsUse from 'pages/TermsUse/TermsUse';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';

const TermsUsePage = (props) => {
  const {
    isLoggedIn, listTermsUse, termsUseList,
  } = props;

  useEffect(() => {
    listTermsUse();
  }, []);
  return isLoggedIn ? (
    <HomeUserPage>
      <TermsUse termsUseList={termsUseList} />
    </HomeUserPage>
  ) : (
    <HomeUserNotLoggedPage>
      <TermsUse styleClass="c-terms-use" termsUseList={termsUseList} />
    </HomeUserNotLoggedPage>
  );
};
export default TermsUsePage;
