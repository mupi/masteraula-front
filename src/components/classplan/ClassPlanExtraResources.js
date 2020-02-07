import React from 'react';
import { Row, Col, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getNamePdf } from 'helpers/classPlan';

const PdfSection = (props) => {
  const { classPlan } = props;
  return (
    <>
      <Row>
        <Col sm="12">
          <h6>
            <FontAwesomeIcon icon="file-pdf" />
            {' '}
            Arquivo PDF
          </h6>
        </Col>
      </Row>

      <Row className="c-create-question__row-info mb-3">
        <Col sm="12" xs="12">
          <a
            className="c-question-base__link-askquestion"
            target="_blank"
            rel="noopener noreferrer"
            href={classPlan.pdf}
          >
            {getNamePdf(classPlan.pdf)}
          </a>
        </Col>
      </Row>
    </>
  );
};

const LinksSection = (props) => {
  const { classPlan } = props;
  return (
    <>
      <Row className="mb-2">
        <Col sm="12">
          <h6>
            <FontAwesomeIcon icon="link" />
            {' '}
            Links
          </h6>
        </Col>
        <Col sm="12">
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Link</th>
                <th>Descrição</th>
              </tr>
            </thead>

            <tbody>
              {classPlan.links.map((link, i) => (
                <tr key={link.id}>
                  <th scope="row">{i + 1}</th>
                  <td>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={link.link}
                    >
                      {link.link}
                    </a>
                  </td>
                  <td>{link.description_url}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

const ClassPlanExtraResources = ({ classPlan }) => {
  const hasPdf = classPlan && classPlan.pdf;
  const hasLinks = classPlan && classPlan.links && classPlan.links.length > 0;

  return (
    (hasPdf || hasLinks) && (
    <>
      <Row className="c-question__tittle-section">
        <Col>
          <h5>
            <FontAwesomeIcon icon="link" />
            {' '}
             Recursos Extras
          </h5>
          <div className="border-top my-3" />
        </Col>
      </Row>
      {hasPdf && <PdfSection classPlan={classPlan} />}
      {hasLinks && <LinksSection classPlan={classPlan} />}
    </>
    ));
};
export default ClassPlanExtraResources;
