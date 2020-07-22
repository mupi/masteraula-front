import React, { useEffect } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import LearningObjectForm from 'components/learningObject/LearningObjectForm';
import {
  Alert,
} from 'reactstrap';

const CreateLearningObjectPage = (props) => {
  const {
    isCreating, error,
  } = props;


  useEffect(() => {
  }, []);


  if (isCreating) {
    return (
      <HomeUserPage>
        <Alert className="alert--warning" color="warning">
            Carregando ...
        </Alert>
      </HomeUserPage>
    );
  }

  if (error) {
    return (
      <HomeUserPage>
        <Alert color="danger">
            Erro no objeto de aprendizagem
        </Alert>
      </HomeUserPage>
    );
  }

  return (
    <HomeUserPage>
      <LearningObjectForm {...props} actionName="Criar" />
    </HomeUserPage>
  );
};

export default CreateLearningObjectPage;
