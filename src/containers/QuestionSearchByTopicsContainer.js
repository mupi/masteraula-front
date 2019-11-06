import { connect } from 'react-redux';
import QuestionSearchByTopics from 'components/question/QuestionSearchByTopics';
import {
  addMyQuestionsFilter, listDisciplineFilters, addSelectedDisciplineFilter, listTopicFilters, addSelectedTopicFilter,
  resetTopicListSelected,
} from 'actions/filterAction';
import { history } from 'helpers';

const mapStateToProps = state => ({
  initialValues: {
    searchText: state.filter.searchText,
    onlyMyQuestions: state.filter.onlyMyQuestions,
    discipline: state.filter.disciplinesSelected && state.filter.disciplinesSelected.length > 0 ? state.filter.disciplinesSelected[0].id : 0,
  },
  search: state.filter.searchText,
  onlyMyQuestions: state.filter.onlyMyQuestions,
  discipline: state.filter.disciplinesSelected && state.filter.disciplinesSelected.length > 0 ? state.filter.disciplinesSelected[0].id : 0,
  author: state.session.session.user.id,
  isFetchingQuestions: state.question.isFetching,
  disciplineFilters: state.filter.disciplineFilters,
  topicFilters: state.filter.topicFilters,
});

const mapDispatchToProps = dispatch => ({
  listTopics: param => dispatch(listTopicFilters(param)),
  addMyQuestionsFilter: (author, value) => {
    history.replace('/question-base/1');
    dispatch(addMyQuestionsFilter(author, value));
  },
  listDisciplineFilters: param => dispatch(listDisciplineFilters(param)),
  addSelectedDisciplineFilter: idDiscipline => dispatch(addSelectedDisciplineFilter(idDiscipline)),
  addSelectedTopicFilter: idTopic => dispatch(addSelectedTopicFilter(idTopic)),
  resetTopicListSelected: () => dispatch(resetTopicListSelected()),

});

const QuestionSearchByTopicsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionSearchByTopics);


export default QuestionSearchByTopicsContainer;
