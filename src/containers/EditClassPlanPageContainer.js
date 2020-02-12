import { connect } from 'react-redux';
import {
  reduxForm, formValueSelector, SubmissionError,
} from 'redux-form';
import EditClassPlanPage from 'pages/ClassPlan/EditClassPlanPage';
import {
  updateClassPlan,
  addSelectedObjectToClassPlan, removeSelectedObjectToClassPlan, resetSelectedObjects,
  addSelectedDocumentToClassPlan, removeSelectedDocumentFromClassPlan, resetSelectedDocuments,
  fetchClassPlan,
} from 'actions/classPlanAction';

import {
  listDisciplineFilters, listTeachingLevelFilters, listTeachingYearFilters,
} from 'actions/filterAction';
import { listTopics, resetTopicList } from 'actions/topicAction';
import { showModal, hideModal } from 'actions/modalAction';
import { listTopicSuggestions } from 'actions/suggestionAction';
import {
  listMyDocumentsModal,
} from 'actions/documentAction';

/* Learning Object search modal called from
Q = Question
C = ClassPlan
*/

const mapStateToProps = (state) => {
  const selector = formValueSelector('edit-classplan');
  const { user } = state.session.session;
  return ({
    topics: selector(state, 'topics'),
    disciplinesList: selector(state, 'disciplines'),
    selectedPdf: selector(state, 'pdf'),
    topicsList: state.topic.topics,
    disciplineFilters: state.filter.disciplineFilters,
    teachingLevelFilters: state.filter.teachingLevelFilters,
    teachingYearFilters: state.filter.teachingYearFilters,
    sourceFilters: state.filter.sourceFilters,
    selectedObjectList: state.classPlan.selectedObjectList,
    selectedDocumentList: state.classPlan.selectedDocumentList,
    errorsUpdateClassPlan: state.form['edit-classplan'] ? state.form['edit-classplan'].submitErrors : null,
    topicSuggestions: state.suggestion.topicSuggestions,
    user,
    userId: state.session.session.user.id,
    error: state.classPlan.error,
    isFetching: state.classPlan.isFetching,
    activeClassPlan: state.classPlan.activeClassPlan,
  });
};

const mapDispatchToProps = (dispatch) => {
  /* Options for Open Learning Object Base modal */
  const openSearchLearningObjectModalProps = {
    modalProps: {
      open: true,
      titlePart: 'à plano de aula',
      closeModal: () => dispatch(hideModal()),
      addSelectedObject: object => dispatch(addSelectedObjectToClassPlan(object)),
      removeSelectedObject: idObject => dispatch(removeSelectedObjectToClassPlan(idObject)),
      callFrom: 'C',
    },
    modalType: 'searchObjectModal',
  };

  const openSearchDocumentModalProps = {
    modalProps: {
      open: true,
      titlePart: 'à plano de aula',
      closeModal: () => dispatch(hideModal()),
      addSelectedDocument: document => dispatch(addSelectedDocumentToClassPlan(document)),
      removeSelectedDocument: idDocument => dispatch(removeSelectedDocumentFromClassPlan(idDocument)),
      listMyDocumentsModal: (page, orderField, order) => dispatch(listMyDocumentsModal(page, orderField, order)),
      callFrom: 'C',
    },
    modalType: 'searchDocumentModal',
  };

  return ({
    listDisciplineFilters: param => dispatch(listDisciplineFilters(param)),
    listTeachingLevelFilters: param => dispatch(listTeachingLevelFilters(param)),
    listTopics: param => dispatch(listTopics(param)),
    listTeachingYearFilters: param => dispatch(listTeachingYearFilters(param)),
    resetTopicList: () => dispatch(resetTopicList()),

    showSearchLearningObjectModal: () => dispatch(showModal(openSearchLearningObjectModalProps)),
    showSearchDocumentModal: () => dispatch(showModal(openSearchDocumentModalProps)),

    listTopicSuggestions: param => dispatch(listTopicSuggestions(param)),

    removeSelectedObjectToClassPlan: idObject => dispatch(removeSelectedObjectToClassPlan(idObject)),
    resetSelectedObjects: () => dispatch(resetSelectedObjects()),
    resetSelectedDocuments: () => dispatch(resetSelectedDocuments()),

    removeSelectedDocumentFromClassPlan: idDocument => dispatch(removeSelectedDocumentFromClassPlan(idDocument)),
    fetchClassPlan: id => dispatch(fetchClassPlan(id)),

    /*
  fields = (
            'id',
            'owner',
            'create_date',
            'name',
            'disciplines',
            'teaching_levels',
            'topics',
            'learning_objects',
            'documents',
            'links',
            'year',
            'duration',
            'comment',
            'description',
            'pdf',
        )
  */
    onSubmit: (values, d, props) => {
      const errors = [];
      const isValidFile = values.pdf && values.pdf instanceof FileList && values.pdf.length > 0;

      const updatedClassPlan = {
        id: props.activeClassPlan.id,
        name: values.name,
        disciplines_ids: values.disciplines.map(discipline => discipline.id),
        teaching_levels_ids: values.teachingLevels.map(teachingLevel => teachingLevel.id),
        topics_ids: values.topics.map(topic => topic.id),
        learning_objects_ids: props.selectedObjectList && props.selectedObjectList.length > 0
          ? props.selectedObjectList.map(object => object.id) : [],
        documents_ids: props.selectedDocumentList && props.selectedDocumentList.length > 0
          ? props.selectedDocumentList.map(document => document.id) : [],
        links: values.links && values.links.length > 0 ? values.links : [],
        teaching_years_ids: values.teachingYears ? values.teachingYears.map(teachingYear => teachingYear.id) : [],
        duration: values.duration ? values.duration : 0,
        comment: values.comment ? values.comment : '',
        description: values.description,
        pdf: (values.pdf && isValidFile) ? values.pdf : null,
      };

      if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);

      return dispatch(updateClassPlan(updatedClassPlan));
    },
  });
};

const EditClassPlanPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'edit-classplan',
})(EditClassPlanPage));

export default EditClassPlanPageContainer;
