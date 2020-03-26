import { connect } from 'react-redux';
import LearningObjectSearchForm from 'components/learningObject/LearningObjectSearchForm';
import { setSearchTextObjectModal } from 'actions/filterObjectAction';
import { reduxForm } from 'redux-form';
import { setCurrentPageModal } from 'actions/learningObjectAction';

const mapStateToProps = state => ({
  initialValues: {
    searchTextObject: state.filterObject.searchTextObjectModal,
  },
  search: state.filterObject.searchTextObjectModal,
  author: state.session.session.user.id,
  isFetchingObjects: state.learningObject.isFetching,
});

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

const LearningObjectSearchFormModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'learningObjectSearchModal',
})(LearningObjectSearchForm));

export default LearningObjectSearchFormModalContainer;
