import { questionService } from 'services';
import { history } from 'helpers/history';
import { initialize } from 'redux-form';
import { listTopics } from 'actions/topicAction';


// Load single question
export const FETCH_QUESTION = 'FETCH_QUESTION';
export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const FETCH_QUESTION_FAILURE = 'FETCH_QUESTION_FAILURE';

// Create new question
export const CREATE_QUESTION = 'CREATE_QUESTION';
export const CREATE_QUESTION_SUCCESS = 'CREATE_QUESTION_SUCCESS';
export const CREATE_QUESTION_FAILURE = 'CREATE_QUESTION_FAILURE';
export const RESET_NEW_QUESTION = 'RESET_NEW_QUESTION';

// Update question
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const UPDATE_QUESTION_SUCCESS = 'UPDATE_QUESTION_SUCCESS';
export const UPDATE_QUESTION_FAILURE = 'UPDATE_QUESTION_FAILURE';
export const RESET_UPDATE_QUESTION = 'RESET_UPDATE_QUESTION';

// Delete question
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const DELETE_QUESTION_SUCCESS = 'DELETE_QUESTION_SUCCESS';
export const DELETE_QUESTION_FAILURE = 'DELETE_QUESTION_FAILURE';
export const RESET_DELETE_QUESTION = 'RESET_DELETE_QUESTION';

// Star rating question
export const RATE_QUESTION = 'RATE_QUESTION';

// List questions
export const LIST_QUESTION_PAGE = 'LIST_QUESTION_PAGE';
export const LIST_QUESTION_PAGE_SUCCESS = 'LIST_QUESTION_PAGE_SUCCESS';
export const LIST_QUESTION_PAGE_FAILURE = 'LIST_QUESTION_PAGE_FAILURE';

// Fetch documents that belong to question
export const LIST_DOCUMENTS_AFTER_ADDQUESTION_SUCCESS = 'LIST_DOCUMENTS_AFTER_ADDQUESTION_SUCCESS';
export const LIST_DOCUMENTS_AFTER_REMOVEQUESTION_SUCCESS = 'LIST_DOCUMENTS_AFTER_REMOVEQUESTION_SUCCESS';

export const fetchQuestion = (id) => {
  function requestQuestion() { return { type: FETCH_QUESTION }; }
  function fetchQuestionSuccess(activeQuestion) { return { type: FETCH_QUESTION_SUCCESS, activeQuestion }; }
  function fetchQuestionFailure(error) { return { type: FETCH_QUESTION_FAILURE, error }; }
  return (dispatch) => {
    dispatch(requestQuestion(id)); 
    return questionService.fetchQuestion(id)
      .then(
        (activeQuestion) => {
          const allTopics = [];
          activeQuestion.topics.forEach((topic) => {
            const tl = [];
            let t = topic;
            while (t != null) {
              tl.push(t.id.toString());
              t = t.parent;
            }
            if (tl.length === 3) {
              allTopics.push({
                topic: tl[0],
                subsubject: tl[1],
                subject: tl[2],
              });
            } else if (tl.length === 2) {
              allTopics.push({
                subsubject: tl[0],
                subject: tl[1],
              });
            } else {
              allTopics.push({
                subject: tl[0],
              });
            }
          });
          allTopics.push({});

          const alternatives = activeQuestion.alternatives.map(alternative => ({
            id: alternative.id,
            alternativeText: alternative.text,
            isCorrect: alternative.is_correct,
          }));

          console.log(alternatives);
          console.log(activeQuestion.item);

          const newLearningObjectList = activeQuestion.learning_objects.map(lobj => ({
            id: lobj.id,
            tags: lobj.tags.map(tag => tag.name.trim()).join(', '),
          }));

          // initialize Question Edit Page for users with Editor role
          dispatch(initialize('question-edit', {
            difficulty: activeQuestion.difficulty,
            learning_objects: newLearningObjectList,
            tags: activeQuestion.tags.map(tag => tag.name.trim()).join(', '),
            topics: allTopics,
          })); 

          // initialize My Question Edit Page for owner's question
          dispatch(initialize('myquestion-edit', {
            year: activeQuestion.year,
            source: activeQuestion.source,
            statement: activeQuestion.statement,
            difficulty: activeQuestion.difficulty,
            disciplines: activeQuestion.disciplines,
            teachingLevels: activeQuestion.teaching_levels,
            learning_objects: newLearningObjectList,
            tags: activeQuestion.tags.map(tag => tag.name.trim()).join(', '),
            topics: allTopics,
            alternatives,

          }));
          dispatch(listTopics(activeQuestion.disciplines));
          dispatch(fetchQuestionSuccess(activeQuestion));
        },
        (error) => {
          dispatch(fetchQuestionFailure(error));
          history.push('/question-base/1');
        },
      );
  };
};


// Function: Create a new question
export const createQuestion = (props) => {
  function createNewQuestion() { return { type: CREATE_QUESTION }; }
  function createQuestionSuccess(newQuestion) { return { type: CREATE_QUESTION_SUCCESS, newQuestion }; }
  function createQuestionFailure(error) { return { type: CREATE_QUESTION_FAILURE, error }; }
  return (dispatch) => {
    dispatch(createNewQuestion(props));
    return questionService.createQuestion(props).then(
      (newQuestion) => {
        dispatch(createQuestionSuccess(newQuestion));
        history.push(`/view-question/${newQuestion.id}`);
      },
      (error) => {
        dispatch(createQuestionFailure(error));
      },
    );
  };
};

// Function: Update an active question
export const updateQuestion = (props) => {
  function updateActiveQuestion() { return { type: UPDATE_QUESTION }; }
  function updateQuestionSuccess(activeQuestion) { return { type: UPDATE_QUESTION_SUCCESS, activeQuestion }; }
  function updateQuestionFailure(error) { return { type: UPDATE_QUESTION_FAILURE, error }; }
  return (dispatch) => {
    dispatch(updateActiveQuestion(props));
    return questionService.updateQuestion(props).then(
      (activeQuestion) => {
        dispatch(updateQuestionSuccess(activeQuestion));
        const allTopics = [];
        activeQuestion.topics.forEach((topic) => {
          const tl = [];
          let t = topic;
          while (t != null) {
            tl.push(t.id.toString());
            t = t.parent;
          }
          if (tl.length === 3) {
            allTopics.push({
              topic: tl[0],
              subsubject: tl[1],
              subject: tl[2],
            });
          } else if (tl.length === 2) {
            allTopics.push({
              subsubject: tl[0],
              subject: tl[1],
            });
          } else {
            allTopics.push({
              subject: tl[0],
            });
          }
        });
        allTopics.push({});

        const newLearningObjectList = activeQuestion.learning_objects.map(lobj => ({
          id: lobj.id,
          tags: lobj.tags.map(tag => tag.name.trim()).join(', '),
        }));

        dispatch(initialize('question-edit', {
          difficulty: activeQuestion.difficulty,
          learning_objects: newLearningObjectList,
          tags: activeQuestion.tags.map(tag => tag.name.trim()).join(', '),
          topics: allTopics,
        }));
      },
      (error) => {
        dispatch(updateQuestionFailure(error));
      },
    );
  };
};


// Function: Update My active question
export const updateMyQuestion = (props) => {
  function updateActiveQuestion() { return { type: UPDATE_QUESTION }; }
  function updateQuestionSuccess(activeQuestion) { return { type: UPDATE_QUESTION_SUCCESS, activeQuestion }; }
  function updateQuestionFailure(error) { return { type: UPDATE_QUESTION_FAILURE, error }; }
  return (dispatch) => {
    dispatch(updateActiveQuestion(props));
    return questionService.updateQuestion(props).then(
      (activeQuestion) => {
        dispatch(updateQuestionSuccess(activeQuestion));
        const allTopics = [];
        activeQuestion.topics.forEach((topic) => {
          const tl = [];
          let t = topic;
          while (t != null) {
            tl.push(t.id.toString());
            t = t.parent;
          }
          if (tl.length === 3) {
            allTopics.push({
              topic: tl[0],
              subsubject: tl[1],
              subject: tl[2],
            });
          } else if (tl.length === 2) {
            allTopics.push({
              subsubject: tl[0],
              subject: tl[1],
            });
          } else {
            allTopics.push({
              subject: tl[0],
            });
          }
        });
        allTopics.push({});

        const newLearningObjectList = activeQuestion.learning_objects.map(lobj => ({
          id: lobj.id,
          tags: lobj.tags.map(tag => tag.name.trim()).join(', '),
        }));

        dispatch(initialize('question-edit', {
          difficulty: activeQuestion.difficulty,
          learning_objects: newLearningObjectList,
          tags: activeQuestion.tags.map(tag => tag.name.trim()).join(', '),
          topics: allTopics,
        }));
      },
      (error) => {
        dispatch(updateQuestionFailure(error));
      },
    );
  };
};


// listQuestion using filters
export const listQuestions = (page, filter) => {
  function requestQuestionPage() { return { type: LIST_QUESTION_PAGE, page }; }
  function fetchQuestionPageSuccess(questionPage) { return { type: LIST_QUESTION_PAGE_SUCCESS, questionPage }; }
  function fetchQuestionPageFailure(error) { return { type: LIST_QUESTION_PAGE_FAILURE, error }; }
  return (dispatch, getState) => {
    if (getState().question.isFetching) {
      return 1;
    }
    dispatch(requestQuestionPage());
    return questionService.listQuestions(page, filter)
      .then(
        (questionPage) => {
          dispatch(fetchQuestionPageSuccess(questionPage));
          dispatch(initialize('questionSearch', {
            searchText: filter.searchText,
          }));
        },
        (error) => {
          dispatch(fetchQuestionPageFailure(error));
          dispatch(initialize('questionSearch', {
            searchText: filter.searchText,
          }));
        },
      );
  };
};


export const rateQuestion = rating => ({
  type: RATE_QUESTION,
  rating,
});
