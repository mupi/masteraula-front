import React from 'react';
import { Row, Container } from 'reactstrap';
import DocumentPreview from '../../components/document/DocumentPreview.js';
import 'assets/css/Document.css';

const PreviewDocumentPage = () => {
  const data = {
    schoolName: 'Escolinha',
    course: 'Matemática',
    teacherName: 'Profa Daniela',
    studentName: true,
    date: true,
    class: true,
    grade: true,
  };
  return (
    <Container>
      <Row>
        <h2>
Monte seu documento
        </h2>
      </Row>
      <Row>
        <DocumentPreview data={data} />
      </Row>
    </Container>);
};


export default PreviewDocumentPage;
