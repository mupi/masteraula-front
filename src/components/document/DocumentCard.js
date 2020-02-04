import React from 'react';
import {
  Card, CardFooter, CardBody, CardHeader, Badge,
} from 'reactstrap';

import { getCleanExtractStatement } from 'helpers/question';

const CardBodyDocumentCard = (props) => {
  const { document } = props;

  const extractText = document.text ? getCleanExtractStatement(document.text) : '';

  return (
    <CardBody className="document-card__body">
      <p className="question-card__extract">
        {extractText.substring(0, 150)}
        {' ...'}
      </p>
    </CardBody>
  );
};

const DocumentCard = (props) => {
  const {
    document, button,
  } = props;

  const joinTagNames = () => document.questions_topics.map(t => t.name).join(', ');

  return (
    <Card className="h-100 document-card__full">
      <CardHeader className="document-card__header">
        <div className="document-card__id">
          {`Prova N° ${document.id}`}
          {' '}
          <em>{`(Questões: ${document.questions_quantity})`}</em>
        </div>
        <div className="document-card__info-section">
          {document.questions_disciplines.map(discipline => <Badge key={`${discipline.id}-${discipline.name}`} color="success" pill>{discipline.name.trim()}</Badge>)}
        </div>
        <p className="document-card__more-info">
          {(document.questions_topics && document.questions_topics.length > 0) && (
            <span>
              <span className="document-card__more-info--lightgray">tags: </span>
              <span className="document-card__tag document-card__info-section-item--italic">
                {joinTagNames()}
              </span>
            </span>
          )}
        </p>
      </CardHeader>
      <CardBodyDocumentCard document={document} />
      <CardFooter className="document-card__footer">
        {button}
      </CardFooter>
    </Card>
  );
};
export default DocumentCard;
