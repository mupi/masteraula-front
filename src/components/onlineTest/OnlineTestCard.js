import React from 'react';
import {
  Card, CardFooter, CardBody, CardHeader, Badge,
} from 'reactstrap';

const CardBodyOnlineTestCard = (props) => {
  const { onlineTest } = props;

  const onlineTestTopics = onlineTest.questions_topics && onlineTest.questions_topics.length > 0 ? onlineTest.questions_topics.map(t => t.name).join(', ') : '';
  return (
    <CardBody className="document-card__body">
      <p className="question-card__extract">
        <span>Tópicos abordados nas questões:</span>
        { (onlineTestTopics.length >= 150) ? ` ${onlineTestTopics.substring(0, 150)}${' ...'}` : onlineTestTopics }
        {' '}
      </p>
    </CardBody>
  );
};

const OnlineTestCard = (props) => {
  const {
    onlineTest, button,
  } = props;

  return (
    <Card className="h-100 document-card__full">
      <CardHeader className="document-card__header text-left">
        <div className="document-card__id">
          {`("Nº de questões: ${onlineTest.questions_quantity})`}
          <p className="document-card__name">
            {onlineTest.name}
          </p>
        </div>
        <div className="document-card__disciplines">
          {onlineTest.questions_disciplines.map(discipline => <Badge key={`${discipline.id}-${discipline.name}`} color="success" pill>{discipline.name.trim()}</Badge>)}
        </div>
      </CardHeader>
      <CardBodyOnlineTestCard onlineTest={onlineTest} />
      {button && (
      <CardFooter className="document-card__footer">
        {button}
      </CardFooter>
      )}
    </Card>
  );
};
export default OnlineTestCard;
