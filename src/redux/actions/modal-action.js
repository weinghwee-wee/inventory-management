import { SHOW_MODAL, HIDE_MODAL } from "../types";

export const showModalAction = (
  title,
  content,
  confirm,
  cancel,
  onConfirm,
  onCancel
) => {
  return {
    type: SHOW_MODAL,
    payload: {
      visible: true,
      title,
      content,
      confirm,
      cancel,
      onConfirm,
      onCancel,
    },
  };
};

export const hideModalAction = () => {
  return {
    type: HIDE_MODAL,
  };
};
