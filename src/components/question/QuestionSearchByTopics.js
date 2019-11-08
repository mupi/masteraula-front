import React, { Component } from 'react';
import { reduxForm /* Form, Field */ } from 'redux-form';
import {
  Input, Row, Col, UncontrolledTooltip, Label, Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MAAutocompleteTopics from 'components/autocomplete/MAAutocompleteTopics';

// Select for Discipline
/* const renderSelectField = ({
  input, label, meta: { touched, error }, children, optionDefault, className,
}) => (
  <div>
    <div>
      <select {...input} className={className}>
        <option value={optionDefault}>
          {label}
        </option>
        {children}
      </select>
      {touched && error && (
      <span className="error-message-text">
          {error}
      </span>
      )}
    </div>
  </div>
);
*/

class QuestionSearchByTopics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorState: '',
      onlyMyQuestionsState: false,
      visible: 2,
    };

    this.handleFilter = this.handleFilter.bind(this);
    this.loadMoreTopics = this.loadMoreTopics.bind(this);
  }

  componentDidMount() {
    const {
      listDisciplineFilters,
    } = this.props;
    listDisciplineFilters();
  }

  getListTopics = (event) => {
    const {
      listTopicFilters, addSelectedDisciplineFilter, resetTopicListSelected,
    } = this.props;

    if (event.target.value > 0) {
      const disciplineSelected = [{
        id: event.target.value,
      }];
      listTopicFilters(disciplineSelected);
      this.setState({ visible: 5 });
    }

    addSelectedDisciplineFilter(event.target.value);
    resetTopicListSelected();
  }

  getExplodeListTopic = (topic) => {
    const {
      disciplinesSelected, topicsSelected, addSelectedTopicFilter, listTopicFilters,
    } = this.props;

    addSelectedTopicFilter(topic);
    listTopicFilters(disciplinesSelected, [...topicsSelected, topic]);
    this.setState({ visible: 5 });
  }

  handleFilter(event) {
    const { addMyQuestionsFilter, author } = this.props;
    const valueFilter = event.target.value;
    this.setState({ authorState: author });

    addMyQuestionsFilter(valueFilter, event.target.checked);
  }

  loadMoreTopics() {
    this.setState(prev => ({ visible: prev.visible + 5 }));
  }


  render() {
    const {
      search, author, isFetchingQuestions, onlyMyQuestions, disciplineFilters, topicFilters, disciplineIdSelected, moreTopicFilters,
    } = this.props;

    const { visible } = this.state;

    const { authorState, onlyMyQuestionsState } = this.state;
    const isChecked = (onlyMyQuestions === undefined ? onlyMyQuestionsState : onlyMyQuestions);
    const maxTopicShown = 20;

    return (
      <>
        <Row>
          <Col sm="12" className="c-question-base__title d-flex justify-content-between">
            <div className="p-2" />
            <div className="p-2">
              <h4>
                Banco de Questões
                {' '}
              </h4>
            </div>
            <div className="p-2 c-question-base__l-tooltip">
              <span className="c-question-base__tooltip" href="#" id="TooltipExample">
                <FontAwesomeIcon icon="info-circle" />
              </span>
              <UncontrolledTooltip className="tooltip__message" placement="right" target="TooltipExample">
                Insira termos específicos sobre o que deseja encontrar - o sistema buscará nas tags e em todos os textos das questões.
                {' '}
                Ex: ângulos internos. Se desejar buscas mais abrangentes, separe os termos com vírgulas. Exemplo: polígonos, ângulos internos.
                {' '}
                Combine os termos da busca com as opções de filtro disponíveis na barra lateral.
              </UncontrolledTooltip>
            </div>
          </Col>
        </Row>
        <Row className="c-create-question__row-info">
          <Col sm="12" xs="12">
            { /* <Field
              name="discipline"
              type="text"
              component={renderSelectField}
              label="Selecione uma disciplina"
              optionDefault="-1"
              className="form-control question-search__by-discipline-select"
              onChange={this.getListTopics}
            >
              { disciplineFilters && disciplineFilters.map(discipline => (
                <option className="c-user-profile__state-city-dropdown-item" key={discipline.id} value={discipline.id}>
                  {discipline.name}
                </option>
              )) }
            </Field> */ }
            <div>
              <select
                type="text"
                name="discipline"
                className="form-control question-search__by-discipline-select"
                onChange={this.getListTopics}
                value={disciplineIdSelected || -1}
              >
                <option value="-1">
                    Selecione uma disciplina
                </option>
                { disciplineFilters && disciplineFilters.map(discipline => (
                  <option className="c-user-profile__state-city-dropdown-item" key={discipline.id} value={discipline.id}>
                    {discipline.name}
                  </option>
                )) }
              </select>
            </div>
          </Col>
        </Row>
        <Row className="c-question-base__myquestions-filter">
          <Label check>
            <Input
              type="checkbox"
              value={authorState || author}
              onChange={this.handleFilter}
              checked={isChecked}
              disabled={isFetchingQuestions}
            />

            {'Pesquisar só nas ' }
            <strong>
              {'"Minhas questões"'}
            </strong>
          </Label>
        </Row>
        <Row>
          <Col>
            {(topicFilters && topicFilters.length > 0) ? (
              <>
                <div className="tiles" aria-live="polite">
                  {topicFilters.slice(0, visible).map(topic => (
                    <Button
                      key={topic.id}
                      className="question-card__info-section-item question-card__info-section-item--green"
                      onClick={() => this.getExplodeListTopic(topic)}
                    >
                      <span>{topic.name.trim()}</span>
                    </Button>
                  ))}
                </div>
                <div>
                  { visible < maxTopicShown && visible <= topicFilters.length
                    && <Button color="link" onClick={this.loadMoreTopics} className="load-more">Ver mais tópicos</Button>}
                  { visible >= maxTopicShown && moreTopicFilters
                    && (
                    <>
                      <span className="c-question-base__text-topicsearch">Buscador de tópicos:</span>
                      <MAAutocompleteTopics {...this.props} />
                    </>
                    )}
                </div>
              </>
            ) : ''}
          </Col>
        </Row>
        {search ? (
          <Row>
            <Col sm="12">
              <p className="c-question-base__keywords-title">
                <span>Resultado da busca para:</span>
                <span className="c-question-base__keywords">
                  {' '}
                  {search}
                </span>
              </p>
            </Col>
          </Row>
        ) : ''
      }
      </>
    );
  }
}

export default reduxForm({
  form: 'questionSearchByTopics',
})(QuestionSearchByTopics);
