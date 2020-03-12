import React, { Component } from 'react';
import { reduxForm /* Form, Field */ } from 'redux-form';
import {
  Input, Row, Col, Label, Button, UncontrolledTooltip,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QuestionSearchTextContainer from 'containers/QuestionSearchTextContainer';
import { history } from 'helpers';

class QuestionSearchByFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorState: '',
      onlyMyQuestionsState: false,
      visible: 10,
    };

    this.handleFilter = this.handleFilter.bind(this);
    this.loadMoreTopics = this.loadMoreTopics.bind(this);
  }

  componentDidMount() {
    const {
      listDisciplineFilters, listSourceFilters, listYearFilters, listTeachingLevelFilters,
    } = this.props;
    listDisciplineFilters();
    listSourceFilters();
    listYearFilters();
    listTeachingLevelFilters();
  }

  componentDidUpdate(prevProps) {
    const {
      filter,
    } = this.props;


    if ((filter.disciplinesSelected.length > 0) && ((filter.disciplinesSelected !== prevProps.filter.disciplinesSelected)
    || (filter.teachingLevelsSelected !== prevProps.filter.teachingLevelsSelected)
    || (filter.sourcesSelected !== prevProps.filter.sourcesSelected)
    || (filter.yearsSelected !== prevProps.filter.yearsSelected)
    || (filter.topicsSelected !== prevProps.filter.topicsSelected)
    || (filter.difficultiesSelected !== prevProps.filter.difficultiesSelected)
    || (filter.onlyMyQuestions !== prevProps.filter.onlyMyQuestions))) {
      /* eslint-disable react/no-did-update-set-state */
      this.setState({ visible: 10 });
    }
  }

  // 1st time that discipline is selected
  getListTopics = (event, addSelectedFilter) => {
    /* const {
      resetTopicListSelected,
    } = this.props;
    */
    if (event.target.value > 0) {
      this.setState({ visible: 10 });
    }
    history.push('/question-base/1');
    addSelectedFilter(event.target.value);
    // resetTopicListSelected();
  }

  getExplodeListTopic = (topic) => {
    const {
      addSelectedTopicFilter,
    } = this.props;

    addSelectedTopicFilter(topic);
    this.setState({ visible: 10 });
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
      author, isFetchingQuestions, onlyMyQuestions, disciplineFilters, topicFilters,
      disciplineIdSelected, sourceIdSelected, yearIdSelected,
      addSelectedDisciplineFilter,
      addSelectedSourceFilter,
      addSelectedYearFilter,
      filter,
    } = this.props;

    const { visible } = this.state;

    const { authorState, onlyMyQuestionsState } = this.state;
    const isChecked = (onlyMyQuestions === undefined ? onlyMyQuestionsState : onlyMyQuestions);

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
              Combine os termos da busca com as opções de filtro disponíveis.
              </UncontrolledTooltip>
            </div>
          </Col>
        </Row>
        <QuestionSearchTextContainer />
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

        <Row className="mb-2">
          <Col>
            {(topicFilters && topicFilters.length > 0) ? (
              <>
                <div className="tiles">
                  {topicFilters.slice(0, visible).map(topic => (
                    <Button
                      key={topic.id}
                      className="question-card__info-section-item question-card__info-section-item--green"
                      onClick={() => this.getExplodeListTopic(topic)}
                    >
                      <span>{`${topic.name.trim()} (${topic.num_questions})`}</span>
                    </Button>
                  ))}
                </div>
              </>
            ) : ''}
          </Col>
        </Row>

        <Row>
          <Col sm="4" col="12" className="mb-2">
            <select
              type="text"
              name="discipline"
              className="form-control question-search__by-filter-select"
              onChange={e => this.getListTopics(e, addSelectedDisciplineFilter)}
              value={disciplineIdSelected || -1}
              disabled={isFetchingQuestions}
            >
              <option value="-1">
                     Todas as disciplinas
              </option>
              { disciplineFilters && disciplineFilters.map(discipline => (
                <option className="c-user-profile__state-city-dropdown-item" key={discipline.id} value={discipline.id}>
                  {discipline.name}
                </option>
              )) }
            </select>
          </Col>
          <Col sm="4" col="12" className="mb-2">
            <select
              type="text"
              name="source"
              className="form-control question-search__by-filter-select"
              onChange={e => this.getListTopics(e, addSelectedSourceFilter)}
              value={sourceIdSelected || -2}
              disabled={isFetchingQuestions}
            >
              <option value="-1">
                     Todos os vestibulares
              </option>
              { filter.sourceFilters && filter.sourceFilters.map(source => (
                <option className="c-user-profile__state-city-dropdown-item" key={source.id} value={source.id}>
                  {source.name}
                </option>
              )) }
            </select>
          </Col>
          <Col sm="4" col="12" className="mb-2">
            <select
              type="text"
              name="year"
              className="form-control question-search__by-filter-select"
              onChange={e => this.getListTopics(e, addSelectedYearFilter)}
              value={yearIdSelected || -2}
              disabled={isFetchingQuestions}
            >
              <option value="-1">
                    Todos os anos
              </option>
              { filter.yearFilters && filter.yearFilters.map(year => (
                <option className="c-user-profile__state-city-dropdown-item" key={year.id} value={year.id}>
                  {year.name}
                </option>
              )) }
            </select>
          </Col>

        </Row>
      </>
    );
  }
}

export default reduxForm({
  form: 'questionSearchByFilters',
})(QuestionSearchByFilters);
