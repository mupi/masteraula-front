import { connect } from 'react-redux';
import {
  reduxForm, formValueSelector,
} from 'redux-form';
import EditOnlineTestPage from 'pages/OnlineTest/EditOnlineTestPage';
import { fetchOnlineTest, updateOnlineTest } from 'actions/onlineTestAction';

const mapStateToProps = (state) => {
  const selector = formValueSelector('edit-onlinetest');
  return ({
    activeOnlineTest: state.onlineTest.activeOnlineTest,
    isFetchingOnlineTest: state.onlineTest.isFetchingBaseDocument,
    userId: state.session.session.user.id,
    user: state.session.session.user,
    typeDurationSelected: selector(state, 'typeDuration'),
  });
};


const mapDispatchToProps = dispatch => ({
  fetchOnlineTest: id => dispatch(fetchOnlineTest(id)),
  onSubmit: (values/* , d, props */) => {
    const newOnlineTest = values;
    return dispatch(updateOnlineTest(newOnlineTest));
  },
}
);

const EditOnlineTestPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'edit-onlinetest',
})(EditOnlineTestPage));

export default EditOnlineTestPageContainer;
