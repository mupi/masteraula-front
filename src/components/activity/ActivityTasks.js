import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const TaskInfo = ({ taskInfo, position }) => (
  <Row>
    <Col sm="12">
      <h6>{`Tarefa ${position + 1}`}</h6>
      { taskInfo && (<p>{taskInfo}</p>) }
    </Col>
  </Row>
);

const ActivityTasks = ({ tasks }) => (
  <>
    <Row className="c-question__tittle-section">
      <Col>
        <h5>
          <FontAwesomeIcon icon="user-edit" />
          {' '}
          Tarefas
        </h5>
        <div className="border-top my-3" />
      </Col>
    </Row>
    <div className="c-activity__tasks">
      <Row>
        <Col><h6><strong>Descrição da tarefa (para o aluno)</strong></h6></Col>
      </Row>
      { tasks && tasks.map((task, i) => (
        <div className="my-2" key={task.id}>
          <TaskInfo taskInfo={task.description_task} position={i} />
        </div>
      )) }
    </div>
    <Row className="c-question__tittle-section">
      <Col>
        <h5>
          <FontAwesomeIcon icon="chalkboard-teacher" />
          {' '}
          Orientações ao professor
        </h5>
        <div className="border-top my-3" />
      </Col>
    </Row>
    <div className="c-activity__tasks">
      <Row>
        <Col><h6><strong>Expectativas para o papel do aluno</strong></h6></Col>
      </Row>
      { tasks && tasks.map((task, i) => (
        <div className="my-2" key={task.id}>
          <TaskInfo taskInfo={task.student_expectation} position={i} />
        </div>
      )) }
    </div>
    <div className="c-activity__tasks">
      <Row>
        <Col><h6><strong>Comentários para uso do professor</strong></h6></Col>
      </Row>
      { tasks && tasks.map((task, i) => (
        <div className="my-2" key={task.id}>
          <TaskInfo taskInfo={task.teacher_expectation} position={i} />
        </div>
      )) }
    </div>
  </>
);
export default ActivityTasks;
