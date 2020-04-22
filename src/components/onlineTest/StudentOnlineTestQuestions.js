import React from 'react';
// import PropTypes from 'prop-types';
import { getCleanCompleteStatement, getCleanLearningObjectSource } from 'helpers/question';

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
        image: 'http://localhost:8000/media/masteraula/cpcon2008quimica/img68.png',
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
        image: 'http://localhost:8000/media/masteraula/default/img69.png',
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

const StudentOnlineTestQuestionMaterial = ({ group }) => (
  /* eslint-disable react/no-danger */
  <div className="student-online__section">

    {group.learning_objects && group.learning_objects.map(learningObject => (

      <div key={learningObject.id}>

        {(learningObject.image) ? (
          <div>
            <img alt="objeto-aprendizagem" className="c-learning-object__img" src={learningObject.image} />
          </div>
        ) : ''}

        {(learningObject.text) ? (
          <div>
            <div dangerouslySetInnerHTML={{ __html: getCleanCompleteStatement(learningObject.text) }} />
          </div>
        ) : ''}
        {(learningObject.source) ? (
          <div className="c-learning-object--source">
            <div dangerouslySetInnerHTML={{ __html: getCleanLearningObjectSource(learningObject.source) }} />
          </div>
        ) : ''}
      </div>
    ))
        }
  </div>

);

const StudentOnlineTestQuestions = () => (
  <>
    {materialQuestions && materialQuestions.map(group => (
      <StudentOnlineTestQuestionMaterial group={group} />
    ))}
  </>
);
/*
StudentOnlineTestQuestions.propTypes = {
  studentOnlineTest: PropTypes.shape(),
};

StudentOnlineTestQuestions.defaultProps = {
  studentOnlineTest: null,
};
*/
export default StudentOnlineTestQuestions;
