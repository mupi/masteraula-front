import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Alert, Col, Button, UncontrolledTooltip,
} from 'reactstrap';
import ActivityList from 'components/activity/ActivityList';

import CustomPagination from 'components/pagination/CustomPagination';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import ActivitySearchByFilters from 'components/activity/ActivitySearchByFilters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/* BUTTON TYPE */
export const BUTTON_TYPE = {
  ACTIVITYCARD_BASE: 1,
  ACTIVITYCARD_MODAL_VIEW: 2,
  ACTIVITYCARD_SELECT: 3,
};

class ActivityBasePage extends React.Component {
  componentDidMount() {
    const {
      match, filter, listResults, user,
    } = this.props;
    listResults(parseInt(match.params.page, 10), filter, user.id);
  }

  componentDidUpdate(prevProps) {
    const {
      match, filter, listResults, user,
    } = this.props;
    if ((match.params.page !== prevProps.match.params.page)
    || (filter.disciplinesSelected !== prevProps.filter.disciplinesSelected)
    || (filter.teachingLevelsSelected !== prevProps.filter.teachingLevelsSelected)
    || (filter.yearsSelected !== prevProps.filter.yearsSelected)
    || (filter.topicsSelected !== prevProps.filter.topicsSelected)
    || (filter.difficultiesSelected !== prevProps.filter.difficultiesSelected)
    || (filter.onlyMyActivities !== prevProps.filter.onlyMyActivities)
    || (filter.searchText !== prevProps.filter.searchText)) {
      listResults(parseInt(match.params.page, 10), filter, user.id);
    }
  }

  render() {
    const {
      activityPage, isFetching, error, filter, toggleSelectedDifficultyFilter,
      toggleSelectedTeachingLevelFilter, toggleSelectedYearFilter, toggleSelectedDisciplineFilter,
      removeSelectedTopicFilter,
      searchText,
    } = this.props;
    if (error) {
      return (
        <HomeUserPage>
          <Alert color="danger">
            {error.message}
          </Alert>
        </HomeUserPage>
      );
    }

    function clearTopic(event) {
      removeSelectedTopicFilter(event.target.id);
    }

    function clearDifficulties(event) {
      toggleSelectedDifficultyFilter(event.target.id, false);
    }

    function clearDisciplines(event) {
      toggleSelectedDisciplineFilter(event.target.id, false);
    }


    function clearTeachingLevel(event) {
      toggleSelectedTeachingLevelFilter(event.target.id, false);
    }

    function clearYears(event) {
      toggleSelectedYearFilter(event.target.id, false);
    }

    return (
      <HomeUserPage showFilters showFiltersForObjectBase={false}>
        <div className="c-question-base">
          <Row>
            <Col sm="12" className="c-question-base__title d-flex justify-content-between">
              <div className="p-2" />
              <div className="p-2">
                <h4>
                  Banco de Atividades
                  {' '}
                </h4>
              </div>
              <div className="p-2 c-question-base__l-tooltip">
                <span className="c-question-base__tooltip" href="#" id="TooltipExample">
                  <FontAwesomeIcon icon="info-circle" />
                </span>
                <UncontrolledTooltip className="tooltip__message" placement="right" target="TooltipExample">
                Insira termos específicos sobre o que deseja encontrar - o sistema buscará nas tags e em todos os textos das atividades.
                  {' '}
                Ex: ângulos internos. Se desejar buscas mais abrangentes, separe os termos com vírgulas. Exemplo: polígonos, ângulos internos.
                  {' '}
                Combine os termos da busca com as opções de filtro disponíveis.
                </UncontrolledTooltip>
              </div>
            </Col>
          </Row>
          <ActivitySearchByFilters {...this.props} />
          { (filter.disciplinesSelected && filter.disciplinesSelected.length > 0)
          || (filter.difficultiesSelected && filter.difficultiesSelected.length > 0)
          || (filter.teachingLevelsSelected && filter.teachingLevelsSelected.length > 0)
          || (filter.yearsSelected.length && filter.yearsSelected.length > 0)
          || (filter.topicsSelected.length && filter.topicsSelected.length > 0) ? (
            <Row>
              <Col sm="12">
                <p className="c-question-base__keywords-title">
                  <span className="btn__icon">
                    Filtros selecionados:
                  </span>
                  {filter.topicsSelected.map(item => (
                    <Button
                      disabled={isFetching}
                      key={`${item.id}`}
                      id={item.id}
                      className="c-question-base__filter-selected"
                      onClick={clearTopic}
                    >
                      {item.name}
                      {' '}
                        x
                    </Button>
                  )).concat(filter.difficultiesSelected.map(item => (
                    <Button
                      disabled={isFetching}
                      key={`DF${item.id}`}
                      id={item.id}
                      onClick={clearDifficulties}
                      className="c-question-base__filter-selected"
                    >
                      {item.name}
                      {' '}
                        x
                    </Button>
                  )),
                  filter.teachingLevelsSelected.map(item => (
                    <Button
                      disabled={isFetching}
                      key={`TL${item.id}`}
                      id={item.id}
                      onClick={clearTeachingLevel}
                      className="c-question-base__filter-selected"
                    >
                      {item.name}
                      {' '}
                        x
                    </Button>
                  )),
                  filter.disciplinesSelected.map(item => (
                    <Button
                      disabled={isFetching}
                      key={`D${item.id}`}
                      id={item.id}
                      onClick={clearDisciplines}
                      className="c-question-base__filter-selected"
                    >
                      {item.name}
                      {' '}
                        x
                    </Button>
                  )),
                  filter.yearsSelected.map(item => (
                    <Button
                      disabled={isFetching}
                      key={`Y${item.id}`}
                      id={item.id}
                      onClick={clearYears}
                      className="c-question-base__filter-selected"
                    >
                      {item.name}
                      {' '}
                        x
                    </Button>
                  )))}
                </p>
              </Col>
            </Row>
            ) : ''
      }
          { (!isFetching && activityPage && activityPage.count !== undefined) ? (
            <Row>
              <Col sm="12" className="c-question-base__total-results">
                {`${activityPage.count} atividades encontradas`}
                {(searchText && searchText !== undefined && searchText.length > 0) ? (
                  <>
                    {' para '}
                    <span className="c-question-base__search-term">
                      {searchText}
                    </span>
                  </>
                ) : ''
                }
                <a
                  className="c-question-base__link-askquestion"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://forms.gle/A1T4TPAMbrRA33hJA"
                >
                  (Não encontrou o que queria? Clique aqui)
                </a>
              </Col>
            </Row>
          ) : ''}
          <Row className="pagination-questions" style={{ marginLeft: '80%' }}>
            <CustomPagination {...this.props} {...activityPage} disabled={isFetching} itensPerPage={16} />
          </Row>
          <div className="c-question-base__results">
            { isFetching ? (
              <Alert className="c-question-base__alert--warning" color="warning" fade={false}>
                  Carregando ...
              </Alert>
            ) : (
              <ActivityList
                sm="4"
                buttonType={BUTTON_TYPE.ACTIVITYCARD_BASE}
                {...this.props}
                activities={activityPage.results}
                count={activityPage.count}
                showQuantity={false}
              />
            )
            }
          </div>
          <Row className="pagination-questions" style={{ marginLeft: '80%' }}>
            <CustomPagination {...this.props} {...activityPage} disabled={isFetching} itensPerPage={16} />
          </Row>
        </div>
      </HomeUserPage>
    );
  }
}

ActivityBasePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string.isRequired,
    }),
  }).isRequired,
  filter: PropTypes.shape({}).isRequired,
  listResults: PropTypes.func.isRequired,
  activityPage: PropTypes.shape({}),
  isFetching: PropTypes.bool,
  error: PropTypes.string,
};

ActivityBasePage.defaultProps = {
  activityPage: null,
  isFetching: false,
  error: null,
};

export default ActivityBasePage;
