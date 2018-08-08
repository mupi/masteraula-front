export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';


export const openModal = obj => ({
  type: OPEN_MODAL,
  obj,
});

export const closeModal = obj => ({
  type: CLOSE_MODAL,
  obj,
});
