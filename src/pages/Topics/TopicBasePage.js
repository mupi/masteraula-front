import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Alert, Badge,
  UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';

import CustomPagination from 'components/pagination/CustomPagination';
import HomeUserPage from '../HomeUser/HomeUserPage';

const getOrderNameField = (text) => {
  switch (text) {
    case 'asc': return 'Crescente';
    case 'desc': return 'Decrescente';
    case 'name': return 'Nome';
    case 'num_questions': return 'Nº questões';
    default: return text;
  }
};

const TopicsList = ({ topics }) => (
  <div>
    {topics && topics.map(topic => (
      <Badge className="topics__item" key={topic.id} color="success" pill>
        {`${topic.name.trim()} (${topic.num_questions})`}
      </Badge>
    ))}
  </div>
);


class TopicBasePage extends React.Component {
  componentDidMount() {
    const {
      match, listTopics, orderField, order, listDisciplineFilters,
    } = this.props;

    listTopics(-1, parseInt(match.params.page, 10), orderField, order);
    listDisciplineFilters();
  }

  componentDidUpdate(prevProps) {
    const {
      match, listTopics, orderField, order, disciplineIdSelected,
    } = this.props;
    if ((match.params.page !== prevProps.match.params.page)) {
      listTopics(disciplineIdSelected, parseInt(match.params.page, 10), orderField, order);
    }
  }

  // 1st time that discipline is selected
  getListTopics = (event) => {
    const {
      listTopics, orderField, order,
    } = this.props;
    listTopics(event.target.value, 1, orderField, order);
    // resetTopicListSelected();
  }

  render() {
    const {
      topicsList, isFetchingTopics, disciplineIdSelected, orderField, order,
      disciplineFilters, listTopics,
    } = this.props;

    return (
      <HomeUserPage>
        <div className="c-my-documents">
          <Row>
            <Col sm="12">
              <h4>Tópicos e Assuntos</h4>
            </Col>
          </Row>
          <Row className="pagination-my-documents">
            <Col sm="12">
              <CustomPagination {...this.props} {...topicsList} disabled={isFetchingTopics} itensPerPage={54} />
              <p className="c-my-documents__total-results">
                {`Tópicos encontrados: ${topicsList ? (topicsList.count) : 0}`}
                {' '}
              </p>
              { isFetchingTopics ? (
                <Alert className="alert--warning" color="warning" fade={false}>
                Carregando ...
                </Alert>
              ) : (
                <div>
                  <Row>
                    <Col sm="4" col="12" className="mb-2">
                      <select
                        type="text"
                        name="discipline"
                        className="form-control question-search__by-filter-select"
                        onChange={e => this.getListTopics(e)}
                        value={disciplineIdSelected || -1}
                        disabled={isFetchingTopics}
                      >
                        <option value="-1">
                         Todas as disciplinas
                        </option>
                        { disciplineFilters && disciplineFilters.map(discipline => (
                          <option className="c-user-profile__state-city-dropdown-item" key={discipline.id} value={discipline.id}>
                            {discipline.name}
                          </option>
                        )) }
                      </select>
                    </Col>
                  </Row>
                  <div className="c-my-documents__dropdown-section">
                    <span className="c-my-documents__order-label">
                      Ordenar por:
                    </span>
                    <UncontrolledDropdown>
                      <DropdownToggle className="c-my-documents__dropdown-toogle" caret size="sm">
                        {' '}
                        {' '}
                        {getOrderNameField(orderField)}
                        {' '}
                        {' - '}
                        {' '}
                        {getOrderNameField(order)}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listTopics(disciplineIdSelected, 1, 'name', 'asc')}>
                          Nome - Crescente
                        </DropdownItem>
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listTopics(disciplineIdSelected, 1, 'name', 'desc')}>
                          Nome - Decrescente
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listTopics(disciplineIdSelected, 1, 'num_questions', 'asc')}>
                          Nº Questões - Crescente
                        </DropdownItem>
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listTopics(disciplineIdSelected, 1, 'num_questions', 'desc')}>
                          Nº Questões - Decrescente
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>

                  { topicsList
                    && <TopicsList topics={topicsList.results} />
                  }
                </div>
              )}
            </Col>
          </Row>

        </div>
      </HomeUserPage>
    );
  }
}

TopicBasePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string.isRequired,
    }),
  }).isRequired,
  listTopics: PropTypes.func.isRequired,
  orderField: PropTypes.string,
  order: PropTypes.string,
};

TopicBasePage.defaultProps = {
  orderField: 'num_questions',
  order: 'desc',
};

export default TopicBasePage;
