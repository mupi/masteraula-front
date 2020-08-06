import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RemoveButton from 'components/buttons/RemoveButton';
import OnlineTestCard from './OnlineTestCard';

const OnlineTestCardList = (props) => {
  const {
    onlineTests, sm, selectedOnlineTestList,
    addSelectedOnlineTest, removeSelectedOnlineTest, viewOnly = false,
    showOnlineTestModal,
  } = props;

  const isOnlineTestAdded = (link) => {
    if (selectedOnlineTestList) {
      const onlineTestAdded = selectedOnlineTestList.filter(item => (item.link === link || item.document_online_ids === link));
      return (onlineTestAdded.length > 0);
    }
    return false;
  };

  const CardButton = onlineTest => (
    !isOnlineTestAdded(onlineTest.link) ? (
      <Button className="object-card__btn" onClick={() => addSelectedOnlineTest(onlineTest)}>
        <FontAwesomeIcon icon="plus" className="btn__icon" />
        {' '}
        Adicionar
        {' '}
      </Button>
    ) : (
      <RemoveButton id={onlineTest.link} removeSelectedItem={removeSelectedOnlineTest} itemName="prova online" />
    )
  );

  const ViewCardButton = onlineTest => (
    <Button className="btn-margin-right menu-top__document-button" onClick={() => showOnlineTestModal(onlineTest.link)}>
      <FontAwesomeIcon icon="eye" className="btn__icon" />
      Ver prova online
    </Button>
  );
  return (
    <Row>
      {onlineTests && onlineTests.map(onlineTest => (
        <Col sm={sm} lg="3" xs="12" key={onlineTest.link} className="object-card">
          <OnlineTestCard
            onlineTest={onlineTest}
            button={!viewOnly ? CardButton(onlineTest) : ViewCardButton(onlineTest)}
            {...props}
          />
        </Col>
      ))}
    </Row>
  );
};

export default OnlineTestCardList;
