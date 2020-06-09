export const GENERAL_TOGGLE_MODAL = 'GENERAL_TOGGLE_MODAL';
export const GENERAL_SHOW_MODAL = 'GENERAL_SHOW_MODAL';
export const GENERAL_HIDE_MODAL = 'GENERAL_HIDE_MODAL';

// General Toggle Modal v2
export const toggleModal = modal => ({
  type: GENERAL_TOGGLE_MODAL,
  modal: !modal,
});

export const showModal = ({ modalProps, modalType }) => (dispatch) => {
  dispatch({
    type: GENERAL_SHOW_MODAL,
    modalProps,
    modalType,
  });
};

export const hideModal = () => (dispatch) => {
  dispatch({
    type: GENERAL_HIDE_MODAL,
  });
};
