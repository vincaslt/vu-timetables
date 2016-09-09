import { getTimetable } from '../api/timetable';

export const REQUEST_TIMETABLE = 'REQUEST_TIMETABLE';
export const RECEIVE_TIMETABLE = 'RECEIVE_TIMETABLE';

const requestTimetable = () => ({ type: REQUEST_TIMETABLE, loading: true });
const receiveTimetable = (timetable) => ({ type: RECEIVE_TIMETABLE, loading: false, timetable });

export function fetchTimetable(departmentId, courseId) {
  return dispatch => {
    dispatch(requestTimetable());
    getTimetable(departmentId, courseId)
      .then(timetable => dispatch(receiveTimetable(timetable)))
      .catch(console.log);
  };
}
