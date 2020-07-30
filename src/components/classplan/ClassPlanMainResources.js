import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DocumentCardList from 'components/document/DocumentCardList';
import ActivityList from 'components/activity/ActivityList';

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
  const { activities, options } = props;
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
      buttonType= {options.buttonType}
      showQuantity={false}
      withFilters={false}
      viewOnly
    />
    </>
  );
};

const ClassPlanMainResources = ({
  classPlan, optionsActivity, optionsDocument, showDocumentModal,
}) => {
  const hasActivities = classPlan && classPlan.activities && classPlan.activities.length > 0;
  const hasDocuments = classPlan && classPlan.documents && classPlan.documents.length > 0;
  
  return (
    (hasActivities || hasDocuments) && (
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
      {hasActivities && <ActivitiesSection activities={classPlan.activities} options={optionsActivity} />}
      {hasDocuments && <DocumentsSection documents={classPlan.documents} options={optionsDocument} showDocumentModal={showDocumentModal} />}
    </>
    ));
};
export default ClassPlanMainResources;
