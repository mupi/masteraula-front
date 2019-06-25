import { connect } from 'react-redux';
import SimpleLObjectSearchForm from 'components/learningObject/SimpleLObjectSearchForm';
import { setSearchTextObjectModal } from 'actions/filterObjectAction';
// import { history } from 'helpers/history';
import { reduxForm } from 'redux-form';

const mapStateToProps = state => ({
  initialValues: {
    searchTextObject: state.filterObject.searchTextObjectModal,
  },
  search: state.filterObject.searchTextObjectModal,
  author: state.session.session.user.id,
  isFetchingObjects: state.learningObject.isFetching,
  // preSearch: state.form.objectSearch ? state.form.objectSearch.values.searchTextObject : '',
});

const setDispatchSearchText = (searchText) => {
  // history.replace('/object-base/1');
  return setSearchTextObjectModal(searchText);
};

const mapDispatchToProps = dispatch => ({

  onSubmit: (values) => {
    dispatch(setDispatchSearchText(values.searchTextObject));
  },
  clearSearch: () => {
    dispatch({
      type: '@@redux-form/CHANGE',
      payload: null,
      meta: { form: 'learningObjectSearchModal', field: 'searchTextObject' },
    });
    dispatch(setDispatchSearchText());
  },
  clearSearchField: () => dispatch({
    type: '@@redux-form/CHANGE',
    payload: null,
    meta: { form: 'learningObjectSearchModal', field: 'searchTextObject' },
  }),

});

const SimpleLObjectSearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'learningObjectSearchModal',
})(SimpleLObjectSearchForm));

export default SimpleLObjectSearchFormContainer;
