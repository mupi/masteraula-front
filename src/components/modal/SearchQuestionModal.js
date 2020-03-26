import React from 'react';
import {
  Button, Row, Col, Alert,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomPaginationModal from 'components/pagination/CustomPaginationModal';
import QuestionCardSimple from 'components/question/QuestionCardSimple';
import RemoveButton from 'components/buttons/RemoveButton';
import { listQuestionModal, setCurrentPageModal } from 'actions/questionAction';

import {
  setSearchTextQuestionModal, addMyQuestionsFilterModal,
} from 'actions/filterAction';
import QuestionSearchByFiltersModalContainer from 'containers/QuestionSearchByFiltersModalContainer';


const QuestionCardSimpleList = (props) => {
  const {
    questions, sm, selectedQuestionList,
    addSelectedQuestion, removeSelectedQuestion,
  } = props;
  const isQuestionAdded = (id) => {
    if (selectedQuestionList) {
      const questionAdded = selectedQuestionList.filter(item => (item.id === id || item.question_ids === id));
      return (questionAdded.length > 0);
    }
    return false;
  };

  const CardButton = question => (
    !isQuestionAdded(question.id) ? (
      <Button className="object-card__btn" onClick={() => addSelectedQuestion(question)}>
        <FontAwesomeIcon icon="plus" className="btn__icon" />
        {' '}
        Adicionar
        {' '}
      </Button>
    ) : (
      <RemoveButton id={question.id} removeSelectedQuestion={removeSelectedQuestion} />
    )
  );
  return (
    <Row>
      {questions && questions.map(question => (
        <Col sm={sm} lg="3" xs="12" key={question.id} className="object-card">
          <QuestionCardSimple
            question={question}
            button={CardButton(question)}
            {...props}
          />
        </Col>
      ))}
    </Row>
  );
};


class SearchQuestionModal extends React.Component {
  componentDidMount() {
    const {
      listQuestions, clearSearch,
    } = this.props;
    listQuestions(parseInt(1, 10), null);
    clearSearch();
  }

  componentDidUpdate(prevProps) {
    const {
      currentPageModal, listQuestions, filter,
    } = this.props;
    if (currentPageModal !== prevProps.currentPageModal
      || (filter && filter.searchTextModal !== prevProps.filter.searchTextModal)
      || (filter.onlyMyQuestionsModal !== prevProps.filter.onlyMyQuestionsModal)) {
      listQuestions(parseInt(currentPageModal, 10), filter);
    }
  }

  render() {
    const {
      questionPage, isFetching, closeModal, titlePart, setCurrentPageModalProp,
      addSelectedQuestion, removeSelectedQuestion,
      singleSelection = false,
      stations,
      stationIndex,
      searchText,
    } = this.props;

    return (
      <div className="modal-content modal__content modal-fixed__content">
        <div className="modal-header modal__header">
          <h5
            className="modal-title"
          >
            {`Adicionar questão ${titlePart}`}
          </h5>
          <button type="button" className="close" aria-label="Close" onClick={closeModal}>
            <span aria-hidden="true">
            &times;
            </span>
          </button>
        </div>
        <div className="modal-basic-operation__body modal-body modal-fixed__body">

          <div className="c-object-base modal-fixed__body-all">
            <QuestionSearchByFiltersModalContainer {...this.props} onlyTerms />
            <Row className="pagination-questions modal-fixed__pagination-top" style={{ marginLeft: '80%' }}>
              <CustomPaginationModal
                {...this.props}
                {...questionPage}
                setCurrentPageModal={setCurrentPageModalProp}
                itensPerPage={16}
                disabled={isFetching}
              />
            </Row>
            <Row>
              <Col sm="12" className="c-object-base__total-results">
                {'Questões encontradas: '}
                {questionPage ? questionPage.count : 0}
                {searchText
                  ? (
                    <>
                      {' para '}
                      <span className="c-question-base__search-term">
                        {searchText}
                      </span>
                    </>
                  ) : ''
                }
              </Col>
              { !singleSelection && (
              <Col sm="12" className="c-object-base-modal__selected-number">
                {`Questões associadas ${titlePart}`}
                {' '}
              </Col>
              )
            }
            </Row>
            <div className="c-question-base__results modal-fixed__body-section-questions-scroll">
              { isFetching ? (
                <Alert className="c-question-base__alert--warning" color="warning" fade={false}>
                   Carregando  ...
                </Alert>
              ) : (
                <QuestionCardSimpleList
                  addSelectedQuestion={addSelectedQuestion}
                  removeSelectedQuestion={removeSelectedQuestion}
                  sm="4"
                  {...this.props}
                  questions={questionPage ? questionPage.results : null}
                  selectedQuestionList={!singleSelection ? [] : [stations[stationIndex]]}
                  singleSelection={singleSelection}
                />
              )
            }
            </div>
            <Row className="pagination-questions modal-fixed__pagination-bottom" style={{ marginLeft: '80%' }}>
              <CustomPaginationModal
                {...this.props}
                {...questionPage}
                itensPerPage={16}
                disabled={isFetching}
                setCurrentPageModal={setCurrentPageModalProp}
              />
            </Row>
          </div>


        </div>
        <div className="modal-footer modal__footer c-object-base-modal__footer modal-fixed__footer">
          <Button color="secondary" onClick={closeModal}>
            Fechar
          </Button>
        </div>
      </div>
    );
  }
}

SearchQuestionModal.propTypes = {
  closeModal: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
};

SearchQuestionModal.defaultProps = {
  closeModal: f => f,
  title: '',
  message: '',
};

const mapStateToProps = state => ({
  stations: state.classPlan.stations,
  questionPage: state.question.questionPageModal,
  isFetching: state.question.isFetching,
  currentPageModal: state.question.currentPageModal,
  filter: state.filter,
  searchText: state.filter.searchTextModal,
});

const setDispatchSearchText = searchText => setSearchTextQuestionModal(searchText);

const mapDispatchToProps = dispatch => ({

  listQuestions: (page, filter) => dispatch(listQuestionModal(page, filter)),
  setCurrentPageModalProp: page => dispatch(setCurrentPageModal(page)),
  clearSearch: () => {
    dispatch({
      type: '@@redux-form/CHANGE',
      payload: null,
      meta: { form: 'questionSearchModal', field: 'searchText' },
    });
    dispatch(setDispatchSearchText());
    dispatch(addMyQuestionsFilterModal(null, false));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchQuestionModal);
