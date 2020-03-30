import React from 'react';
import {
  Card, CardFooter, CardBody, CardHeader, Badge,
} from 'reactstrap';

const CardBodyDocumentCard = (props) => {
  const { document } = props;

  const documentTopics = document.questions_topics && document.questions_topics.length > 0 ? document.questions_topics.map(t => t.name).join(', ') : '';
  return (
    <CardBody className="document-card__body">
      <p className="question-card__extract">
        { (documentTopics.length >= 150) ? ` ${documentTopics.substring(0, 150)}${' ...'}` : documentTopics }
        {' '}
      </p>
    </CardBody>
  );
};

const DocumentCard = (props) => {
  const {
    document, button,
  } = props;

  return (
    <Card className="h-100 document-card__full">
      <CardHeader className="document-card__header text-left">
        <div className="document-card__id">
          {`Prova N° ${document.id}`}
          {' '}
          <em>{`(Questões: ${document.questions_quantity})`}</em>
          <p className="document-card__name">
            {document.name}
          </p>
        </div>
        <div className="document-card__disciplines">
          {document.questions_disciplines.map(discipline => <Badge key={`${discipline.id}-${discipline.name}`} color="success" pill>{discipline.name.trim()}</Badge>)}
        </div>
      </CardHeader>
      <CardBodyDocumentCard document={document} />
      {button && (
      <CardFooter className="document-card__footer">
        {button}
      </CardFooter>
      )}
    </Card>
  );
};
export default DocumentCard;
