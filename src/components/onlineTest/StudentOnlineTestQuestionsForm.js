import React from 'react';
import { getCleanCompleteStatement, getCleanLearningObjectSource, getCleanAlternativeText } from 'helpers/question';
import { Prompt } from 'react-router-dom';
import {
  Row, Col, Form, Button, FormGroup,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Field, reduxForm, FieldArray,
} from 'redux-form';

/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
const renderAlternatives = ({ fields, question }) => (
  <>
    {fields && fields.map((alternative, i) => (
      <div key={question.alternatives[i].id}>
        <FormGroup>
          <Field
            name={`${question.id}selectedIndex`}
            component="input"
            type="radio"
            normalize={value => parseInt(value, 10)}
            value={question.alternatives[i].id}
            className="c-create-online__radio-button-field"
          />
          {' '}
          <span dangerouslySetInnerHTML={{ __html: getCleanAlternativeText(question.alternatives[i].text) }} />
        </FormGroup>
      </div>
    ))}

  </>
);


/* eslint-disable react/no-danger */
const renderQuestionMaterials = ({ fields, questionGroups }) => (
  <>
    {fields && fields.map((group, i) => (
      <div className="student-online__section mb-3" key={questionGroups[i].id}>

        {questionGroups[i].question.learning_objects && questionGroups[i].question.learning_objects.length > 0 && (
          <p className="student-online__section-title mb-1">
            <strong>{`Material para a questão N° ${questionGroups[i].id} `}</strong>
          </p>
        )}
        {questionGroups[i].question.learning_objects && questionGroups[i].question.learning_objects.map(learningObject => (

          <div key={learningObject.id} className="mb-3">

            {(learningObject.image) ? (
              <div>
                <img alt="objeto-aprendizagem" className="c-learning-object__img" src={learningObject.image} />
              </div>
            ) : ''}

            {(learningObject.text) ? (
              <div className="student-online__object-text">
                <div dangerouslySetInnerHTML={{ __html: getCleanCompleteStatement(learningObject.text) }} />
              </div>
            ) : ''}
            {(learningObject.source) ? (
              <div className="student-online__object-source">
                <div dangerouslySetInnerHTML={{ __html: getCleanLearningObjectSource(learningObject.source) }} />
              </div>
            ) : ''}
          </div>
        ))
      }
        <div className="border-top my-3" />
        <p className="student-online__section-title mb-1">
          <strong>{`Questão N° ${i + 1} `}</strong>
        </p>
        <div className="student-online__question-statement">
          <div dangerouslySetInnerHTML={{ __html: getCleanCompleteStatement(questionGroups[i].question.statement) }} />
        </div>
        <FieldArray name={`${group}.question.alternatives`} component={renderAlternatives} question={questionGroups[i].question} />
      </div>
    ))}

  </>
);
/*

{
  "student_name": "Glaucia",
  "student_levels": "Superior",
  "student_answer": [{"answer_text": "a", "student_question": 3}, {"answer_alternative": 3, "student_question": 3}]
}
 */
const StudentOnlineTestQuestionsForm = (props) => {
  const {
    handleSubmit, pristine, submitting, questions,
  } = props;
  return (

    <Form onSubmit={handleSubmit}>
      <Prompt
        when={!pristine && !submitting}
        message="Tem certeza de sair da prova online?"
      />

      <Row noGutters>
        <Col>
          <FieldArray
            name="student_questions"
            component={renderQuestionMaterials}
            questionGroups={questions}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col sm="12" className="text-center">
          <Button color="success" type="submit">
            <FontAwesomeIcon icon="check" />
            {' Finalizar prova'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default reduxForm({
  form: 'student-test', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(StudentOnlineTestQuestionsForm);
