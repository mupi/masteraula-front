import { connect } from 'react-redux';
import {
  reduxForm,
} from 'redux-form';
import CreateOnlineTestPage from 'pages/OnlineTest/CreateOnlineTestPage';
import { fetchBaseDocument } from 'actions/onlineTestAction';

const mapStateToProps = state => ({
  baseDocument: state.onlineTest.baseDocument,
  isFetchingBaseDocument: state.onlineTest.isFetchingBaseDocument,
});


const mapDispatchToProps = dispatch => ({
  fetchBaseDocument: id => dispatch(fetchBaseDocument(id)),
}
);

const CreateOnlineTestPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'create-online',
})(CreateOnlineTestPage));

export default CreateOnlineTestPageContainer;
