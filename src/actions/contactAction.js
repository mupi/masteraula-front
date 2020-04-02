import { contactService } from 'services';
import { reset } from 'redux-form';

// Load
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

/* Send message with promise
export const sendMessage = (message) => {
  function sendContactMessage() { return { type: SEND_MESSAGE }; }
  function sendMessageSuccess(newMessage) {
    return { type: SEND_MESSAGE_SUCCESS, newMessage };
  }
  function sendMessageFailure(error) {
    return { type: SEND_MESSAGE_FAILURE, error };
  }
  return (dispatch) => {
    dispatch(sendContactMessage(message));
    return contactService.sendMessage(message)
      .then(
        (newMessage) => {
          dispatch(sendMessageSuccess(newMessage));
          dispatch(reset('contact-form'));
        },
        (error) => {
          dispatch(sendMessageFailure(error));
        },
      );
  };
};
*/
/* Send message with async and wait */
export const sendMessage = message => async (dispatch) => {
  try {
    dispatch({ type: SEND_MESSAGE });
    const response = await contactService.sendMessage(message);
    dispatch({ type: SEND_MESSAGE_SUCCESS, response });
    dispatch(reset('contact-form'));
  } catch {
    dispatch({ type: SEND_MESSAGE_FAILURE });
  }
};
