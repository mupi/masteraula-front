import {
  LIST_DISCIPLINE_FILTERS,
  LIST_DISCIPLINE_FILTERS_SUCCESS, LIST_DISCIPLINE_FILTERS_FAILURE,
  LIST_TEACHINGLEVEL_FILTERS,
  LIST_TEACHINGLEVEL_FILTERS_SUCCESS, LIST_TEACHINGLEVEL_FILTERS_FAILURE,
  LIST_YEAR_FILTERS,
  LIST_YEAR_FILTERS_SUCCESS, LIST_YEAR_FILTERS_FAILURE,

  LIST_TOPIC_FILTERS_C,
  LIST_TOPIC_FILTERS_C_SUCCESS, LIST_TOPIC_FILTERS_C_FAILURE,

  ADD_SELECTED_DISCIPLINE_FILTER_C,
  REMOVE_SELECTED_DISCIPLINE_FILTER_C,

  ADD_SELECTED_TEACHINGLEVEL_FILTER_C,
  REMOVE_SELECTED_TEACHINGLEVEL_FILTER_C,

  ADD_SELECTED_DIFFICULTY_FILTER_C,
  REMOVE_SELECTED_DIFFICULTY_FILTER_C,

  ADD_SELECTED_YEAR_FILTER_C,
  REMOVE_SELECTED_YEAR_FILTER_C,

  ADD_SELECTED_TOPIC_FILTER_C,
  REMOVE_SELECTED_TOPIC_FILTER_C,

  RESET_LIST_TOPIC_SELECTED_C,
  SET_SEARCH_TEXT_C,
  SET_SEARCH_TEXT_MODAL_C,

  ADD_MYCLASSPLANS_FILTER,
  ADD_MYCLASSPLANS_FILTER_MODAL,

  CLEAR_SELECTED_FILTERS_C, CLEAR_SEARCH_C,
  CLEAN_SEARCH_INPUT_C,

} from 'actions/filterClassPlanAction';

const initialState = {
  disciplineFilters: [],
  disciplineFiltersJoined: [],
  teachingLevelFilters: [],
  sourceFilters: [],
  yearFilters: [],
  teachingYearFilters: [],
  topicFilters: [],

  disciplinesSelected: [],
  teachingLevelsSelected: [],
  topicsSelected: [],
  difficultiesSelected: [],
  sourcesSelected: [],
  yearsSelected: [],
  difficultyFilters: [
    { id: 'E', name: 'Fácil' },
    { id: 'M', name: 'Médio' },
    { id: 'H', name: 'Difícil' },
  ],
  myQuestionlabelsSelected: [],
};

export const filterClassPlan = (state = initialState, action) => {
  switch (action.type) {
    case LIST_DISCIPLINE_FILTERS:
      return Object.assign({}, state, {
        disciplineFilters: action.disciplineFilters,
        isFetchingDisciplineFilters: true,
        error: null,
      });
    case LIST_DISCIPLINE_FILTERS_SUCCESS:
      return Object.assign({}, state, {
        disciplineFilters: action.disciplineFilters,
        disciplineFiltersJoined: action.disciplineFilters ? [...action.disciplineFilters.filter(discipline => ![2, 3, 11, 12].includes(discipline.id)), { id: 2, name: 'Português / Literatura' }, { id: 11, name: 'Sociologia / Filosofia' }] : [],
        isFetchingDisciplineFilters: false,
      });
    case LIST_DISCIPLINE_FILTERS_FAILURE:
      return Object.assign({}, state, {
        isFetchingDisciplineFilters: false,
        error: action.error,
      });
    case LIST_TEACHINGLEVEL_FILTERS:
      return Object.assign({}, state, {
        teachingLevelFilters: action.teachingLevelFilters,
        isFetchingTeachingLevelFilters: true,
        error: null,
      });
    case LIST_TEACHINGLEVEL_FILTERS_SUCCESS:
      return Object.assign({}, state, {
        teachingLevelFilters: action.teachingLevelFilters,
        isFetchingTeachingLevelFilters: false,
      });
    case LIST_TEACHINGLEVEL_FILTERS_FAILURE:
      return Object.assign({}, state, {
        isFetchingTeachingLevelFilters: false,
        error: action.error,
      });
    case LIST_YEAR_FILTERS:
      return Object.assign({}, state, {
        yearFilters: action.yearFilters,
        isFetchingYearFilters: true,
        error: null,
      });
    case LIST_YEAR_FILTERS_SUCCESS:
      return Object.assign({}, state, {
        yearFilters: action.yearFilters,
        isFetchingYearFilters: false,
      });
    case LIST_YEAR_FILTERS_FAILURE:
      return Object.assign({}, state, {
        isFetchingYearFilters: false,
        error: action.error,
      });
    case LIST_TOPIC_FILTERS_C:
      return Object.assign({}, state, {
        topicFilters: action.topicFilters,
        isFetchingTopicFilters: true,
        error: null,
      });
    case LIST_TOPIC_FILTERS_C_SUCCESS:
      return Object.assign({}, state, {
        topicFilters: action.topicFilters.topics,
        moreTopicFilters: action.topicFilters.more,
        isFetchingTopicFilters: false,
      });
    case LIST_TOPIC_FILTERS_C_FAILURE:
      return Object.assign({}, state, {
        isFetchingTopicFilters: false,
        error: action.error,
      });
    case ADD_SELECTED_DISCIPLINE_FILTER_C: {
      if (action.idDiscipline >= 0) {
        const newId = [3, 12].includes(parseInt(action.idDiscipline, 10)) ? parseInt(action.idDiscipline, 10) - 1 : action.idDiscipline;
        const filterDiscipline = state.disciplineFiltersJoined.filter(item => item.id === parseInt(newId, 10));
        if (filterDiscipline[0] && state.disciplinesSelected.filter(item => item.id === filterDiscipline[0].id).length > 0) {
          return state;
        } // do not add duplicates
        const filterDisciplineAdded = filterDiscipline[0] ? filterDiscipline[0] : {};
        return Object.assign({}, state, {
          disciplinesSelected: [filterDisciplineAdded],
        });
      }
      return Object.assign({}, state, {
        disciplinesSelected: [],
      });
    }
    case REMOVE_SELECTED_DISCIPLINE_FILTER_C: {
      const newDisciplines = state.disciplinesSelected.filter(item => item.id !== parseInt(action.idDiscipline, 10));
      return Object.assign({}, state, {
        disciplinesSelected: newDisciplines,
      });
    }
    case ADD_SELECTED_TEACHINGLEVEL_FILTER_C: {
      const filterTeachingL = state.teachingLevelFilters.filter(item => item.id === parseInt(action.idTeachingLevel, 10));
      if (state.teachingLevelsSelected.filter(item => item.id === filterTeachingL[0].id).length > 0) return state; // do not add duplicates
      return Object.assign({}, state, {
        teachingLevelsSelected: [...state.teachingLevelsSelected, filterTeachingL[0]],
      });
    }
    case REMOVE_SELECTED_TEACHINGLEVEL_FILTER_C: {
      const newTeachingLevels = state.teachingLevelsSelected.filter(item => item.id !== parseInt(action.idTeachingLevel, 10));
      return Object.assign({}, state, {
        teachingLevelsSelected: newTeachingLevels,
      });
    }
    case ADD_SELECTED_DIFFICULTY_FILTER_C: {
      const filterDifficulty = state.difficultyFilters.filter(item => item.id === action.difficultyType);
      if (state.difficultiesSelected.filter(item => item.id === filterDifficulty[0].id).length > 0) return state; // do not add duplicates
      return Object.assign({}, state, {
        difficultiesSelected: [...state.difficultiesSelected, filterDifficulty[0]],
      });
    }
    case REMOVE_SELECTED_DIFFICULTY_FILTER_C: {
      const newDifficulties = state.difficultiesSelected.filter(item => item.id !== action.difficultyType);
      return Object.assign({}, state, {
        difficultiesSelected: newDifficulties,
      });
    }
    case ADD_SELECTED_YEAR_FILTER_C: {
      /* any year available in yearFilteres */
      if (parseInt(action.idYear, 10) >= 0) {
        const filterYear = state.yearFilters.filter(item => item.id === parseInt(action.idYear, 10));
        if (filterYear[0] && state.yearsSelected.filter(item => item.id === filterYear[0].id).length > 0) {
          return state;
        }// do not add duplicates
        const filterYearAdded = filterYear[0] ? filterYear[0] : {};

        return Object.assign({}, state, {
          yearsSelected: [filterYearAdded],
        });
      }

      /* customized year */
      if (action.idYear === -1) {
        if (state.yearsSelected.filter(item => item.name === action.nameYear).length > 0) return state; // do not add duplicates
        const newYear = { id: action.nameYear, name: action.nameYear };
        return Object.assign({}, state, {
          yearsSelected: [newYear],
        });
      }

      /* all years */
      return Object.assign({}, state, {
        yearsSelected: [],
      });
    }
    case REMOVE_SELECTED_YEAR_FILTER_C: {
      const newYears = state.yearsSelected.filter(item => item.id.toString() !== action.idYear);
      return Object.assign({}, state, {
        yearsSelected: newYears,
      });
    }
    case ADD_SELECTED_TOPIC_FILTER_C: {
      if (state.topicsSelected.filter(item => item.id === action.topic.id).length > 0) return state; // do not add duplicates
      return Object.assign({}, state, {
        topicsSelected: [...state.topicsSelected, action.topic],
      });
    }
    case REMOVE_SELECTED_TOPIC_FILTER_C: {
      const newTopics = state.topicsSelected.filter(item => item.id !== parseInt(action.idTopic, 10));
      return Object.assign({}, state, {
        topicsSelected: newTopics,
      });
    }
    case RESET_LIST_TOPIC_SELECTED_C:
      return Object.assign({}, state, {
        topicsSelected: [],
        topicFilters: [],
      });
    case SET_SEARCH_TEXT_C: {
      return Object.assign({}, state, {
        searchText: action.searchText,
      });
    }
    case SET_SEARCH_TEXT_MODAL_C: {
      return Object.assign({}, state, {
        searchTextModal: action.searchTextModal,
      });
    }

    case CLEAN_SEARCH_INPUT_C: {
      return Object.assign({}, state, {
        searchText: '',
      });
    }

    case ADD_MYCLASSPLANS_FILTER: {
      return Object.assign({}, state, {
        onlyMyClassPlans: action.onlyMyClassPlans,
        author: action.author,
      });
    }

    case ADD_MYCLASSPLANS_FILTER_MODAL: {
      return Object.assign({}, state, {
        onlyMyClassPlansModal: action.onlyMyClassPlansModal,
        author: action.author,
      });
    }

    case CLEAR_SELECTED_FILTERS_C: {
      return Object.assign({}, state, {
        disciplinesSelected: [],
        teachingLevelsSelected: [],
        difficultiesSelected: [],
        sourcesSelected: [],
        yearsSelected: [],
        topicsSelected: [],
        topicFilters: [],
        onlyMyClassPlans: false,
      });
    }
    case CLEAR_SEARCH_C: {
      return Object.assign({}, state, {
        searchText: '',
      });
    }
    default:
      return state;
  }
};

export default filterClassPlan;
