import { connect } from 'react-redux';
import LearningObjectSearchForm from 'components/learningObject/LearningObjectSearchForm';
import { setSearchTextObject } from 'actions/filterAction';
import { history } from 'helpers/history';


const mapStateToProps = state => ({
  initialValues: {
    searchTextObject: state.filter.searchTextObject,
  },
  search: state.filter.searchTextObject,
  author: state.session.session.user.id,
  isFetchingObjects: state.learningObject.isFetching,
  preSearch: state.form.objectSearch ? state.form.objectSearch.values.searchTextObject : '',
});

const setDispatchSearchText = (searchText) => {
  history.replace('/object-base/1');
  return setSearchTextObject(searchText);
};

const mapDispatchToProps = dispatch => ({

  onSubmit: (values) => {
    dispatch(setDispatchSearchText(values.searchTextObject));
  },
  clearSearch: () => {
    dispatch({
      type: '@@redux-form/CHANGE',
      payload: null,
      meta: { form: 'learningObjectSearch', field: 'searchTextObject' },
    });
    dispatch(setDispatchSearchText());
  },
  clearSearchField: () => dispatch({
    type: '@@redux-form/CHANGE',
    payload: null,
    meta: { form: 'learningObjectSearch', field: 'searchTextObject' },
  }),

});

const LearningObjectSearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LearningObjectSearchForm);


export default LearningObjectSearchFormContainer;
