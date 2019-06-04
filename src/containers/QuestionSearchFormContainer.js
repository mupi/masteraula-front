import { connect } from 'react-redux';
import QuestionSearchForm from 'components/question/QuestionSearchForm';
import { setSearchText, setMyQuestionsFilter } from 'actions/filterAction';
import { history } from 'helpers/history';


const mapStateToProps = state => ({
  initialValues: {
    searchText: state.filter.searchText,
    onlyMyQuestions: state.filter.onlyMyQuestions,
  },
  search: state.filter.searchText,
  onlyMyQuestions: state.filter.onlyMyQuestions,
  preSearch: state.form.questionSearch ? state.form.questionSearch.values.searchText : '',
});

const setDispatchSearchText = (searchText) => {
  history.replace('/question-base/1');
  return setSearchText(searchText);
};

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    dispatch(setMyQuestionsFilter(values.onlyMyQuestions));
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

});

const QuestionSearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionSearchForm);


export default QuestionSearchFormContainer;
