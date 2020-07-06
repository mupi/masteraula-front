import React, { useEffect } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import {
  Alert, Row, Col, Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import BackUsingHistory from 'components/question/BackUsingHistory';

const ViewActivityPage = (props) => {
  const {
    isFetchingActivity, fetchActivity, match, activeActivity, showDeleteModal, userId,
  } = props;


  useEffect(() => {
    fetchActivity(match.params.id);
  }, []);

  if (isFetchingActivity) {
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

  const authorPK = (activeActivity && activeActivity.owner) ? activeActivity.owner.pk : 'Anônimo';
  const isOwner = (authorPK === userId);

  // Learning object's options available for LearnningObjectContent
  /* const options = {
    showOperations: true,
    showViewButton: true,
    showCreateQuestionButton: true,
    removeOption: false,
    showTitle: false,
  };
*/
  return (
    <HomeUserPage>
      <div className="c-online">
        <Row className="c-online__row-header-options c-online__row-header-options--fixed">
          <Col className="c-online__col-header-options">
            <BackUsingHistory />
            { (isOwner)
              ? (
                <Button
                  className="c-question__btn-remove-question"
                  color="danger"
                  onClick={() => showDeleteModal(activeActivity.id)}
                  title="Apagar prova online"
                >
                  <FontAwesomeIcon icon="trash-alt" />
                  {' '}
                  Apagar
                </Button>
              ) : ''}
            {(isOwner)
              ? (
                <Link
                  className="btn btn-secondary c-question__btn-back"
                  to={`/edit-online/${activeActivity.link}`}
                >
                  <FontAwesomeIcon icon="pencil-alt" />
                  {' '}
                  Editar
                </Link>
              ) : ''}
          </Col>
        </Row>
        <Row className="c-question__tittle-section c-question--space-for-titlequestion mb-4">
          <Col>
            <h4>
              <FontAwesomeIcon icon="book" />
              {' '}
              Atividade N°
              {' '}
              {activeActivity.id}
            </h4>
          </Col>
        </Row>
      </div>
    </HomeUserPage>
  );
};

export default ViewActivityPage;
