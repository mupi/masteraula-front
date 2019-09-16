import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Alert,
} from 'reactstrap';

import CustomPagination from 'components/pagination/CustomPagination';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import LearningObjectSearchFormContainer from 'containers/LearningObjectSearchFormContainer';
import LearningObjectCardList from 'components/learningObject/LearningObjectCardList';
import { Helmet } from 'react-helmet';

class ObjectBasePage extends React.Component {
  componentDidMount() {
    const {
      match, filterObject, listObjects,
    } = this.props;
    listObjects(parseInt(match.params.page, 10), filterObject);
  }

  componentDidUpdate(prevProps) {
    const {
      match, filterObject, listObjects,
    } = this.props;
    if ((match.params.page !== prevProps.match.params.page)
    || (filterObject !== prevProps.filterObject)) {
      listObjects(parseInt(match.params.page, 10), filterObject);
    }
  }

  render() {
    const {
      objectPage, isFetching, error, addSelectedObjectTypeFilter,
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
    return (
      <HomeUserPage showFiltersForObjectBase>
        <Helmet>
          <title>Masteraula - Banco de Objetos de aprendizagem</title>
          <meta
            name="description"
            content="Recursos úteis como textos e imagens para suas provas"
          />
        </Helmet>
        <div className="c-object-base">
          <LearningObjectSearchFormContainer />
          <Row className="pagination-questions" style={{ marginLeft: '80%' }}>
            <CustomPagination {...this.props} {...objectPage} itensPerPage={16} disabled={isFetching} />
          </Row>
          <div className="c-question-base__results">
            { isFetching ? (
              <Alert className="c-question-base__alert--warning" color="warning" fade={false}>
                   Carregando ...
              </Alert>
            ) : (
              <LearningObjectCardList
                sm="4"
                {...this.props}
                objects={objectPage ? objectPage.results : null}
                count={objectPage ? objectPage.count : 0}
                addSelectedObjectTypeFilter={addSelectedObjectTypeFilter}
              />
            )
            }
          </div>
          <Row className="pagination-questions" style={{ marginLeft: '80%' }}>
            <CustomPagination {...this.props} {...objectPage} itensPerPage={16} disabled={isFetching} />
          </Row>
        </div>
      </HomeUserPage>
    );
  }
}

ObjectBasePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string.isRequired,
    }),
  }).isRequired,
  filterObject: PropTypes.shape({}).isRequired,
  listObjects: PropTypes.func.isRequired,
  questionPage: PropTypes.shape({}),
  isFetching: PropTypes.bool,
  error: PropTypes.string,
};

ObjectBasePage.defaultProps = {
  questionPage: null,
  isFetching: false,
  error: null,
};

export default ObjectBasePage;
