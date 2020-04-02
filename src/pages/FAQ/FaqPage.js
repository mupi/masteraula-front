import React, { Component } from 'react';
import {
  Alert, Row, Col,
} from 'reactstrap';

import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import HomeUserNotLoggedPage from 'pages/Home/HomeUserNotLoggedPage';
import FaqCategorySection from 'components/faq/FaqCategorySection';
import ContactForm from 'components/contact/ContactForm';

const Faq = ({ faqList, isFetchingFaqs }) => {
  if (isFetchingFaqs) {
    return (
      <Alert color="warning" fade={false}>
              Carregando ...
      </Alert>
    );
  }
  return (
    <>
      <Row className="c-faq-page__section">
        <Col sm="12" className="text-center c-faq-page__section-info">
          <h3>
            <strong>Perguntas frequentes </strong>
          </h3>
          <p className="c-faq-page__detail-text">
            Você tem alguma dúvida sobre o Masteraula? Ache sua resposta aqui.
          </p>
        </Col>
      </Row>

      {faqList && faqList.map(faqCategory => (
        <FaqCategorySection faqCategory={faqCategory} key={faqCategory.id} />
      ))}
    </>
  );
};

const FaqContactForm = (props) => {
  const { sendMessage } = props;

  return (
    <>

      <Row className="c-faq-page__contact-form-section">
        <Col sm="12" className="text-center">
          <h4>
            <strong>Não achou o que você queria?</strong>
          </h4>
          <p>
            Entre en contato conosco
          </p>
        </Col>
      </Row>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }} className="mb-2">
          <ContactForm onSubmit={sendMessage} />
        </Col>
      </Row>
    </>
  );
};

class FaqPage extends Component {
  componentDidMount() {
    const {
      listFaqs,
    } = this.props;
    listFaqs();
  }

  render() {
    const { isLoggedIn } = this.props;

    return isLoggedIn ? (
      <HomeUserPage>
        <Faq {...this.props} />
        <FaqContactForm {...this.props} />
      </HomeUserPage>
    ) : (
      <HomeUserNotLoggedPage>
        <Faq {...this.props} />
        <FaqContactForm {...this.props} />
      </HomeUserNotLoggedPage>
    );
  }
}

export default FaqPage;
