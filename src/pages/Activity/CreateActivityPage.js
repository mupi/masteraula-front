import React, { useEffect } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import ActivityForm from 'components/activity/ActivityForm';
import {
  Alert,
} from 'reactstrap';

const CreateActivityPage = (props) => {
  const {
    listDisciplineFilters, listTeachingLevelFilters, prepareForm,
    resetSelectedObjects, resetTasksFromActivity, isCreating, error,
  } = props;


  useEffect(() => {
    listDisciplineFilters();
    listTeachingLevelFilters();
    prepareForm();
    resetSelectedObjects();
    resetTasksFromActivity();
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
            Erro na atividade
        </Alert>
      </HomeUserPage>
    );
  }

  return (
    <HomeUserPage>
      <ActivityForm {...props} actionName="Criar" />
    </HomeUserPage>
  );
};

export default CreateActivityPage;
