import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import QuestionSearchForm from 'components/question/QuestionSearchForm';
import { setSearchText } from 'actions/filterAction';

const mapStateToProps = state => ({
  initialValues: {
    searchText: state.filter.searchText,
  },
});

const mapDispatchToProps = dispatch => ({
  onSubmit: values => dispatch(setSearchText(values.searchText)),
});

const QuestionSearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionSearchForm);


export default QuestionSearchFormContainer;
