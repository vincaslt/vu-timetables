import { REQUEST_DEPARTMENTS, RECEIVE_DEPARTMENTS } from '../actions/departments';

const defaultState = {
  list: [],
  loading: false
};

export default function departments(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_DEPARTMENTS:
      return {
        list: action.departments,
        loading: action.loading
      };
    case REQUEST_DEPARTMENTS:
      return {
        list: [],
        loading: action.loading
      };
    default:
      return state;
  }
}
