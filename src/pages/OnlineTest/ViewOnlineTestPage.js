import React, { useEffect } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import BackUsingHistory from 'components/question/BackUsingHistory';
import {
  Alert, Row, Col, Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import OnlineTestBasicInfo from 'components/onlineTest/OnlineTestBasicInfo';
import OnlineTestQuestions from 'components/onlineTest/OnlineTestQuestions';

const activeOnlineTest = {
  id: 1,
  link: 'http://www.masteraula.com.br/rtYBYZwAb',
  document: {
    id: 77,
    name: 'Prova de Português',
  },
  name: 'Prova de Português - online',
  owner: {
    email: 'cp.rosaless@gmail.com',
    name: 'Pamela Rosales Sedano',
    pk: 8,
    username: 'cp.rosaless@gmail.com',
  },
  create_date: '2020/03/26',
  start_date: '2020/03/26',
  finish_date: '2020/04/26',
  duration: '120',
  questions_quantity: '2',
  types_questions: null,
  media_questions: null,
  score_questions: 20,
  questions: [
    {
      score: 5,
      media: null,
      type: null,
      id: 4548,
      question: {
        id: 11,
        author: {
          pk: 1,
          username: 'suporte@mupi.me',
          email: 'suporte@mupi.me',
          name: 'Masteraula',
        },
        authorship: null,
        create_date: '2018/09/03',
        statement: '<p> Julgue os itens a seguir utilizando (C) para certo e (E) para errado, relativos à amônia e o processo Haber-Bosch.</p>\r\n<p>( ) A amônia é classificada como um composto orgânico heterogêneo, pois apresenta o heteroátomo nitrogênio em sua estrutura. </p>\r\n<p>( ) É quimicamente impossível obter-se ácido nítrico a partir da amônia, tendo em vista que esta ultima é uma base. </p>\r\n<p>( ) Fritz Haber foi devidamente reconhecido como um importante químico para o mundo em seu tempo, chegando a ser congratulado em 1918 com o premio Nobel de química, devido à grande contribuição com a obtenção do Zyklon B e de outras substâncias de aplicações semelhantes. </p>\r\n<p>( ) Uma grande importância da amônia nos tempos de Haber, assim como é ainda hoje, foi sua aplicação para a produção de produtos essenciais aos humanos, como os fertilizantes, hoje tão importantes para a produção de alimentos no mundo. </p>\r\n<p>( ) O processo de produção da amônia desenvolvido por Haber e aperfeiçoado por Bosch teve influência direta na Primeira Guerra Mundial chegando a prolongá-la.</p>\r\n<p>Indique a seqüência correta</p>',
        learning_objects: [
          {
            id: 90,
            owner: 1,
            source: 'Extraído do Vestibular UEPB - 2008.',
            image: null,
            text: '<p>Fritz Haber, prêmio Nobel de química em 1918, ficou famoso por causa da síntese da amônia a partir do nitrogênio atmosférico, alguns meses antes da Primeira Guerra Mundial (1914-1918). A produção inicial, entre três e cinco toneladas de nitrato, aumentou rapidamente com as contribuições de Carl Bosch: em 1918 ultrapassava 300.000 toneladas anuais. O processo Haber-Bosch é uma reação entre o nitrogênio e o hidrogênio para produzir amoníaco. Esta reação é catalisada pelo ferro, sob as condições de 200 atmosferas de pressão e uma temperatura de 450°C.</p>\r\n\r\n<p> Sem a produção de amônia, a Alemanha teria sido derrotada na I Grande Guerra antes de 1916 por falta de nitrato (utiliza amônia como reagente), devido ao bloqueio marítimo inglês. Atualmente, o maior consumo de amônia é na produção de fertilizantes. Além da síntese da amônia, Haber e sua equipe, com a desculpa de lutar contra as pragas e insetos, elaboraram armas químicas, dentre elas o funesto Zyklon B.</p>',
            tags: [
              {
                name: 'Inseticidas',
              },
            ],
            object_types: [
              'T',
            ],
            questions_quantity: 2,
          },
        ],
        resolution: '',
        difficulty: 'M',
        alternatives: [
          {
            id: 15,
            text: 'C E E C E',
            is_correct: false,
          },
          {
            id: 16,
            text: 'E E C C C',
            is_correct: false,
          },
          {
            id: 17,
            text: 'E E E C C',
            is_correct: true,
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
        topics: [
          {
            id: 2638,
            name: 'Obtenção de Ácidos',
            parent: {
              id: 2634,
              name: 'Ácidos Inorgânicos',
              parent: {
                id: 2624,
                name: 'Funções Inorgânicas',
                parent: null,
              },
            },
          },
          {
            id: 3681,
            name: 'Química Descritiva',
            parent: {
              id: 3680,
              name: 'Processo Haber-Bosch',
              parent: {
                id: 2666,
                name: 'Reações Químicas',
                parent: null,
              },
            },
          },
          {
            id: 2823,
            name: 'Reações de Óxido-Redução',
            parent: {
              id: 2820,
              name: 'Óxido-Redução',
              parent: null,
            },
          },
        ],
        labels: [

        ],
        all_topics: [
          {
            id: 3681,
            name: 'Química Descritiva',
            parent: {
              id: 3680,
              name: 'Processo Haber-Bosch',
              parent: {
                id: 2666,
                name: 'Reações Químicas',
                parent: null,
              },
            },
          },
        ],
        tags: [
          {
            name: 'nitrato',
          },
        ],
        disabled: false,
      },
    }, {
      score: 15,
      media: null,
      type: null,
      id: 4548,
      question: {
        id: 11,
        author: {
          pk: 1,
          username: 'suporte@mupi.me',
          email: 'suporte@mupi.me',
          name: 'Masteraula',
        },
        authorship: null,
        create_date: '2018/09/03',
        statement: '<p>A amônia é classificada como um composto orgânico heterogêneo, pois apresenta o heteroátomo nitrogênio em sua estrutura. </p>\r\n<p>( ) É quimicamente impossível obter-se ácido nítrico a partir da amônia, tendo em vista que esta ultima é uma base. </p>\r\n<p>( ) Fritz Haber foi devidamente reconhecido como um importante químico para o mundo em seu tempo, chegando a ser congratulado em 1918 com o premio Nobel de química, devido à grande contribuição com a obtenção do Zyklon B e de outras substâncias de aplicações semelhantes. </p>\r\n<p>( ) Uma grande importância da amônia nos tempos de Haber, assim como é ainda hoje, foi sua aplicação para a produção de produtos essenciais aos humanos, como os fertilizantes, hoje tão importantes para a produção de alimentos no mundo. </p>\r\n<p>( ) O processo de produção da amônia desenvolvido por Haber e aperfeiçoado por Bosch teve influência direta na Primeira Guerra Mundial chegando a prolongá-la.</p>\r\n<p>Indique a seqüência correta</p>',
        learning_objects: [
          {
            id: 90,
            owner: 1,
            source: 'Extraído do Vestibular UEPB - 2008.',
            image: null,
            text: '<p>Fritz Haber, prêmio Nobel de química em 1918, ficou famoso por causa da síntese da amônia a partir do nitrogênio atmosférico, alguns meses antes da Primeira Guerra Mundial (1914-1918). A produção inicial, entre três e cinco toneladas de nitrato, aumentou rapidamente com as contribuições de Carl Bosch: em 1918 ultrapassava 300.000 toneladas anuais. O processo Haber-Bosch é uma reação entre o nitrogênio e o hidrogênio para produzir amoníaco. Esta reação é catalisada pelo ferro, sob as condições de 200 atmosferas de pressão e uma temperatura de 450°C.</p>\r\n\r\n<p> Sem a produção de amônia, a Alemanha teria sido derrotada na I Grande Guerra antes de 1916 por falta de nitrato (utiliza amônia como reagente), devido ao bloqueio marítimo inglês. Atualmente, o maior consumo de amônia é na produção de fertilizantes. Além da síntese da amônia, Haber e sua equipe, com a desculpa de lutar contra as pragas e insetos, elaboraram armas químicas, dentre elas o funesto Zyklon B.</p>',
            tags: [
              {
                name: 'Inseticidas',
              },
            ],
            object_types: [
              'T',
            ],
            questions_quantity: 2,
          },
        ],
        resolution: '',
        difficulty: 'M',
        alternatives: [
          {
            id: 15,
            text: 'C E E C E',
            is_correct: false,
          },
          {
            id: 16,
            text: 'E E C C C',
            is_correct: false,
          },
          {
            id: 17,
            text: 'E E E C C',
            is_correct: true,
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
        topics: [
          {
            id: 2638,
            name: 'Obtenção de Ácidos',
            parent: {
              id: 2634,
              name: 'Ácidos Inorgânicos',
              parent: {
                id: 2624,
                name: 'Funções Inorgânicas',
                parent: null,
              },
            },
          },
          {
            id: 3681,
            name: 'Química Descritiva',
            parent: {
              id: 3680,
              name: 'Processo Haber-Bosch',
              parent: {
                id: 2666,
                name: 'Reações Químicas',
                parent: null,
              },
            },
          },
          {
            id: 2823,
            name: 'Reações de Óxido-Redução',
            parent: {
              id: 2820,
              name: 'Óxido-Redução',
              parent: null,
            },
          },
        ],
        labels: [

        ],
        all_topics: [
          {
            id: 3681,
            name: 'Química Descritiva',
            parent: {
              id: 3680,
              name: 'Processo Haber-Bosch',
              parent: {
                id: 2666,
                name: 'Reações Químicas',
                parent: null,
              },
            },
          },
        ],
        tags: [
          {
            name: 'nitrato',
          },
        ],
        disabled: false,
      },
    },
  ],
};

const ViewOnlineTestPage = (props) => {
  const {
    isFetchingOnlineTest, fetchOnlineTest, match /* activeOnlineTest */, showDeleteModal, userId,
  } = props;


  useEffect(() => {
    fetchOnlineTest(match.params.id);
  }, []);

  if (isFetchingOnlineTest) {
    return (
      <HomeUserPage>
        <Alert className="alert--warning" color="warning">
            Carregando ...
        </Alert>
      </HomeUserPage>
    );
  }

  if (!activeOnlineTest || activeOnlineTest.disabled) {
    return (
      <HomeUserPage>
        <Alert color="danger">
            A prova online não existe ou não está mais disponível
        </Alert>
      </HomeUserPage>
    );
  }

  const authorPK = (activeOnlineTest && activeOnlineTest.owner) ? activeOnlineTest.owner.pk : 'Anônimo';
  const isOwner = (authorPK === userId);
  const optionsQuestion = {
    showViewButton: true,
    removeOption: false,
    showTag: true,
    showScore: true,
  };
  return (
    <HomeUserPage>
      <div className="c-online">
        <Row className="c-online__row-header-options c-online__row-header-options--fixed">
          <Col className="c-online__col-header-options">
            <BackUsingHistory />
            { (isOwner)
              ? (
                <Button
                  className="c-question__btn-remove-question"
                  color="danger"
                  onClick={() => showDeleteModal(activeOnlineTest.id, activeOnlineTest.name, activeOnlineTest.document.id)}
                  title="Apagar prova online"
                >
                  <FontAwesomeIcon icon="trash-alt" />
                  {' '}
                    Apagar
                </Button>
              ) : ''}
            {(isOwner)
              ? (
                <Link
                  className="btn btn-secondary c-question__btn-back"
                  to={`/edit-online/${activeOnlineTest.id}`}
                >
                  <FontAwesomeIcon icon="pencil-alt" className="btn__icon" />
                  {' '}
                  Editar
                </Link>
              ) : ''}

            <Link
              className="btn btn-secondary c-question__btn-back"
              to={`/apply-online/${activeOnlineTest.id}`}
            >
              <FontAwesomeIcon icon="eye" className="btn__icon" />
              {' '}
              Pré-visualizar
            </Link>
          </Col>
        </Row>
        <Row className="c-question__tittle-section c-question--space-for-titlequestion mb-4">
          <Col>
            <h4>
              <FontAwesomeIcon icon="laptop" />
              {' '}
              {'Prova Online : '}
              <span className="c-online__name">{activeOnlineTest.name}</span>
            </h4>
            <p style={{ marginBottom: '0px' }}>
              {'Derivada da prova: '}
              <strong className="c-online__base-name">{activeOnlineTest.document.name}</strong>
            </p>
          </Col>
        </Row>
        <OnlineTestBasicInfo onlineTest={activeOnlineTest} />
        <OnlineTestQuestions questions={activeOnlineTest.questions} options={optionsQuestion} />
      </div>
    </HomeUserPage>
  );
};

export default ViewOnlineTestPage;
