import { connect } from 'react-redux';
import {
  reduxForm, formValueSelector, SubmissionError, initialize,
} from 'redux-form';
import CreateClassPlanPage from 'pages/ClassPlan/CreateClassPlanPage';
import {
  createClassPlan,
  addSelectedObjectToClassPlan, removeSelectedObjectToClassPlan, resetSelectedObjects,
  addSelectedActivityToClassPlan, removeSelectedActivityToClassPlan, resetSelectedActivities,
  addSelectedDocumentToClassPlan, removeSelectedDocumentFromClassPlan, resetSelectedDocuments,
  addSelectedOnlineTestToClassPlan, removeSelectedOnlineTestFromClassPlan, resetSelectedOnlineTests,
  addStationToClassPlan, removeStationFromClassPlan,
  addMaterialToClassPlanStation,
  removeMaterialFromClassPlanStation,
  resetStationsClassPlan,
} from 'actions/classPlanAction';

import {
  listDisciplineFilters, listTeachingLevelFilters, listTeachingYearFilters,
} from 'actions/filterAction';
import { listTopics, resetTopicList } from 'actions/topicAction';
import { showModal, hideModal } from 'actions/modalAction';
import { listTopicSuggestions, listBnccSuggestions } from 'actions/suggestionAction';
import {
  listMyDocumentsModal,
} from 'actions/documentAction';
import {
  listAllMyOnlineTestsModal,
} from 'actions/onlineTestAction';

/* Learning Object search modal called from */
const MODAL_FROM = {
  QUESTION: 'Q',
  CLASS_PLAN: 'C',
};

/* MATERIAL TYPE FOR STATIONS */
const MATERIAL_TYPE = {
  DOCUMENT: 'D',
  ONLINE_TEST: 'T',
  OBJECT: 'O',
  QUESTION: 'Q',
  ACTIVITY: 'A',
};

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
    selectedActivityList: state.classPlan.selectedActivityList,
    selectedDocumentList: state.classPlan.selectedDocumentList,
    selectedOnlineTestList: state.classPlan.selectedOnlineTestList,
    errorsClassPlan: state.form['create-classplan'] ? state.form['create-classplan'].submitErrors : null,
    topicSuggestions: state.suggestion.topicSuggestions,
    bnccSuggestions: state.suggestion.bnccSuggestions,
    user,
    selectedClassPlanType: state.classPlan.selectedClassPlanType,
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
          dispatch(addMaterialToClassPlanStation(object, stationIndex, MATERIAL_TYPE.OBJECT));
        }
      },
      removeSelectedObject: (idObject) => {
        if (!singleSelection) {
          dispatch(removeSelectedObjectToClassPlan(idObject));
        } else {
          dispatch(removeMaterialFromClassPlanStation(stationIndex, MATERIAL_TYPE.OBJECT));
        }
      },
      callFrom: MODAL_FROM.CLASS_PLAN,
      singleSelection,
      stationIndex,
    },
    modalType: 'searchObjectModal',
  });
  /* Options for Open Activity Base modal */
  const openSearchActivityModalProps = (singleSelection, stationIndex) => ({
    modalProps: {
      open: true,
      titlePart: 'ao plano de aula',
      closeModal: () => dispatch(hideModal()),
      addSelectedActivity: (activity) => {
        if (!singleSelection) {
          dispatch(addSelectedActivityToClassPlan(activity));
        } else {
          dispatch(addMaterialToClassPlanStation(activity, stationIndex, MATERIAL_TYPE.ACTIVITY));
        }
      },
      removeSelectedActivity: (idActivity) => {
        if (!singleSelection) {
          dispatch(removeSelectedActivityToClassPlan(idActivity));
        } else {
          dispatch(removeMaterialFromClassPlanStation(stationIndex, MATERIAL_TYPE.ACTIVITY));
        }
      },
      callFrom: MODAL_FROM.CLASS_PLAN,
      singleSelection,
      stationIndex,
    },
    modalType: 'searchActivityModal',
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
          dispatch(addMaterialToClassPlanStation(document, stationIndex, MATERIAL_TYPE.DOCUMENT));
        }
      },
      removeSelectedDocument: (idDocument) => {
        if (!singleSelection) {
          dispatch(removeSelectedDocumentFromClassPlan(idDocument));
        } else {
          dispatch(removeMaterialFromClassPlanStation(stationIndex, MATERIAL_TYPE.DOCUMENT));
        }
      },
      listMyDocumentsModal: (page, orderField, order) => dispatch(listMyDocumentsModal(page, orderField, order)),
      callFrom: MODAL_FROM.CLASS_PLAN,
      singleSelection,
      stationIndex,
    },
    modalType: 'searchDocumentModal',
  });

  const openSearchOnlineTestModalProps = (singleSelection, stationIndex) => ({
    modalProps: {
      open: true,
      titlePart: 'ao plano de aula',
      closeModal: () => dispatch(hideModal()),
      addSelectedOnlineTest: (onlineTest) => {
        if (!singleSelection) {
          dispatch(addSelectedOnlineTestToClassPlan(onlineTest));
        } else {
          dispatch(addMaterialToClassPlanStation(onlineTest, stationIndex, MATERIAL_TYPE.ONLINE_TEST));
        }
      },
      removeSelectedOnlineTest: (idOnlineTest) => {
        if (!singleSelection) {
          dispatch(removeSelectedOnlineTestFromClassPlan(idOnlineTest));
        } else {
          dispatch(removeMaterialFromClassPlanStation(stationIndex, MATERIAL_TYPE.ONLINE_TEST));
        }
      },
      listAllMyOnlineTestsModal: (page, orderField, order) => dispatch(listAllMyOnlineTestsModal(page, orderField, order)),
      callFrom: MODAL_FROM.CLASS_PLAN,
      singleSelection,
      stationIndex,
    },
    modalType: 'searchOnlineTestModal',
  });

  const openSearchQuestionModalProps = (singleSelection, stationIndex) => ({
    modalProps: {
      open: true,
      titlePart: 'ao plano de aula',
      closeModal: () => dispatch(hideModal()),
      addSelectedQuestion: (question) => {
        if (singleSelection) {
          dispatch(addMaterialToClassPlanStation(question, stationIndex, MATERIAL_TYPE.QUESTION));
        }
      },
      removeSelectedQuestion: () => {
        if (singleSelection) {
          dispatch(removeMaterialFromClassPlanStation(stationIndex, MATERIAL_TYPE.QUESTION));
        }
      },
      callFrom: MODAL_FROM.CLASS_PLAN,
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
    prepareForm: () => {
      dispatch(initialize('create-classplan', {
        topics: [],
        stations: [{}, {}],
      }));
    },

    /* INI: Search Modal for each type of material */
    showSearchLearningObjectModal: (singleSelection = false, stationIndex = null) => {
      dispatch(showModal(openSearchLearningObjectModalProps(singleSelection, stationIndex)));
    },

    showSearchDocumentModal: (singleSelection = false, stationIndex = null) => {
      dispatch(showModal(openSearchDocumentModalProps(singleSelection, stationIndex)));
    },

    showSearchOnlineTestModal: (singleSelection = false, stationIndex = null) => {
      dispatch(showModal(openSearchOnlineTestModalProps(singleSelection, stationIndex)));
    },

    showSearchActivityModal: (singleSelection = false, stationIndex = null) => {
      dispatch(showModal(openSearchActivityModalProps(singleSelection, stationIndex)));
    },

    showSearchQuestionModal: (singleSelection = false, stationIndex = null) => {
      dispatch(showModal(openSearchQuestionModalProps(singleSelection, stationIndex)));
    },
    /* END */

    listTopicSuggestions: param => dispatch(listTopicSuggestions(param)),
    listBnccSuggestions: param => dispatch(listBnccSuggestions(param)),

    removeSelectedObjectToClassPlan: idObject => dispatch(removeSelectedObjectToClassPlan(idObject)),
    removeSelectedDocumentFromClassPlan: idDocument => dispatch(removeSelectedDocumentFromClassPlan(idDocument)),
    removeSelectedActivityToClassPlan: idActivity => dispatch(removeSelectedActivityToClassPlan(idActivity)),
    removeSelectedOnlineTestFromClassPlan: idOnlineTest => dispatch(removeSelectedOnlineTestFromClassPlan(idOnlineTest)),

    resetSelectedObjects: () => dispatch(resetSelectedObjects()),
    resetSelectedDocuments: () => dispatch(resetSelectedDocuments()),
    resetSelectedActivities: () => dispatch(resetSelectedActivities()),
    resetSelectedOnlineTests: () => dispatch(resetSelectedOnlineTests()),


    /* class plan station's functions */
    resetStationsClassPlan: () => dispatch(resetStationsClassPlan()),
    addStationToClassPlan: station => dispatch(addStationToClassPlan(station)),
    removeStationFromClassPlan: removedIndex => dispatch(removeStationFromClassPlan(removedIndex)),
    removeMaterialFromClassPlanStation: (stationIndex, typeMaterial) => dispatch(removeMaterialFromClassPlanStation(stationIndex, typeMaterial)),
    /*
    stations: [
      { description_station, document_ids   (id)   },
      { description_station, learning_object_ids  (id)   },
      { description_station, question_ids  (id)   },
      ]
    */
    onSubmit: (values, d, props) => {
      const errors = [];
      const newStations = values.stations.map((station, i) => {
        if (props.stations[i].document_ids) {
          return {
            description_station: station.description_station,
            name_station: station.name_station,
            document_ids: props.stations[i].document_ids,
          };
        }
        if (props.stations[i].activity_ids) {
          return {
            description_station: station.description_station,
            name_station: station.name_station,
            activity_ids: props.stations[i].activity_ids,
          };
        }
        // if (props.stations[i].question_ids) {
        //   return {
        //     description_station: station.description_station,
        //   name_station: station.name_station,
        //     question_ids: props.stations[i].question_ids,
        //   };
        // }

        if (station.description_station) {
          return {
            description_station: station.description_station,
            name_station: station.name_station,
          };
        }
        return {};
      }).filter(value => Object.keys(value).length !== 0);

      const newClassPlan = {
        name: values.name,
        plan_type: newStations && newStations.length > 0 ? 'S' : 'T',
        disciplines_ids: values.disciplines.map(discipline => discipline.id),
        teaching_levels_ids: values.teachingLevels.map(teachingLevel => teachingLevel.id),
        topics_ids: values.topics.map(topic => topic.id),
        bncc_ids: values.bncc ? values.bncc.map(bncc => bncc.id) : [],
        tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : [],

        documents_ids: props.selectedDocumentList && props.selectedDocumentList.length > 0
          ? props.selectedDocumentList.map(document => document.id) : [],
        activities_ids: props.selectedActivityList && props.selectedActivityList.length > 0
          ? props.selectedActivityList.map(activity => activity.id) : [],
        stations: newStations,

        teaching_years_ids: values.teachingYears ? values.teachingYears.map(teachingYear => teachingYear.id) : [],
        duration: values.duration ? values.duration : 0,
        phases: values.phases,
        content: values.content ? values.content : '',
        guidelines: values.guidelines ? values.guidelines : '',
      };

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
