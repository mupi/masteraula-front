import { connect } from 'react-redux';
import TermsUsePage from 'pages/TermsUse/TermsUsePage';
import { listTermsUse } from 'actions/termsUseAction';

const mapStateToProps = state => ({
  isLoggedIn: !!state.session.session,
  faqList: state.faq.faqList,
  isFetching: state.termsUse.isFetching,
  termsUseList: state.termsUse.termsUseList,
});


const mapDispatchToProps = dispatch => ({
  listTermsUse: () => dispatch(listTermsUse()),
}
);

const TermsUsePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TermsUsePage);

export default TermsUsePageContainer;
