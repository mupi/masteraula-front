import {
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
} from 'actions/contactAction';
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

export const contact = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return Object.assign({}, state, {
        isSendingMessage: true,
        error: null,
      });
    case SEND_MESSAGE_SUCCESS:
      toast.success('Mensagem enviada com sucesso', optionsSuccess);
      return Object.assign({}, state, {
        isSendingMessage: false,
      });
    case SEND_MESSAGE_FAILURE:
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        isSendingMessage: false,
        error: action.error,
      });
    default:
      return state;
  }
};

export default contact;
