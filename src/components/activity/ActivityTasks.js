import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const SingleTask = ({ task, position }) => (
  <>
    <Row>
      <Col sm="12">
        <h6><strong>{`Tarefa ${position + 1}`}</strong></h6>
      </Col>
    </Row>
    <Row className="mb-3 align-items-center">
      <Col sm="12">
        Descrição da tarefa (para o aluno)
        {task.description_task}
      </Col>
      <Col sm="12">
        Expectativas para o papel do aluno
        {task.student_expectation}
      </Col>
      <Col sm="12">
        Comentários para uso do professor
        {task.teacher_expectation}
      </Col>
    </Row>
  </>
);


const ActivityTasks = ({ tasks }) => (
  <>
    <Row className="c-question__tittle-section">
      <Col>
        <h5>
          <FontAwesomeIcon icon="sync-alt" />
          {' '}
          Tarefas
        </h5>
        <div className="border-top my-3" />
      </Col>
    </Row>
    <div className="c-classplan__stations">
      { tasks && tasks.map((task, i) => (
        <div className="c-classplan__view-station border-bottom my-3" key={task.id}>
          <SingleTask task={task} position={i} />
        </div>
      )) }
    </div>
  </>
);
export default ActivityTasks;
