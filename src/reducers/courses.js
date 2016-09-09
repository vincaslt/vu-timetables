import { REQUEST_COURSES, RECEIVE_COURSES } from '../actions/courses';

const defaultState = {
  list: [],
  loading: false
};

export default function courses(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_COURSES:
      return {
        list: action.courses.slice(0),
        loading: action.loading,
      };
    case REQUEST_COURSES:
      return {
        list: [],
        loading: action.loading,
      };
    default:
      return state;
  }
}
