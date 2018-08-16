export const GENERAL_TOGGLE_MODAL = 'GENERAL_TOGGLE_MODAL';

// General Toggle Modal
export const toggleModal = modal => ({
  type: GENERAL_TOGGLE_MODAL,
  modal: !modal,
});
