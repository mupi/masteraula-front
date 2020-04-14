import React, { useEffect } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import OnlineTestForm from 'components/onlineTest/OnlineTestForm';
import {
  Alert,
} from 'reactstrap';

const CreateOnlineTestPage = (props) => {
  const {
    isFetchingBaseDocument, fetchBaseDocument, match, baseDocument,
  } = props;


  useEffect(() => {
    fetchBaseDocument(match.params.id);
  }, []);

  if (isFetchingBaseDocument) {
    return (
      <HomeUserPage>
        <Alert className="alert--warning" color="warning">
            Carregando ...
        </Alert>
      </HomeUserPage>
    );
  }

  if (!baseDocument || baseDocument.disabled) {
    return (
      <HomeUserPage>
        <Alert color="danger">
            A prova base não existe ou não está mais disponível
        </Alert>
      </HomeUserPage>
    );
  }

  return (
    <HomeUserPage>
      {baseDocument && <OnlineTestForm {...props} actionName="Criar" />}
    </HomeUserPage>
  );
};

export default CreateOnlineTestPage;
