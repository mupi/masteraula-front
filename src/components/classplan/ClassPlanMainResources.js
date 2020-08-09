import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DocumentCardList from 'components/document/DocumentCardList';
import ActivityList from 'components/activity/ActivityList';
import OnlineTestCardList from 'components/onlineTest/OnlineTestCardList';

const OnlineTestsSection = (props) => {
  const { documentsOnline, options, showOnlineTestModal } = props;
  return (
    <>
      <Row className="mt-3">
        <Col sm="12">
          <h6>
            <FontAwesomeIcon icon="laptop" />
            {' '}
            {/* Provas e/ou Lista de exercícios Online */}
            Provas Online
          </h6>
        </Col>
      </Row>
      <OnlineTestCardList
        onlineTests={documentsOnline}
        viewOnly={options.showViewButton}
        showOnlineTestModal={showOnlineTestModal}
      />
    </>
  );
};

const DocumentsSection = (props) => {
  const { documents, options, showDocumentModal } = props;
  return (
    <>
      <Row className="mt-3">
        <Col sm="12">
          <h6>
            <FontAwesomeIcon icon="file" />
            {' '}
            Provas e/ou Lista de exercícios
          </h6>
        </Col>
      </Row>
      <DocumentCardList
        documents={documents}
        viewOnly={options.showViewButton}
        showDocumentModal={showDocumentModal}
      />
    </>
  );
};

const ActivitiesSection = (props) => {
  const { activities, options, showActivityModal } = props;
  return (
    <>
      <Row className="mb-2">
        <Col sm="12">
          <h6>
            <FontAwesomeIcon icon="book-reader" />
            {' '}
          Atividades
          </h6>
        </Col>
      </Row>
      <ActivityList
        sm="4"
        activities={activities}
        buttonType={options.buttonType}
        showQuantity={false}
        withFilters={false}
        showActivityModal={showActivityModal}
      />
    </>
  );
};

const ClassPlanMainResources = ({
  classPlan, optionsActivity, optionsDocument, optionsOnlineTest, showDocumentModal, showActivityModal, showOnlineTestModal,
}) => {
  const hasActivities = classPlan && classPlan.activities && classPlan.activities.length > 0;
  const hasDocuments = classPlan && classPlan.documents && classPlan.documents.length > 0;
  const hasOnlineTests = classPlan && classPlan.documents_online && classPlan.documents_online.length > 0;

  return (
    (hasActivities || hasDocuments || hasOnlineTests) && (
    <>
      <Row className="c-question__tittle-section">
        <Col>
          <h5>
            <FontAwesomeIcon icon="book" />
            {' '}
              Materiais a serem usados
          </h5>
          <div className="border-top my-3" />
        </Col>
      </Row>
      {hasActivities && <ActivitiesSection activities={classPlan.activities} options={optionsActivity} showActivityModal={showActivityModal} />}
      {hasDocuments && <DocumentsSection documents={classPlan.documents} options={optionsDocument} showDocumentModal={showDocumentModal} />}
      {hasOnlineTests
      && <OnlineTestsSection documentsOnline={classPlan.documents_online} options={optionsOnlineTest} showOnlineTestModal={showOnlineTestModal} />}
    </>
    ));
};
export default ClassPlanMainResources;
