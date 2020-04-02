import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Alert, Badge, Button,
  UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import { history } from 'helpers';

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

const TopicsList = ({ topics, addTopicFilter }) => (
  <Row className="align-items-center">
    {topics && topics.map(topic => (
      <Col sm="2" key={topic.id}>
        <div className="topics__item-wrapper">
          <Button
            className="topics__item-btn"
            onClick={() => addTopicFilter(topic)}
          >
            <Badge className="topics__item" color="secondary">
              {`${topic.name.trim()} (${topic.num_questions})`}
            </Badge>
          </Button>
        </div>
      </Col>
    ))}
  </Row>
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

  addTopicFilter = (topic) => {
    const {
      addSelectedTopicFilter,
    } = this.props;

    addSelectedTopicFilter(topic);
    history.push('/question-base/1');
  }

  render() {
    const {
      topicsList, isFetchingTopics, disciplineIdSelected, orderField, order,
      disciplineFilters, listTopics,
    } = this.props;

    return (
      <HomeUserPage>
        <div className="c-my-documents">
          <Row className="mb-3">
            <Col sm="12">
              <h4>Tópicos e Assuntos</h4>
            </Col>
          </Row>
          <Row className="row justify-content-between">
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
            <Col sm="4" col="12" className="">
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
            </Col>
          </Row>

          <Row>
            <Col sm="12">
              <p className="c-my-documents__total-results">
                {`Tópicos encontrados: ${topicsList ? (topicsList.count) : 0}`}
                {' '}
              </p>
              <div className="topics__pagination mb-3">
                <CustomPagination {...this.props} {...topicsList} disabled={isFetchingTopics} itensPerPage={54} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              { isFetchingTopics ? (
                <Alert className="alert--warning" color="warning" fade={false}>
                Carregando ...
                </Alert>
              ) : (
                <div>
                  { topicsList
                    && <TopicsList topics={topicsList.results} addTopicFilter={this.addTopicFilter} />
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
  orderField: 'name',
  order: 'asc',
};

export default TopicBasePage;
