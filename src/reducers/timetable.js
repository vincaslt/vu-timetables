import { REQUEST_TIMETABLE, RECEIVE_TIMETABLE } from '../actions/timetable';

const defaultState = {
  lectures: [],
  loading: false
};

export default function timetable(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_TIMETABLE:
      return {
        lectures: action.timetable.slice(0),
        loading: action.loading,
      };
    case REQUEST_TIMETABLE:
      return {
        lectures: [],
        loading: action.loading,
      };
    default:
      return state;
  }
}
