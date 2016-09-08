import { getTimetable } from '../api/timetable';

const REQUEST_TIMETABLE = 'REQUEST_TIMETABLE';
const RETRIEVE_TIMETABLE = 'RETRIEVE_TIMETABLE';

const requestTimetable = () => ({ type: REQUEST_TIMETABLE, loading: true });
const retrieveTimetable = (timetable) => ({ type: RETRIEVE_TIMETABLE, loading: false, timetable });

export default function fetchTimetable(departmentId, courseId) {
  return dispatch => {
    dispatch(requestTimetable());
    getTimetable(departmentId, courseId)
      .then(timetable => dispatch(retrieveTimetable(timetable)))
      .catch(console.log);
  };
}
