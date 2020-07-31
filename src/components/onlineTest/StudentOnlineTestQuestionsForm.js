import React from 'react';
import { getCleanCompleteStatement, getCleanLearningObjectSource, getCleanAlternativeText } from 'helpers/question';
import { Prompt } from 'react-router-dom';
import {
  Row, Col, Form, Button, Input,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Field, reduxForm, FieldArray,
} from 'redux-form';

const renderField = ({
  input,
  placeholder,
  type,
  meta: { touched, error, warning },
  autoFocus = false,
}) => (
  <div className="mt-2">
    <Input
      {...input}
      placeholder={placeholder}
      type={type}
      autoFocus={autoFocus}
      className="contact-form__input form-control"
    />
    { touched
        && ((error && (
        <span className="error-message-text">
          {error}
        </span>
        ))
        || (warning && (
        <span>
          {' '}
          {warning}
          {' '}
        </span>
        )))
      }
  </div>
);

/* eslint-disable react/no-danger */
const renderAlternatives = ({ fields, questionDoc }) => (
  <>
    {fields && fields.map((alternative, i) => (
      <div key={questionDoc.question.alternatives[i].id}>
        <Field
          name={`${questionDoc.id}selectedIndex`}
          component="input"
          type="radio"
          normalize={value => parseInt(value, 10)}
          value={questionDoc.question.alternatives[i].id}
          className="c-create-online__radio-button-field"
        />
        {' '}
        <span dangerouslySetInnerHTML={{ __html: getCleanAlternativeText(questionDoc.question.alternatives[i].text) }} />
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
            <strong>{`Material para a questão N° ${i + 1} `}</strong>
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
        {questionGroups[i].question.learning_objects && questionGroups[i].question.learning_objects.length > 0 && (
          <div className="border-top my-3" />
        )}
        <p className="student-online__section-title mb-1">
          <strong>{`Questão N° ${i + 1} `}</strong>
        </p>
        <div className="student-online__question-statement">
          <div dangerouslySetInnerHTML={{ __html: getCleanCompleteStatement(questionGroups[i].question.statement) }} />
        </div>

        {questionGroups[i].question.alternatives.length > 0
          ? (<FieldArray name={`${group}.alternatives`} component={renderAlternatives} questionDoc={questionGroups[i]} />)
          : (
            <Field
              component={renderField}
              type="textarea"
              name={`${group}.answer_text`}
              placeholder="Insira sua resposta"
              className="form-control"
            />
          )
        }
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
    handleSubmit, pristine, questionsDocument, isLoggedIn, isSendingAnswers,
  } = props;
  return (

    <Form onSubmit={handleSubmit}>
      {!isLoggedIn && (
      <Prompt
        when={!pristine && !isSendingAnswers}
        message="Tem certeza de sair da prova online?"
      />
      )}

      <Row noGutters>
        <Col>
          <FieldArray
            name="student_questions"
            component={renderQuestionMaterials}
            questionGroups={questionsDocument}
          />
        </Col>
      </Row>
      {!isLoggedIn && (
      <Row className="mt-3">
        <Col sm="12" className="text-center">
          <Button color="success" type="submit" disabled={isSendingAnswers}>
            <FontAwesomeIcon icon="check" />
            {' Finalizar e enviar respostas'}
          </Button>
        </Col>
      </Row>
      )}
    </Form>
  );
};

export default reduxForm({
  form: 'student-test', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(StudentOnlineTestQuestionsForm);
