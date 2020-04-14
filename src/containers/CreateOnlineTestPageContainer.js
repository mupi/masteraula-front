import { connect } from 'react-redux';
import {
  reduxForm, formValueSelector,
} from 'redux-form';
import CreateOnlineTestPage from 'pages/OnlineTest/CreateOnlineTestPage';
import { fetchBaseDocument } from 'actions/onlineTestAction';

const mapStateToProps = (state) => {
  const selector = formValueSelector('create-onlinetest');
  return ({
    baseDocument: state.onlineTest.baseDocument,
    isFetchingBaseDocument: state.onlineTest.isFetchingBaseDocument,
    typeDurationSelected: selector(state, 'typeDuration'),
  });
};


const mapDispatchToProps = dispatch => ({
  fetchBaseDocument: id => dispatch(fetchBaseDocument(id)),
}
);

const CreateOnlineTestPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'create-onlinetest',
})(CreateOnlineTestPage));

export default CreateOnlineTestPageContainer;
