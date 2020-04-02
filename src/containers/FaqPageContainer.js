import { connect } from 'react-redux';
import FaqPage from 'pages/FAQ/FaqPage';
import { listFaqs } from 'actions/faqAction';
import { sendMessage } from 'actions/contactAction';

const mapStateToProps = state => ({
  isLoggedIn: !!state.session.session,
  faqList: state.faq.faqList,
  isFetchingFaqs: state.faq.isFetchingFaqs,
});


const mapDispatchToProps = dispatch => ({
  listFaqs: () => dispatch(listFaqs()),
  submit: (values) => {
    dispatch(sendMessage(values));
  },
}
);

const FaqPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FaqPage);

export default FaqPageContainer;
