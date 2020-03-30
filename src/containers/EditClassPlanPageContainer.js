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
  addStationToClassPlan, removeStationFromClassPlan,
  addMaterialToClassPlanStation,
  removeMaterialFromClassPlanStation,
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
    errorsClassPlan: state.form['edit-classplan'] ? state.form['edit-classplan'].submitErrors : null,
    topicSuggestions: state.suggestion.topicSuggestions,
    user,
    userId: state.session.session.user.id,
    error: state.classPlan.error,
    isFetching: state.classPlan.isFetching,
    activeClassPlan: state.classPlan.activeClassPlan,
    stations: state.classPlan.stations,
  });
};

const mapDispatchToProps = (dispatch) => {
  /* Options for Open Learning Object Base modal */
  const openSearchLearningObjectModalProps = (singleSelection, stationIndex) => ({
    modalProps: {
      open: true,
      titlePart: 'ao plano de aula',
      closeModal: () => dispatch(hideModal()),
      addSelectedObject: (object) => {
        if (!singleSelection) {
          dispatch(addSelectedObjectToClassPlan(object));
        } else {
          dispatch(addMaterialToClassPlanStation(object, stationIndex, 'O'));
        }
      },
      removeSelectedObject: (idObject) => {
        if (!singleSelection) {
          dispatch(removeSelectedObjectToClassPlan(idObject));
        } else {
          dispatch(removeMaterialFromClassPlanStation(stationIndex, 'O'));
        }
      },
      callFrom: 'C',
      singleSelection,
      stationIndex,
    },
    modalType: 'searchObjectModal',
  });

  const openSearchDocumentModalProps = (singleSelection, stationIndex) => ({
    modalProps: {
      open: true,
      titlePart: 'ao plano de aula',
      closeModal: () => dispatch(hideModal()),
      addSelectedDocument: (document) => {
        if (!singleSelection) {
          dispatch(addSelectedDocumentToClassPlan(document));
        } else {
          dispatch(addMaterialToClassPlanStation(document, stationIndex, 'D'));
        }
      },
      removeSelectedDocument: (idDocument) => {
        if (!singleSelection) {
          dispatch(removeSelectedDocumentFromClassPlan(idDocument));
        } else {
          dispatch(removeMaterialFromClassPlanStation(stationIndex, 'D'));
        }
      },
      listMyDocumentsModal: (page, orderField, order) => dispatch(listMyDocumentsModal(page, orderField, order)),
      callFrom: 'C',
      singleSelection,
      stationIndex,
    },
    modalType: 'searchDocumentModal',
  });

  const openSearchQuestionModalProps = (singleSelection, stationIndex) => ({
    modalProps: {
      open: true,
      titlePart: 'ao plano de aula',
      closeModal: () => dispatch(hideModal()),
      addSelectedQuestion: (question) => {
        if (singleSelection) {
          dispatch(addMaterialToClassPlanStation(question, stationIndex, 'Q'));
        }
      },
      removeSelectedQuestion: () => {
        if (singleSelection) {
          dispatch(removeMaterialFromClassPlanStation(stationIndex, 'Q'));
        }
      },
      callFrom: 'C',
      singleSelection,
      stationIndex,
    },
    modalType: 'searchQuestionModal',
  });

  return ({
    listDisciplineFilters: param => dispatch(listDisciplineFilters(param)),
    listTeachingLevelFilters: param => dispatch(listTeachingLevelFilters(param)),
    listTopics: param => dispatch(listTopics(param)),
    listTeachingYearFilters: param => dispatch(listTeachingYearFilters(param)),
    resetTopicList: () => dispatch(resetTopicList()),

    showSearchLearningObjectModal: (singleSelection = false, stationIndex = null) => {
      dispatch(showModal(openSearchLearningObjectModalProps(singleSelection, stationIndex)));
    },

    showSearchDocumentModal: (singleSelection = false, stationIndex = null) => {
      dispatch(showModal(openSearchDocumentModalProps(singleSelection, stationIndex)));
    },

    showSearchQuestionModal: (singleSelection = false, stationIndex = null) => {
      dispatch(showModal(openSearchQuestionModalProps(singleSelection, stationIndex)));
    },

    listTopicSuggestions: param => dispatch(listTopicSuggestions(param)),

    removeSelectedObjectToClassPlan: idObject => dispatch(removeSelectedObjectToClassPlan(idObject)),
    resetSelectedObjects: () => dispatch(resetSelectedObjects()),
    resetSelectedDocuments: () => dispatch(resetSelectedDocuments()),

    removeSelectedDocumentFromClassPlan: idDocument => dispatch(removeSelectedDocumentFromClassPlan(idDocument)),
    fetchClassPlan: id => dispatch(fetchClassPlan(id)),

    /* class plan station's functions */
    addStationToClassPlan: station => dispatch(addStationToClassPlan(station)),
    removeStationFromClassPlan: removedIndex => dispatch(removeStationFromClassPlan(removedIndex)),
    removeMaterialFromClassPlanStation: (stationIndex, typeMaterial) => dispatch(removeMaterialFromClassPlanStation(stationIndex, typeMaterial)),
    /*
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

      const updateStations = values.stations.map((station, i) => {
        if (props.stations[i].document_ids) {
          return {
            description_station: station.description_station,
            document_ids: props.stations[i].document_ids,
          };
        }
        if (props.stations[i].learning_object_ids) {
          return {
            description_station: station.description_station,
            learning_object_ids: props.stations[i].learning_object_ids,
          };
        }
        if (props.stations[i].question_ids) {
          return {
            description_station: station.description_station,
            question_ids: props.stations[i].question_ids,
          };
        }

        if (station.description_station) {
          return {
            description_station: station.description_station,
          };
        }
        return {};
      }).filter(value => Object.keys(value).length !== 0);

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

        stations: updateStations,

        links: values.links && values.links.length > 0 ? values.links : [],
        teaching_years_ids: values.teachingYears ? values.teachingYears.map(teachingYear => teachingYear.id) : [],
        duration: values.duration ? values.duration : 0,
        comment: values.comment ? values.comment : '',
        description: values.description,
        pdf: (values.pdf && isValidFile) ? values.pdf : null,
      };
      const overMaxSize = values.pdf && values.pdf instanceof FileList && values.pdf.length > 0 && values.pdf[0].size > 2097152;
      if (overMaxSize) {
        errors.pdf = 'Insira um arquivo PDF de máx. 2mb';
      }
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
