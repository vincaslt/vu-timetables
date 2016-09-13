import { REQUEST_TIMETABLE, RECEIVE_TIMETABLE, ACTIVATE_TIMETABLE_TAB } from '../actions/timetable';

const defaultState = {
  lectures: [],
  loading: false
};

export function timetable(state = defaultState, action) {
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

export function activeTab(state = 0, action) {
  switch (action.type) {
    case ACTIVATE_TIMETABLE_TAB:
      return action.tab;
    default:
      return state;
  }
}
