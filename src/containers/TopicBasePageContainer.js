import { connect } from 'react-redux';
import TopicBasePage from 'pages/Topics/TopicBasePage';
import {
  listDisciplineFilters, addSelectedTopicFilter,
} from 'actions/filterAction';
import {
  listTopics,
} from 'actions/topicAction';

// state.<reducer's name>.<property>

const mapStateToProps = state => ({
  isFetchingTopics: state.topic.isFetchingTopics,
  currentPage: state.topic.currentPage,
  error: state.topic.error,

  orderField: state.topic.orderField,
  order: state.topic.order,
  disciplineIdSelected: state.topic.disciplineIdSelected > 0 ? state.topic.disciplineIdSelected : -1,

  disciplineFilters: state.filter.disciplineFiltersJoined,
  topicsList: state.topic.topics,
});

const mapDispatchToProps = dispatch => ({
  listDisciplineFilters: param => dispatch(listDisciplineFilters(param)),
  listTopics: (disciplineIdSelected, page, orderField, order) => dispatch(listTopics(disciplineIdSelected, page, orderField, order)),
  addSelectedTopicFilter: topic => dispatch(addSelectedTopicFilter(topic)),
});

const TopicBasePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopicBasePage);

export default TopicBasePageContainer;
