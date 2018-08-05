import React from 'react';
import RedefinePassword from 'components/forgotpassword/RedefinePassword';

const RedefinePasswordPage = (props) => {
  const { submit, match, success } = props;
  const uid = match.params.uid;
  const token = match.params.token;

  return (
    <div className="l-site-masteraula__public-home">
      <div className="l-user-operations middle-box text-center loginscreen  animated fadeInDown">
        <RedefinePassword onSubmit={submit} uid={uid} token={token} success={success} />
      </div>
    </div>
  );
};

export default RedefinePasswordPage;
