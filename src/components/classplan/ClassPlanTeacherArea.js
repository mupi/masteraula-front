import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCleanCompleteStatement } from 'helpers/question';

const ClassPlanTeacherArea = ({ classPlan }) => {
    const hasContent = classPlan && classPlan.content && classPlan.content.trim() !== '<p></p>' && classPlan.content.trim() !== '';

    return (
        <>
            <Row className="c-question__tittle-section">
                <Col>
                    <h5>
                        <FontAwesomeIcon icon="chalkboard-teacher" />
                        {' '}
                        Área do professor
                    </h5>
                    <div className="border-top my-3" />
                </Col>
            </Row>
            <Row>
                <Col><h6><strong>Etapas</strong></h6></Col>
            </Row>
            <Row className="c-create-question__row-info">
                <Col sm="12" xs="12">
                    <div dangerouslySetInnerHTML={{ __html: getCleanCompleteStatement(classPlan.phases) }} />
                </Col>
            </Row>
            {hasContent && (
                <>
                    <Row>
                        <Col><h6><strong>Conteúdo para lousa</strong></h6></Col>
                    </Row>
                    <Row className="c-create-question__row-info">
                        <Col sm="12" xs="12">
                            <div dangerouslySetInnerHTML={{ __html: getCleanCompleteStatement(classPlan.content) }} />
                        </Col>
                    </Row>
                </>
            )}
        </>
        );
};
export default ClassPlanTeacherArea;

