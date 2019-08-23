import QuestionContent from 'components/question/QuestionContent';
import QuestionInfo from 'components/question/QuestionInfo';
import AddQuestionButton from 'components/buttons/AddQuestionButton';
import RemoveQuestionButton from 'components/buttons/RemoveQuestionButton';
import DeleteQuestionButtonContainer from 'containers/DeleteQuestionButtonContainer';
import {
  Alert, Row, Col,
} from 'reactstrap';
import { isQuestionAdded } from 'helpers/question';
import React, { Component } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import BackUsingHistory from 'components/question/BackUsingHistory';
import RelatedQuestions from 'components/question/RelatedQuestions';
import { history } from 'helpers/history';

const relatedQuestionEmpty = [];

const relatedQuestions = [
  {
    id: 1768,
    author: {
      pk: 1,
      username: 'admin',
      email: 'suporte@mupi.me',
      name: 'Mupi',
    },
    create_date: '2018/09/03',
    statement: '<p>A crise do lixo na Itália reflete</p>',
    learning_objects: [
      {
        id: 474,
        owner: 1,
        source: 'Disponível em http://www.mafiadolixo.adm.br/default.asp. <em>Acessado em 8 de Julho de 2008</em>.',
        image: null,
        text: '<p>“Hoje a cidade de Nápoles assemelha-se a uma enorme lixeira. As autoridades napolitanas não sabem para onde levar os resíduos sólidos domiciliares produzidos pela cidade. [...] Sem saber o que fazer com o seu lixo, e com o receio crescente de epidemias, muitos habitantes já começaram a queimar os resíduos domiciliares, fazendo aumentar o rol de perigos associados ao problema, como a libertação de substâncias potencialmente cancerígenas para a atmosfera. Esta situação, com proporções mais preocupantes em Nápoles, afeta, no entanto, toda a região italiana da Campânia."</p>',
        tags: [],
      },
    ],
    resolution: '',
    difficulty: 'M',
    alternatives: [
      {
        id: 7843,
        text: 'a importância adquirida pelos ambientalistas, que pressionam os governos dos países ricos por soluções para um desenvolvimento sustentável a nível global.',
        is_correct: false,
      },
      {
        id: 7844,
        text: 'a falta de consciência ecológica por parte da população italiana, que, tal como a população dos países subdesenvolvidos, não se preocupa com o destino do lixo que produz.',
        is_correct: false,
      },
      {
        id: 7845,
        text: 'a força do poder paralelo que tenta desestabilizar o governo italiano diante da população, já que é a Gamorra (a máfia local) quem controla os aterros sanitários da região.',
        is_correct: false,
      },
      {
        id: 7846,
        text: 'o dilema da atual sociedade de consumo que dilapida o planeta na produção de necessidades supérfluas e de produtos descartáveis, mas não encontra soluções viáveis e ambientalmente sustentáveis para a enorme quantidade de lixo que produz.',
        is_correct: true,
      },
      {
        id: 7847,
        text: 'um problema típico dos países ricos europeus, que dispõem de pouco espaço para fazer aterros sanitários, a solução mais viável para destinar a grande quantidade de lixo que produzem sem agredir o meio-ambiente.',
        is_correct: false,
      },
    ],
    disciplines: [
      {
        id: 6,
        name: 'Geografia',
        slug: 'Geo',
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
    topics: [],
    all_topics: [],
    tags: [],
    disabled: false,
  },
  {
    id: 5177,
    author: {
      pk: 1,
      username: 'admin',
      email: 'suporte@mupi.me',
      name: 'Mupi',
    },
    create_date: '2018/09/03',
    statement: 'Um carro esportivo é financiado pelo Japão, projetado na Itália e montado em Indiana, México e França, usando os mais avançados componentes eletrônicos, que foram inventados em Nova Jérsei e fabricados na Coreia. A campanha publicitária é desenvolvida na Inglaterra, filmada no Canadá, a edição e as cópias, feitas em Nova York para serem veiculadas no mundo todo. Teias globais disfarçam-se com o uniforme nacional que lhes for mais conveniente. <br><br>REICH, R. <strong>O trabalho das nações</strong>: preparando-nos para o capitalismo no século XXI. São Paulo: Educator, 1994 (adaptado). <br><br>A viabilidade do processo de produção ilustrado pelo texto pressupõe o uso de<br><br> ',
    learning_objects: [],
    resolution: '',
    difficulty: 'M',
    alternatives: [
      {
        id: 23339,
        text: 'linhas de montagem e formação de estoques. ',
        is_correct: false,
      },
      {
        id: 23340,
        text: 'empresas burocráticas e mão de obra barata. ',
        is_correct: false,
      },
      {
        id: 23341,
        text: 'controle estatal e infraestrutura consolidada ',
        is_correct: false,
      },
      {
        id: 23342,
        text: 'organização em rede e tecnologia de informação. ',
        is_correct: true,
      },
      {
        id: 23343,
        text: 'gestão centralizada e protecionismo econômico. ',
        is_correct: false,
      },
    ],
    disciplines: [
      {
        id: 6,
        name: 'Geografia',
        slug: 'Geo',
      },
    ],
    teaching_levels: [
      {
        id: 4,
        name: 'Ensino Médio',
        slug: 'EM',
      },
    ],
    year: 2015,
    source: 'ENEM',
    topics: [],
    all_topics: [],
    tags: [],
    disabled: false,
  },
  {
    id: 1180,
    author: {
      pk: 1,
      username: 'admin',
      email: 'suporte@mupi.me',
      name: 'Mupi',
    },
    create_date: '2018/09/03',
    statement: '<p>Analise as cinco afirmações feitas a respeito do tema estampado no mapa:</p>\r\n<br/>\r\n\r\n<p>I. Durante esse período, a América Central se transformou numa importante região imigratória.</p>\r\n<p>II. O Japão e a China também participaram deste período, com expressivo contingente populacional se deslocando para a América do Sul.</p>\r\n<p>III. O maior contingente migratório se deslocou para os Estados Unidos, saindo principalmente da Grã-Bretanha e da Itália.</p>\r\n<p>IV. O fim gradual da escravidão no continente americano e a demanda por mão de obra para substituir os escravos, associada à primeira revolução dos transportes, constituiram elementos que estimularam e intensificaram o fluxo migratório europeu.</p>\r\n<p>V. No final do século XIX, muitos europeus emigraram em direção ao continente americano para fugir das crises agrícolas, da pobreza e das perseguições.</p>\r\n\r\n<br/>\r\n<p>Estão corretas apenas as afirmações:</p>',
    learning_objects: [
      {
        id: 418,
        owner: 1,
        source: 'Marie-Françoise Durand et al. <strong>Atlas da Mundialização: compreender o espaço mundial contemporâneo</strong>, 2009. Adaptado',
        image: 'http://localhost:8000/media/masteraula/unesp2011-1/418-source.png',
        text: '<p class="text-center">A grande migração transatlântica, final do séc. XIX e início do séc. XX</p>',
        tags: [],
      },
    ],
    resolution: '',
    difficulty: 'M',
    alternatives: [
      {
        id: 5227,
        text: 'I, II e III.',
        is_correct: false,
      },
      {
        id: 5228,
        text: 'II e V.',
        is_correct: false,
      },
      {
        id: 5229,
        text: 'III, IV e V.',
        is_correct: true,
      },
      {
        id: 5230,
        text: 'I, III, IV e V.',
        is_correct: false,
      },
      {
        id: 5231,
        text: 'II, III, IV e V.',
        is_correct: false,
      },
    ],
    disciplines: [
      {
        id: 5,
        name: 'História',
        slug: 'His',
      },
    ],
    teaching_levels: [
      {
        id: 4,
        name: 'Ensino Médio',
        slug: 'EM',
      },
    ],
    year: 2011,
    source: 'UNESP',
    topics: [],
    all_topics: [],
    tags: [],
    disabled: false,
  },
  {
    id: 4656,
    author: {
      pk: 1,
      username: 'admin',
      email: 'suporte@mupi.me',
      name: 'Mupi',
    },
    create_date: '2018/09/03',
    statement: '<p>A União Européia resulta de um processo que se inicia em 1950 com a criação da Comunidade Européia do Carvão e do Aço e se concretiza em novembro de 1993 quando entrou em vigor o tratado de Maastricht. Com base no seu conhecimento e com o auxílio do Cartograma abaixo assinale com V as proposições VERDADEIRAS e com F as FALSAS, referentes à formação deste bloco econômico.</p>\r\n\r\n<p>( ) Em 1951 formava-se a Europa dos Seis, com a assinatura do tratado de Roma, que instituía a Comunidade Econômica Européia, da qual faziam parte a Inglaterra, Irlanda, França, Alemanha, Itália e Suíça.</p>\r\n\r\n<p>( ) Em 1973 dá-se o alargamento da Comunidade Européia, com o ingresso dos países ibéricos e da Grécia.</p>\r\n\r\n<p>( ) Em 1995 temos a formação da Europa dos Quinze, com a entrada da Áustria e de dois países escandinavos.</p>\r\n\r\n<p>( ) A partir de 2004 a União Européia se amplia com a admissão de países ex-socialistas do Leste Europeu, cuja aquisição mais recente são Bulgária e Romênia, totalizando hoje 27 países.</p>\r\n\r\n<p>A seqüência correta das assertivas é</p>',
    learning_objects: [
      {
        id: 1997,
        owner: 1,
        source: 'Extraído do Vestibular UEPB 2007',
        image: 'http://localhost:8000/media/masteraula/default/1997.jpg',
        text: '<p class="text-center">EVOLUÇÃO DA UNIÃO EUROPÉIA</p>',
        tags: [],
      },
    ],
    resolution: '',
    difficulty: 'M',
    alternatives: [
      {
        id: 20963,
        text: 'F F F F',
        is_correct: false,
      },
      {
        id: 20964,
        text: 'F F V V',
        is_correct: true,
      },
      {
        id: 20965,
        text: 'V V V V',
        is_correct: false,
      },
      {
        id: 20966,
        text: 'F V V F',
        is_correct: false,
      },
      {
        id: 20967,
        text: 'V F F V',
        is_correct: false,
      },
    ],
    disciplines: [
      {
        id: 6,
        name: 'Geografia',
        slug: 'Geo',
      },
    ],
    teaching_levels: [
      {
        id: 4,
        name: 'Ensino Médio',
        slug: 'EM',
      },
    ],
    year: 2007,
    source: 'UEPB',
    topics: [],
    all_topics: [],
    tags: [],
    disabled: false,
  },
];
const QuestionListDocuments = (props) => {
  const { activeQuestion, activeDocument } = props;
  const listDocumentFilter = ((activeDocument && activeQuestion.documents)
    ? activeQuestion.documents.filter(item => item.id !== activeDocument.id) : activeQuestion.documents);

  return (
    activeQuestion.documents && listDocumentFilter.length > 0
      ? (
        <Row className="c-question__list-documents">
          <Col className="c-question__add-question-rectangle">
            <p>
              Essa questão também está em suas provas:
              {' '}
              <strong>
                {listDocumentFilter.map(item => item.name).join(', ')}
              </strong>
            </p>
          </Col>
        </Row>
      ) : ''
  );
};

const ShowAddRemoveButton = (props) => {
  const { activeQuestion, activeDocument, removeSelectedQuestion } = props;
  return (
    isQuestionAdded(activeDocument, activeQuestion.id)
      ? (
        <Col className="c-question__add-question-rectangle">
          <h6 className="c-question__add-question-title">
            Esta questão foi adicionada à prova
            {' '}
            <strong>
              {activeDocument.name}
            </strong>
          </h6>
          <RemoveQuestionButton
            questionId={activeQuestion.id}
            activeDocumentId={activeDocument.id}
            removeSelectedQuestion={removeSelectedQuestion}
            label={(
              <span>
                <FontAwesomeIcon icon="minus" className="btn__icon" />
                Remover
              </span>
                        )}
            customClass="c-question__btn-remove-question"
          />
        </Col>
      ) : ''
  );
};

const redirectURL = (e, role, isOwner, idQuestion) => {
  let url = '';
  e.preventDefault();
  if (isOwner) {
    url = `/edit-question/${idQuestion}`;
  } else if (role && role.includes('Editores')) {
    url = `/classify-question/${idQuestion}`;
  }

  history.push(url);
};

// Learning object's options available for LearnningObjectContent
const options = {
  showOperations: true,
  showViewButton: true,
  showCreateQuestionButton: true,
  removeOption: false,
  showTitle: false,
};

class QuestionPage extends Component {
  componentDidMount() {
    const { fetchQuestion, match } = this.props;
    fetchQuestion(match.params.id);
    // history.push(`/view-question/${match.params.id}`);
  }

  render() {
    const {
      userId, activeQuestion, isFetching, rating, error, onRate, activeDocument, addSelectedQuestion,
      role, setQuestionIdToNewDocument, showModal, hideModal,
    } = this.props;

    const authorPk = (activeQuestion && activeQuestion.author) ? activeQuestion.author.pk : 'Anônimo';
    const isOwner = (authorPk === userId);

    if (isFetching) {
      return (
        <HomeUserPage>
          <Alert className="alert--warning" color="warning">
              Carregando ...
          </Alert>
        </HomeUserPage>
      );
    }

    if (error || !activeQuestion) {
      return (
        <HomeUserPage>
          <Alert color="danger">
              Erro na questão
          </Alert>
        </HomeUserPage>
      );
    }

    return (
      <HomeUserPage>
        <div className="c-question">
          <Row className="c-question__row-header-options c-question__row-header-options--fixed">
            <Col>
              <BackUsingHistory />
              { (isOwner && !activeQuestion.disabled)
                ? (
                  <DeleteQuestionButtonContainer
                    questionId={activeQuestion.id}
                    customClass={!activeQuestion.disabled ? 'c-question__btn-remove-question btn__icon' : 'c-question__btn-remove-question'}
                    label={(
                      <span>
                        <FontAwesomeIcon icon="trash-alt" className="btn__icon" />
                        Apagar
                      </span>
                    )}
                  />
                ) : ''}
              {(((role && role.includes('Editores')) || isOwner) && !activeQuestion.disabled)
                ? (
                  <Link
                    className="btn btn-secondary c-question__btn-back"
                    to="/"
                    onClick={(e) => { redirectURL(e, role, isOwner, activeQuestion.id); }}
                  >
                    <FontAwesomeIcon icon="pencil-alt" className="btn__icon" />
                    {' '}
                    Editar
                  </Link>
                ) : ''}
            </Col>
          </Row>
          <Row className="c-question__options c-question--space-for-questionyear">
            <Col className="d-flex  justify-content-end">
              <span className="c-question__label-tag-header c-question__tag--purple p-2">
                {activeQuestion.source}
                {' '}
                {activeQuestion.year}
              </span>
              {activeQuestion.disciplines && activeQuestion.disciplines.map(discipline => (
                <span
                  key={discipline.id}
                  className="c-question__label-tag-header c-question__tag--pink p-2"
                >
                  {discipline.name}
                </span>
              ))}
            </Col>

          </Row>
          <Row className="c-question__tittle-section">
            <Col>
              <h4>
                <FontAwesomeIcon icon="book" />
                {' '}
                Questão N°
                {' '}
                {activeQuestion.id}
              </h4>
            </Col>
          </Row>
          {activeQuestion.disabled ? (
            <Row>
              <Col className="c-question__col-full-section-details">
                <Alert color="warning" className="c-question-edit__warning-message">
                  A questão
                  {' '}
                  N°
                  <strong>{activeQuestion.id}</strong>
                  {' '}
                  não está mais disponível
                </Alert>
              </Col>
            </Row>
          ) : ''}
          <Row className="justify-content-center">
            <Col className="c-question__col-full-section-details" sm="12" md="12" xs="12">
              <QuestionContent
                alternatives={activeQuestion.alternatives}
                statement={activeQuestion.statement}
                resolution={activeQuestion.resolution}
                learningObjects={activeQuestion.learning_objects}
                options={options}
              />
              <div className="c-question__section-add-question">
                <Row>
                  {!isQuestionAdded(activeDocument, activeQuestion.id) && !activeQuestion.disabled ? (
                    <Col className="c-question__add-question-rectangle">
                      <h6 className="c-question__add-question-title">
                        Gostou da questão? Adicione a sua prova
                      </h6>
                      <AddQuestionButton
                        questionId={activeQuestion.id}
                        customClass="question-card__btn"
                        nameButton="Adicionar"
                        setQuestionIdToNewDocument={setQuestionIdToNewDocument}
                        activeDocument={activeDocument}
                        addSelectedQuestion={addSelectedQuestion}
                        showModal={showModal}
                        hideModal={hideModal}
                      />
                    </Col>
                  ) : (
                    <ShowAddRemoveButton {...this.props} />
                  )}
                </Row>
                <QuestionListDocuments activeQuestion={activeQuestion} activeDocument={activeDocument} />
              </div>
              <QuestionInfo question={activeQuestion} onRate={onRate} rating={rating} />
              {relatedQuestions && relatedQuestions.length > 0 ? (<RelatedQuestions rquestions={relatedQuestions} {...this.props} />) : ''}
            </Col>
          </Row>
        </div>
        <div className="l-button-add-question">
          {/* TODO: mobile only button */}
          {!isQuestionAdded(activeDocument, activeQuestion.id) ? (
            <AddQuestionButton
              questionId={activeQuestion.id}
              customClass="o-button-add-question-doc o-button-add-question-doc--xl"
              activeDocument={activeDocument}
              addSelectedQuestion={addSelectedQuestion}
              setQuestionIdToNewDocument={setQuestionIdToNewDocument}
              showModal={showModal}
              hideModal={hideModal}
            />
          ) : (
            <span className="btn question-card__added">
              <FontAwesomeIcon icon="check-circle" className="btn__icon" />
              Adicionada
            </span>
          )}
        </div>
      </HomeUserPage>
    );
  }
}
export default QuestionPage;
