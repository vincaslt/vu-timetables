import { getTimetable } from '../api/timetable';

export const REQUEST_TIMETABLE = 'REQUEST_TIMETABLE';
export const RECEIVE_TIMETABLE = 'RECEIVE_TIMETABLE';
export const ACTIVATE_TIMETABLE_TAB = 'ACTIVATE_TIMETABLE_TAB';

const requestTimetable = () => ({ type: REQUEST_TIMETABLE, loading: true });
const receiveTimetable = (timetable) => ({ type: RECEIVE_TIMETABLE, loading: false, timetable });

export const activateTimetableTab = (tab) => ({ type: ACTIVATE_TIMETABLE_TAB, tab });

export function fetchTimetable(departmentId, courseId) {
  return dispatch => {
    dispatch(requestTimetable());
    getTimetable(departmentId, courseId)
      .then(timetable => dispatch(receiveTimetable(timetable)))
      .catch(console.log);
  };
}
