import React, { useEffect } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import LearningObjectForm from 'components/learningObject/LearningObjectForm';
import {
  Alert,
} from 'reactstrap';

const EditLearningObjectPage = (props) => {
  const {
    userId, activeLearningObject, fetchLearningObject, isFetching, match,
  } = props;

  useEffect(() => {
    fetchLearningObject(match.params.id);
  }, []);

  if (isFetching) {
    return (
      <HomeUserPage>
        <Alert className="alert--warning" color="warning">
            Carregando ...
        </Alert>
      </HomeUserPage>
    );
  }

  if (!activeLearningObject || activeLearningObject.disabled) {
    return (
      <HomeUserPage>
        <Alert color="danger">
            O objeto de aprendizagem não existe ou não está mais disponível
        </Alert>
      </HomeUserPage>
    );
  }

  if (activeLearningObject && activeLearningObject.owner !== userId) {
    return (
      <HomeUserPage>
        <Alert color="danger">
            O objeto de aprendizagem não é de sua autoria
        </Alert>
      </HomeUserPage>
    );
  }

  return (
    <HomeUserPage>
      <LearningObjectForm {...props} actionName="Editar" />
    </HomeUserPage>
  );
};

export default EditLearningObjectPage;
