import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Alert,
} from 'reactstrap';

import CustomPagination from 'components/pagination/CustomPagination';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import LearningObjectSearchFormContainer from 'containers/LearningObjectSearchFormContainer';
import LearningObjectCardList from 'components/learningObject/LearningObjectCardList';

class ObjectBasePage extends React.Component {
  componentDidMount() {
    const {
      match, filter, listObjects,
    } = this.props;
    listObjects(parseInt(match.params.page, 10), filter);
  }

  componentDidUpdate(prevProps) {
    const {
      match, filter, listObjects,
    } = this.props;
    if ((match.params.page !== prevProps.match.params.page)
    || (filter !== prevProps.filter)) {
      listObjects(parseInt(match.params.page, 10), filter);
    }
  }

  render() {
    const {
      objectPage, isFetching, error,
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
      <HomeUserPage showFilters>
        <div className="c-object-base">
          <LearningObjectSearchFormContainer />
          <Row className="pagination-questions" style={{ marginLeft: '80%' }}>
            <CustomPagination {...this.props} {...objectPage} itensPerPage={16} />
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
              />
            )
            }
          </div>
          <Row className="pagination-questions" style={{ marginLeft: '80%' }}>
            <CustomPagination {...this.props} {...objectPage} itensPerPage={16} />
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
  filter: PropTypes.shape({}).isRequired,
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
