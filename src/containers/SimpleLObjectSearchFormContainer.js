import { connect } from 'react-redux';
import SimpleLObjectSearchForm from 'components/learningObject/SimpleLObjectSearchForm';
import { setSearchTextObjectModal } from 'actions/filterObjectAction';
// import { history } from 'helpers/history';
import { reduxForm } from 'redux-form';
import { setCurrentPageModal } from 'actions/learningObjectAction';

const mapStateToProps = state => ({
  initialValues: {
    searchTextObject: state.filterObject.searchTextObjectModal,
  },
  search: state.filterObject.searchTextObjectModal,
  author: state.session.session.user.id,
  isFetchingObjects: state.learningObject.isFetching,
  // preSearch: state.form.objectSearch ? state.form.objectSearch.values.searchTextObject : '',
});

// history.replace('/object-base/1');
const setDispatchSearchText = searchText => setSearchTextObjectModal(searchText);
const mapDispatchToProps = dispatch => ({

  onSubmit: (values) => {
    dispatch(setCurrentPageModal(1));
    dispatch(setDispatchSearchText(values.searchTextObject));
  },
  clearSearch: () => {
    dispatch({
      type: '@@redux-form/CHANGE',
      payload: null,
      meta: { form: 'learningObjectSearchModal', field: 'searchTextObject' },
    });
    dispatch(setCurrentPageModal(1));
    dispatch(setDispatchSearchText());
  },
  clearSearchField: () => dispatch({
    type: '@@redux-form/CHANGE',
    payload: null,
    meta: { form: 'learningObjectSearchModal', field: 'searchTextObject' },
  }),
  setCurrentPageModal: page => dispatch(setCurrentPageModal(page)),

});

const SimpleLObjectSearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'learningObjectSearchModal',
})(SimpleLObjectSearchForm));

export default SimpleLObjectSearchFormContainer;
