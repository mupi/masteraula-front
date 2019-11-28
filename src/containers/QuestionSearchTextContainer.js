import { connect } from 'react-redux';
import QuestionSearchText from 'components/question/QuestionSearchText';
import { setSearchText, addMyQuestionsFilter, cleanSearchInput } from 'actions/filterAction';
import { history } from 'helpers';
import { listTopicSuggestions } from 'actions/suggestionAction';


const mapStateToProps = state => ({
  initialValues: {
    searchText: state.filter.searchText,
    onlyMyQuestions: state.filter.onlyMyQuestions,
  },
  search: state.filter.searchText,
  willBeCleared: state.filter.willBeCleared,
  onlyMyQuestions: state.filter.onlyMyQuestions,
  author: state.session.session.user.id,
  isFetchingQuestions: state.question.isFetching,
  preSearch: state.form.questionSearch ? state.form.questionSearch.values.searchText : '',

  /* autocomplete */
  isFetchingTopicSuggestions: state.suggestion.isFetchingSuggestions,
  topicSuggestions: state.suggestion.topicSuggestions,
  filter: state.filter,
});

const setDispatchSearchText = (searchText) => {
  history.replace('/question-base/1');
  return setSearchText(searchText);
};

const mapDispatchToProps = dispatch => ({

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
  cleanSearchInput: (value = true) => {
    dispatch({
      type: '@@redux-form/CHANGE',
      payload: null,
      meta: { form: 'questionSearch', field: 'searchText' },
    });
    dispatch(cleanSearchInput(value));
  },
  listTopicSuggestions: (param, filter) => dispatch(listTopicSuggestions(param, filter)),


});

const QuestionSearchTextContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionSearchText);


export default QuestionSearchTextContainer;
