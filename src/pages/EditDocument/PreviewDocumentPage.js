import React from 'react';
import { Row, Container } from 'reactstrap';
import DocumentHeader from 'components/document/DocumentHeader';
import DocumentQuestions from 'components/document/DocumentQuestions';

const PreviewDocumentPage = () => {
  return (
    <Container>
      <Row>
        <h2>
          Monte seu documento
        </h2>
      </Row>
      <Row>
        <DocumentHeader setFields={this.setFields} />
        <DocumentQuestions data={this.state} />
      </Row>
    </Container>);
};


export default PreviewDocumentPage;
