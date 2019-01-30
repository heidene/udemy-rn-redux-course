import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE_SUCCESS,
  EMPLOYEE_CREATE,
  EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_DELETE_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case EMPLOYEE_CREATE_SUCCESS:
      return INITIAL_STATE;
    case EMPLOYEE_CREATE:
      return { ...state, loading: true };
    case EMPLOYEE_SAVE_SUCCESS:
      return INITIAL_STATE;
    case EMPLOYEE_DELETE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
