import React, { Component } from 'react';
import {
  Input, Row, Col, Label, Button,
} from 'reactstrap';
import SearchTermsAutocomplete from 'components/question/SearchTermsAutocomplete';
import { history } from 'helpers';

class ClassPlanSearchByFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorState: '',
      onlyMyClassPlansState: false,
      visible: 10,
    };

    this.handleFilter = this.handleFilter.bind(this);
    this.loadMoreTopics = this.loadMoreTopics.bind(this);
  }

  componentDidMount() {
    const {
      listDisciplineFilters, listYearFilters, listTeachingLevelFilters, onlyTerms = false,
    } = this.props;

    if (!onlyTerms) {
      listDisciplineFilters();
      listYearFilters();
      listTeachingLevelFilters();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      filter,
    } = this.props;

    if ((filter.disciplinesSelected.length > 0) && ((filter.disciplinesSelected !== prevProps.filter.disciplinesSelected)
    || (filter.teachingLevelsSelected !== prevProps.filter.teachingLevelsSelected)
    || (filter.yearsSelected !== prevProps.filter.yearsSelected)
    || (filter.topicsSelected !== prevProps.filter.topicsSelected)
    || (filter.difficultiesSelected !== prevProps.filter.difficultiesSelected)
    || (filter.onlyMyClassPlans !== prevProps.filter.onlyMyClassPlans))) {
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
    history.push('/class-plan-base/1');
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
    const { addMyMaterialFilter, author } = this.props;
    const valueFilter = event.target.value;
    this.setState({ authorState: author });
    addMyMaterialFilter(valueFilter, event.target.checked);
  }

  loadMoreTopics() {
    this.setState(prev => ({ visible: prev.visible + 5 }));
  }


  render() {
    const {
      author, isFetching, onlyMyClassPlans, disciplineFilters, topicFilters,
      disciplineIdSelected, yearIdSelected,
      addSelectedDisciplineFilter,
      addSelectedYearFilter,
      filter,
      onlyTerms = false,
    } = this.props;

    const { visible } = this.state;

    const { authorState, onlyMyClassPlansState } = this.state;
    const isChecked = (onlyMyClassPlans === undefined ? onlyMyClassPlansState : onlyMyClassPlans);

    return (
      <>
        <SearchTermsAutocomplete {...this.props} baseName="atividades" />
        <Row className="c-question-base__myquestions-filter">
          <Label check>
            <Input
              type="checkbox"
              value={authorState || author}
              onChange={this.handleFilter}
              checked={isChecked}
              disabled={isFetching}
            />

            {'Pesquisar só nas ' }
            <strong>
              {'"Minhas atividades"'}
            </strong>
          </Label>
        </Row>
        {!onlyTerms && (
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
        )
        }

        {!onlyTerms && (
        <Row>
          <Col sm="4" col="12" className="mb-2">
            <select
              type="text"
              name="discipline"
              className="form-control question-search__by-filter-select"
              onChange={e => this.getListTopics(e, addSelectedDisciplineFilter)}
              value={disciplineIdSelected || -1}
              disabled={isFetching}
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
              name="year"
              className="form-control question-search__by-filter-select"
              onChange={e => this.getListTopics(e, addSelectedYearFilter)}
              value={yearIdSelected || -2}
              disabled={isFetching}
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
        )}
      </>
    );
  }
}

export default ClassPlanSearchByFilters;
