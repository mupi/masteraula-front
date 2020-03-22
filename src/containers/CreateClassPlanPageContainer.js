import { connect } from 'react-redux';
import {
  reduxForm, formValueSelector, SubmissionError, initialize,
} from 'redux-form';
import CreateClassPlanPage from 'pages/ClassPlan/CreateClassPlanPage';
import {
  createClassPlan,
  addSelectedObjectToClassPlan, removeSelectedObjectToClassPlan, resetSelectedObjects,
  addSelectedDocumentToClassPlan, removeSelectedDocumentFromClassPlan, resetSelectedDocuments,
  addStationToClassPlan, removeStationFromClassPlan,
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
  const selector = formValueSelector('create-classplan');
  const { user } = state.session.session;
  return ({
    topics: selector(state, 'topics'),
    disciplinesList: selector(state, 'disciplines'),
    topicsList: state.topic.topics,
    disciplineFilters: state.filter.disciplineFilters,
    teachingLevelFilters: state.filter.teachingLevelFilters,
    teachingYearFilters: state.filter.teachingYearFilters,
    sourceFilters: state.filter.sourceFilters,
    selectedObjectList: state.classPlan.selectedObjectList,
    selectedDocumentList: state.classPlan.selectedDocumentList,
    errorsClassPlan: state.form['create-classplan'] ? state.form['create-classplan'].submitErrors : null,
    topicSuggestions: state.suggestion.topicSuggestions,
    user,
    selectedClassPlanType: state.classPlan.selectedClassPlanType,
    stations: state.classPlan.stations,
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
    prepareForm: () => {
      dispatch(initialize('create-classplan', {
        topics: [],
        stations: [{}, {}],
      }));
    },

    showSearchLearningObjectModal: () => dispatch(showModal(openSearchLearningObjectModalProps)),
    showSearchDocumentModal: () => dispatch(showModal(openSearchDocumentModalProps)),

    listTopicSuggestions: param => dispatch(listTopicSuggestions(param)),

    removeSelectedObjectToClassPlan: idObject => dispatch(removeSelectedObjectToClassPlan(idObject)),
    resetSelectedObjects: () => dispatch(resetSelectedObjects()),
    resetSelectedDocuments: () => dispatch(resetSelectedDocuments()),

    removeSelectedDocumentFromClassPlan: idDocument => dispatch(removeSelectedDocumentFromClassPlan(idDocument)),

    /* class plan station's functions */
    addStationToClassPlan: station => dispatch(addStationToClassPlan(station)),
    removeStationFromClassPlan: removedIndex => dispatch(removeStationFromClassPlan(removedIndex)),

    /*
    stations: [
      { description_station, document_ids   (id)   },
      { description_station, learning_object_ids  (id)   },
      { description_station, question_ids  (id)   },
      ]
    */
    onSubmit: (values, d, props) => {
      const errors = [];
      const newClassPlan = {
        name: values.name,
        plan_type: values.stations && values.stations.length >= 2 ? 'S' : 'T',
        disciplines_ids: values.disciplines.map(discipline => discipline.id),
        teaching_levels_ids: values.teachingLevels.map(teachingLevel => teachingLevel.id),
        topics_ids: values.topics.map(topic => topic.id),

        learning_objects_ids: props.selectedObjectList && props.selectedObjectList.length > 0
          ? props.selectedObjectList.map(object => object.id) : [],
        documents_ids: props.selectedDocumentList && props.selectedDocumentList.length > 0
          ? props.selectedDocumentList.map(document => document.id) : [],
        stations: props.stations, // values.stations,

        links: values.links && values.links.length > 0 ? values.links : [],
        teaching_years_ids: values.teachingYears ? values.teachingYears.map(teachingYear => teachingYear.id) : [],
        duration: values.duration ? values.duration : 0,
        comment: values.comment ? values.comment : '',
        description: values.description,
        pdf: values.pdf && values.pdf.length !== 0 ? values.pdf : null,
      };
      const overMaxSize = values.pdf && values.pdf instanceof FileList && values.pdf.length > 0 && values.pdf[0].size > 2097152;
      if (overMaxSize) {
        errors.pdf = 'Insira um arquivo PDF de máx. 2mb';
      }

      if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);

      return dispatch(createClassPlan(newClassPlan));
    },
  });
};

const CreateClassPlanPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'create-classplan',
})(CreateClassPlanPage));

export default CreateClassPlanPageContainer;
