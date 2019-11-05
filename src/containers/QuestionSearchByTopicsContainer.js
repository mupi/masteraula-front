import { connect } from 'react-redux';
import QuestionSearchByTopics from 'components/question/QuestionSearchByTopics';
import { setSearchText, addMyQuestionsFilter, listDisciplineFilters } from 'actions/filterAction';
import { history } from 'helpers';
import { listTopics } from 'actions/topicAction';


const mapStateToProps = state => ({
  initialValues: {
    searchText: state.filter.searchText,
    onlyMyQuestions: state.filter.onlyMyQuestions,
  },
  search: state.filter.searchText,
  onlyMyQuestions: state.filter.onlyMyQuestions,
  author: state.session.session.user.id,
  isFetchingQuestions: state.question.isFetching,
  preSearch: state.form.questionSearch ? state.form.questionSearch.values.searchText : '',
  disciplineFilters: state.filter.disciplineFilters,
  topicsList: state.topic.topics,
});

const setDispatchSearchText = (searchText) => {
  history.replace('/question-base/1');
  return setSearchText(searchText);
};

const mapDispatchToProps = dispatch => ({
  listTopics: param => dispatch(listTopics(param)),
  addMyQuestionsFilter: (author, value) => {
    history.replace('/question-base/1');
    dispatch(addMyQuestionsFilter(author, value));
  },
  onSubmit: (values) => {
    dispatch(setDispatchSearchText(values.searchText));
  },
  clearSearch: () => {
    dispatch({
      type: '@@redux-form/CHANGE',
      payload: null,
      meta: { form: 'questionSearch', field: 'searchText' },
    });
    dispatch(setDispatchSearchText());
  },
  clearSearchField: () => dispatch({
    type: '@@redux-form/CHANGE',
    payload: null,
    meta: { form: 'questionSearch', field: 'searchText' },
  }),
  listDisciplineFilters: param => dispatch(listDisciplineFilters(param)),


});

const QuestionSearchByTopicsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionSearchByTopics);


export default QuestionSearchByTopicsContainer;
