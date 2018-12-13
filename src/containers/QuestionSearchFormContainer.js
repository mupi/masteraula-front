import { connect } from 'react-redux';
import QuestionSearchForm from 'components/question/QuestionSearchForm';
import { setSearchText } from 'actions/filterAction';
import { history } from 'helpers/history';

const mapStateToProps = state => ({
  initialValues: {
    searchText: state.filter.searchText,
  },
  search: state.filter.searchText,
});

const setDispatchSearchText = (searchText) => {
  history.replace('/question-base/1');
  return setSearchText(searchText);
};

const mapDispatchToProps = dispatch => ({
  onSubmit: values => dispatch(setDispatchSearchText(values.searchText)),
});

const QuestionSearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionSearchForm);


export default QuestionSearchFormContainer;
