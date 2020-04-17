import React, { useEffect } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import OnlineTestForm from 'components/onlineTest/OnlineTestForm';
import {
  Alert,
} from 'reactstrap';

const EditOnlineTestPage = (props) => {
  const {
    isFetchingOnlineTest, fetchOnlineTest, match, activeOnlineTest,
  } = props;

  useEffect(() => {
    fetchOnlineTest(match.params.id);
  }, []);

  if (isFetchingOnlineTest) {
    return (
      <HomeUserPage>
        <Alert className="alert--warning" color="warning">
            Carregando ...
        </Alert>
      </HomeUserPage>
    );
  }

  if (!activeOnlineTest || activeOnlineTest.disabled) {
    return (
      <HomeUserPage>
        <Alert color="danger">
          A prova online não existe ou não está mais disponível
        </Alert>
      </HomeUserPage>
    );
  }
  return (
    <HomeUserPage>
      {activeOnlineTest && <OnlineTestForm {...props} actionName="Editar" baseDoc={activeOnlineTest.document} onlineTest={activeOnlineTest} />}
    </HomeUserPage>
  );
};

export default EditOnlineTestPage;
