import React, { useEffect } from 'react';
import { getCleanCompleteStatement, getCleanLearningObjectSource, getCleanAlternativeText } from 'helpers/question';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom';
import {
  Row, Col, Form, Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Field, reduxForm, FieldArray, initialize,
} from 'redux-form';

const materialQuestions = [
  {
    learning_objects: [
      {
        id: 91,
        owner: 1,
        source: 'Extraído do Vestibular UEPB - 2008.',
        image: null,
        text: '<p> Durante décadas, o DDT (dicloro-difenil-tricloroetano) foi largamente usado como inseticida até ser comprovado que, além de provocar câncer, demora de 4 a 30 anos para se degradar. O DDT foi\r\nutilizado na Segunda Guerra Mundial para prevenção de tifo em soldados, que o utilizavam também para o combate a piolhos. Posteriormente foi usado na agropecuária, no Brasil e no mundo, dado seu baixo preço e elevada eficiência. Especialistas afirmam que o principal problema do DDT é sua ação indiscriminada, que atinge tanto as pragas quanto o resto da fauna e flora da área afetada. O\r\nDDT também se infiltra na água, contaminando os mananciais. </p>',
        tags: [
          {
            name: 'texto',
          },
          {
            name: 'câncer',
          },
          {
            name: 'DDT',
          },
          {
            name: 'inseticida',
          },
          {
            name: 'agropecuária',
          },
          {
            name: 'contaminação ambiental',
          },
        ],
        object_types: [
          'T',
        ],
        questions_quantity: 4,
      },
      {
        id: 92,
        owner: 1,
        source: 'Extraído do Vestibular UEPB - 2008.',
        text: '<p>Uma forma de preparação do DDT é o aquecimento de clorobenzeno e cloral hidratado, em presença de ácido sulfúrico.</p>',
        tags: [
          {
            name: 'reação química',
          },
          {
            name: 'síntese do DDT',
          },
          {
            name: 'reação química orgânica',
          },
          {
            name: 'reação de substituição',
          },
          {
            name: 'compostos orgânicos',
          },
        ],
        object_types: [
          'I',
          'T',
        ],
        questions_quantity: 4,
      },
      {
        id: 1134,
        owner: 1,
        source: 'Extraído do Vestibular UEPB - 2008.',
        text: '<p> No meio ambiente, o DDT aplicado nas lavouras se transforma no\r\nDDE, segundo a equação.</p>',
        tags: [
          {
            name: 'reação química',
          },
          {
            name: 'reação fotoquímica',
          },
          {
            name: 'reação de eliminação',
          },
        ],
        object_types: [
          'I',
          'T',
        ],
        questions_quantity: 4,
      },
    ],
    question: {
      id: 14,
      author: {
        pk: 1,
        username: 'suporte@mupi.me',
        email: 'suporte@mupi.me',
        name: 'Masteraula',
      },
      authorship: null,
      create_date: '2018/09/03',
      type_question: 'Objetiva',
      statement: '<p>Que outros produtos, além do DDT e do DDE, são formados das equações A e B, respectivamente?</p>',
      alternatives: [
        {
          id: 30,
          text: '<img src="https://s3.us-east-2.amazonaws.com/masteraula/images/question_images/cpcon2008quimica/img12.jpg" border="0" alt="Imagem 010.jpg">',
          is_correct: false,
        },
        {
          id: 31,
          text: '<img src="https://s3.us-east-2.amazonaws.com/masteraula/images/question_images/cpcon2008quimica/img13.jpg" border="0" alt="Imagem 011.jpg">',
          is_correct: false,
        },
        {
          id: 32,
          text: '<img src="https://s3.us-east-2.amazonaws.com/masteraula/images/question_images/cpcon2008quimica/img14.jpg" border="0" alt="Imagem 012.jpg">',
          is_correct: false,
        },
        {
          id: 33,
          text: '<img src="https://s3.us-east-2.amazonaws.com/masteraula/images/question_images/cpcon2008quimica/img15.jpg" border="0" alt="Imagem 013.jpg">',
          is_correct: true,
        },
        {
          id: 34,
          text: '<img src="https://s3.us-east-2.amazonaws.com/masteraula/images/question_images/cpcon2008quimica/img16.jpg" border="0" alt="Imagem 014.jpg">',
          is_correct: false,
        },
      ],
      disciplines: [
        {
          id: 10,
          name: 'Química',
          slug: 'Qui',
        },
      ],
      teaching_levels: [
        {
          id: 4,
          name: 'Ensino Médio',
          slug: 'EM',
        },
      ],
      year: 2008,
      source: 'UEPB',
      disabled: false,
    },
  }];

/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
const renderAlternatives = ({ fields, alternatives }) => (
  <>
    {fields && fields.map((alternative, i) => (
      <div>
        <Field
          name="selectedIndex"
          component="input"
          type="radio"
          normalize={value => parseInt(value, 10)}
          value={i}
          className="c-create-online__radio-button-field"
        />
        <div dangerouslySetInnerHTML={{ __html: getCleanAlternativeText(alternatives[i].text) }} />
      </div>
    ))}

  </>
);

/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
const renderQuestionMaterials = ({ fields, questionGroups }) => (
  <>
    {fields && fields.map((group, i) => (
      <div className="student-online__section" key={i}>

        <p className="student-online__section-title mb-1">
          <strong>{`Material para a questão N° ${i + 1} `}</strong>
        </p>
        {questionGroups[i].learning_objects && questionGroups[i].learning_objects.map(learningObject => (

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
        <FieldArray name={`${group}.question.alternatives`} component={renderAlternatives} alternatives={questionGroups[i].question.alternatives} />
      </div>
    ))}

  </>
);

const StudentOnlineTestQuestionsForm = (props) => {
  const {
    handleSubmit, pristine, submitting, prepareForm,
  } = props;

  useEffect(() => {
    prepareForm();
  }, []);

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
            questionGroups={materialQuestions}
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

const mapStateToProps = () => ({

});

const mapDispatchToProps = dispatch => ({
  prepareForm: () => {
    dispatch(initialize('student-test', {
      student_questions: materialQuestions,
    }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'student-test', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(StudentOnlineTestQuestionsForm));
