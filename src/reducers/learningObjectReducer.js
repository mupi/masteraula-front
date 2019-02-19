import {
  UPDATE_LEARNING_OBJECT, UPDATE_LEARNING_OBJECT_SUCCESS, UPDATE_LEARNING_OBJECT_FAILURE,
  UPDATE_ALL_LEARNING_OBJECTS, UPDATE_ALL_LEARNING_OBJECTS_SUCCESS, UPDATE_ALL_LEARNING_OBJECTS_FAILURE,

} from 'actions/learningObjectAction';
import { toast } from 'react-toastify';

const initialState = {
};

const optionsSuccess = {
  className: 'alert__ma-toast--success',
  type: 'success',
};

const optionsError = {
  className: 'alert__ma-toast--error',
  type: 'error',
};

export const learningObject = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LEARNING_OBJECT: {
      return Object.assign({}, state, {
        isRemoved: null,
        error: null,
        isUpdated: null,
      });
    }
    case UPDATE_LEARNING_OBJECT_SUCCESS: {
      toast.success('Objeto de aprendizagem atualizado com sucesso', optionsSuccess);
      return Object.assign({}, state, {
        activeLearningObject: { ...action.activeLearningObject },
        isUpdated: true,
      });
    }
    case UPDATE_LEARNING_OBJECT_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, { error: action.error });
    }
    default:
      return state;
  }
};
export default learningObject;

export const learningObjectsList = (state = [], action) => {
  switch (action.type) {
    case UPDATE_ALL_LEARNING_OBJECTS: {
      return Object.assign({}, state, {
        isRemoved: null,
        error: null,
        isUpdated: null,
      });
    }
    case UPDATE_ALL_LEARNING_OBJECTS_SUCCESS: {
      toast.success('Objeto(s) de aprendizagem atualizado(s) com sucesso', optionsSuccess);
      return state.props.map(
        c => learningObject(c, action),
      );
    }
    case UPDATE_ALL_LEARNING_OBJECTS_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, { error: action.error });
    }
    default:
      return state;
  }
};