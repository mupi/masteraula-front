import React, { Component } from 'react';
import { Row, Container } from 'reactstrap';
import DocumentForm from '../../components/document/DocumentForm.js';

const CreateDocumentPage =() =>
          <Container>
            <Row><h2>Monte seu documento</h2></Row>
            <Row>
            	<DocumentForm />
            </Row>
          </Container>


export default CreateDocumentPage