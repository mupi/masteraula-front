import { connect } from 'react-redux';
import { change } from 'redux-form';
import QuestionSearchText from 'components/question/QuestionSearchText';
import { setSearchText } from 'actions/filterAction';
import { history } from 'helpers';
import { listTopicSuggestions } from 'actions/suggestionAction';


const mapStateToProps = state => ({
  searchText: state.filter.searchText,

  /* autocomplete */
  isFetchingTopicSuggestions: state.suggestion.isFetchingSuggestions,
  topicSuggestions: state.suggestion.topicSuggestions,
});

const setDispatchSearchText = searchText => (dispatch) => {
  dispatch(setSearchText(searchText));
  history.replace('/question-base/1');
};

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    dispatch(setDispatchSearchText(values.searchText));
  },
  search: (searchText) => {
    dispatch(setDispatchSearchText(searchText));
  },
  clearSearchText: () => {
    dispatch(change('questionSearch', 'searchText', ''));
    dispatch((_dispatch, getState) => {
      const { searchText } = getState().filter;
      if (searchText) {
        dispatch(setSearchText(''));
      }
    });
  },
  listTopicSuggestions: param => dispatch(listTopicSuggestions(param)),
});

const QuestionSearchTextContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionSearchText);


export default QuestionSearchTextContainer;
