import React, { Component } from 'react';
import {
  Input, Row, Col, Label, Button,
} from 'reactstrap';
import QuestionSearchText from 'components/question/QuestionSearchText';
import { history } from 'helpers';

class ActivitySearchByFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorState: '',
      onlyMyActivitiesState: false,
      visible: 10,
    };

    this.handleFilter = this.handleFilter.bind(this);
    this.loadMoreTopics = this.loadMoreTopics.bind(this);
  }

  componentDidMount() {
    const {
      listDisciplineFilters, listYearFilters, listTeachingLevelFilters,
    } = this.props;
    listDisciplineFilters();
    listYearFilters();
    listTeachingLevelFilters();
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
    || (filter.onlyMyActivities !== prevProps.filter.onlyMyActivities))) {
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
    history.push('/activity-base/1');
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
      author, isFetchingQuestions, onlyMyActivities, disciplineFilters, topicFilters,
      disciplineIdSelected, yearIdSelected,
      addSelectedDisciplineFilter,
      addSelectedYearFilter,
      filter,
      onlyTerms = false,
    } = this.props;

    const { visible } = this.state;

    const { authorState, onlyMyActivitiesState } = this.state;
    const isChecked = (onlyMyActivities === undefined ? onlyMyActivitiesState : onlyMyActivities);

    return (
      <>
        <QuestionSearchText {...this.props} baseName="atividades" />
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
        )}
      </>
    );
  }
}

export default ActivitySearchByFilters;
