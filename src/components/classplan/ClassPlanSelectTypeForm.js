import React from 'react';
import {
  Button, CardDeck, Form, Row, Col, Card, CardHeader, CardBody, CardFooter,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const ClassPlanTypeCard = (props) => {
  const {
    title, children, type, isSelected, selectClassPlanType,
  } = props;
  return (
    <Card className="c-classplan__card-type">
      <CardHeader className="c-stat-card__title text-center">{title}</CardHeader>
      <CardBody className="c-stat-card__body">
        {children}
      </CardBody>
      <CardFooter className="c-classplan-modal__footer">
        <Button color={isSelected ? 'info' : 'secondary'} onClick={(e) => { e.preventDefault(); selectClassPlanType(type); }}>
          {!isSelected ? 'Selecionar' : (
            <>
              {' '}
              <FontAwesomeIcon icon="check-circle" className="btn__icon" />
              Selecionado
            </>
          )}

        </Button>
      </CardFooter>
    </Card>
  );
};

const ClassPlanSelectTypeForm = (props) => {
  const {
    handleSubmit, closeModal, nameAction, selectedClassPlanType, selectClassPlanType,
  } = props;

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row className="text-center mb-3">
          <Col sm="12">
            Selecione o tipo de plano de aula a ser criado
          </Col>
        </Row>
        <Row className="mb-3">
          <Col sm="12">

            <CardDeck>
              <ClassPlanTypeCard
                title="Tradicional"
                type="T"
                isSelected={selectedClassPlanType === 'T'}
                selectClassPlanType={selectClassPlanType}
              >
                <div>
                  <FontAwesomeIcon icon="file-alt" className="c-classplan-modal__btn-type" />
                </div>
              </ClassPlanTypeCard>
              <ClassPlanTypeCard
                title="Rotação por Estação"
                type="S"
                isSelected={selectedClassPlanType === 'S'}
                selectClassPlanType={selectClassPlanType}
              >
                <div>
                  <FontAwesomeIcon icon="sync-alt" className="c-classplan-modal__btn-type" />
                </div>
              </ClassPlanTypeCard>
            </CardDeck>
          </Col>
        </Row>
        <div className="c-classplan-modal__footer  modal-footer text-center">
          <Button
            tag={Link}
            to={`/create-classplan/${selectedClassPlanType}`}
            color="success"
            className="c-classplan-modal__btn-create"
            disabled={selectedClassPlanType === ''}
            onClick={() => closeModal()}
          >
            {nameAction}
          </Button>
          {' '}
          <Button color="secondary" onClick={() => closeModal()}>
            Cancelar
          </Button>
        </div>

      </Form>
    </div>
  );
};

export default ClassPlanSelectTypeForm;
