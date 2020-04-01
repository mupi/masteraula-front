import React, { Component } from 'react';
import {
  Alert, Row, Col,
} from 'reactstrap';

import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import HomeUserNotLoggedPage from 'pages/Home/HomeUserNotLoggedPage';
import FaqCategorySection from 'components/faq/FaqCategorySection';

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
      </HomeUserPage>
    ) : (
      <HomeUserNotLoggedPage>
        <Faq {...this.props} />
      </HomeUserNotLoggedPage>
    );
  }
}

export default FaqPage;
