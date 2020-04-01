import { connect } from 'react-redux';
import FaqPage from 'pages/FAQ/FaqPage';
import { listFaqs } from 'actions/faqAction';

const mapStateToProps = state => ({
  isLoggedIn: !!state.session.session,
  faqList: state.faq.faqList,
  isFetchingFaqs: state.faq.isFetchingFaqs,
});


const mapDispatchToProps = dispatch => ({
  listFaqs: () => dispatch(listFaqs()),
}
);

const FaqPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FaqPage);

export default FaqPageContainer;
