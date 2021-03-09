import { SHOW_MODAL, HIDE_MODAL } from "../types";

const initialState = {
  visible: false,
  title: "",
  content: "",
  confirm: null,
  cancel: null,
  onConfirm: null,
  onCancel: null,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return action.payload;
    case HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
};

export default modalReducer;
