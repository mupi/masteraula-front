import React, { useEffect } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import ActivityForm from 'components/activity/ActivityForm';
import {
  Alert,
} from 'reactstrap';

const EditActivityPage = (props) => {
  const {
    listDisciplineFilters, listTeachingLevelFilters, userId, activeActivity, fetchActivity, isFetching, match,
  } = props;

  useEffect(() => {
    listDisciplineFilters();
    listTeachingLevelFilters();
    fetchActivity(match.params.id);
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

  if (!activeActivity || activeActivity.disabled) {
    return (
      <HomeUserPage>
        <Alert color="danger">
          A atividade não existe ou não está mais disponível
        </Alert>
      </HomeUserPage>
    );
  }

  if (activeActivity && activeActivity.owner.pk !== userId) {
    return (
      <HomeUserPage>
        <Alert color="danger">
          A atividade não é de sua autoria
        </Alert>
      </HomeUserPage>
    );
  }

  return (
    <HomeUserPage>
      <ActivityForm {...props} actionName="Editar" />
    </HomeUserPage>
  );
};

export default EditActivityPage;
