import React, { Component } from 'react';
import { Row, Container } from 'reactstrap';
import DocumentForm from '../../components/document/DocumentForm.js';
import DocumentPreview from '../../components/document/DocumentPreview.js';

const PreviewDocumentPage =() =>{
  let data = {'schoolName':'Escolinha', 'course':'Matemática','teacherName':"Profa Daniela",
                'studentName':true, 'date':true, 'class':true, 'grade':true}
    return(
          <Container>
            <Row><h2>Monte seu documento</h2></Row>
            <Row>
            	<DocumentPreview data={data}/>
            </Row>
          </Container>);
  
  }


export default PreviewDocumentPage