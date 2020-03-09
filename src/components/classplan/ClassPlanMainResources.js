import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DocumentCardListClassPlan from 'components/document/DocumentCardListClassPlan';
import SimpleLObjectCardList from 'components/learningObject/SimpleLObjectCardList';

const LearningObjectsSection = (props) => {
  const { objects } = props;
  return (
    <>
      <Row className="mb-2">
        <Col sm="12">
          <h6>
            <FontAwesomeIcon icon="image" />
            {' '}
              Objetos de aprendizagem
          </h6>
        </Col>
      </Row>
      <SimpleLObjectCardList
        sm="4"
        objects={objects}
        viewOnly
        showQuestionQuantity={false}
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
      <DocumentCardListClassPlan
        documents={documents}
        options={options}
        showDocumentModal={showDocumentModal}
      />
    </>
  );
};

const ClassPlanMainResources = ({
  classPlan, optionsObject, optionsDocument, showDocumentModal,
}) => {
  const hasLearningObjects = classPlan && classPlan.learning_objects && classPlan.learning_objects.length > 0;
  const hasDocuments = classPlan && classPlan.documents && classPlan.documents.length > 0;
  return (
    (hasLearningObjects || hasDocuments) && (
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
      {hasLearningObjects && <LearningObjectsSection objects={classPlan.learning_objects} options={optionsObject} />}
      {hasDocuments && <DocumentsSection documents={classPlan.documents} options={optionsDocument} showDocumentModal={showDocumentModal} />}
    </>
    ));
};
export default ClassPlanMainResources;
