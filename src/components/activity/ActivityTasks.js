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
        <h6>Descrição da tarefa (para o aluno)</h6>
        <p>{task.description_task}</p>
      </Col>
      <Col sm="12">
        <h6>Expectativas para o papel do aluno</h6>
        <p>{task.student_expectation}</p>
      </Col>
      {task.teacher_expectation && (
      <Col sm="12">
        <h6>Comentários para uso do professor</h6>
        <p>{task.teacher_expectation}</p>
      </Col>
      )}
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
