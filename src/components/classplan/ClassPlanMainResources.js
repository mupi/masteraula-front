import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LearningObjectList from 'components/learningObject/LearningObjectList';
import DocumentCardListClassPlan from 'components/document/DocumentCardListClassPlan';

const LearningObjectsSection = (props) => {
  const { objects, options } = props;
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
      <LearningObjectList
        learningObjects={objects}
        options={options}
      />
    </>
  );
};

const DocumentsSection = (props) => {
  const { documents, options } = props;
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
      />
    </>
  );
};

const ClassPlanMainResources = ({ classPlan, optionsObject, optionsDocument }) => {
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
      {hasDocuments && <DocumentsSection documents={classPlan.documents} options={optionsDocument} />}
    </>
    ));
};
export default ClassPlanMainResources;
