import React, { Component } from 'react';
import { Row, Container } from 'reactstrap';
import DocumentForm from '../../components/document/DocumentForm.js';
import HomeUserPage from "../HomeUser/HomeUserPage"


const CreateDocumentPage =() =>
          <HomeUserPage>
            <Container>
              <Row><h2>Monte seu documento</h2></Row>
              <Row>
              	<DocumentForm />
              </Row>
            </Container>
          </HomeUserPage>


export default CreateDocumentPage
