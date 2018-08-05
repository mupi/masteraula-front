import React from 'react';
import ForgotPassword from 'components/forgotpassword/ForgotPassword';

const ForgotPasswordPage = (props) => {
  const { success, submit } = props;

  return (
    <div className="l-site-masteraula__public-home">
      <div className="l-user-operations middle-box text-center loginscreen  animated fadeInDown">
        <ForgotPassword onSubmit={submit} success={success} />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
